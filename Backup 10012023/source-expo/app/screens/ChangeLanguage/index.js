import React, {useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {BaseStyle, useTheme, BaseSetting, BaseColor} from '@config';
import {Header, SafeAreaView, TextInput, Icon, Text} from '@components';
import {applicationActions} from '@actions';
import styles from './styles';
import * as Utils from '@utils';

export default function ChangeLanguage({navigation}) {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();

  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState(BaseSetting.languageSupport);
  const [languageSelected, setLanguageSelected] = useState(i18n.language);

  /**
   * @description Called when setting language is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {string} select
   */
  const onChange = select => {
    setLanguageSelected(select);
  };

  /**
   * Called when apply change language
   */
  const saveLanguage = () => {
    if (!loading) {
      setLoading(true);
      const oldLanguage = i18n.language;
      dispatch(applicationActions.changeLanguge(languageSelected));

      setTimeout(() => {
        Utils.reloadLocale(oldLanguage, languageSelected);
        navigation.goBack();
      }, 500);
    }
  };

  const filterLanguage = text => {
    setCountry(text);
    if (text) {
      setLanguage(
        language.filter(item => Utils.languageFromCode(item).includes(text)),
      );
    } else {
      setLanguage(BaseSetting.languageSupport);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
      <Header
        title={t('change_language')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          } else {
            return (
              <Text headline primaryColor numberOfLines={1}>
                {t('save')}
              </Text>
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={saveLanguage}
      />
      <View style={styles.contain}>
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <TextInput
            onChangeText={filterLanguage}
            placeholder={t('search_language')}
            value={country}
            icon={
              <TouchableOpacity onPress={() => setCountry('')}>
                <Icon name="times" size={16} color={BaseColor.grayColor} />
              </TouchableOpacity>
            }
          />
        </View>
        <FlatList
          contentContainerStyle={{paddingHorizontal: 20}}
          data={language}
          keyExtractor={item => item}
          renderItem={({item}) => {
            const selected = item == languageSelected;
            return (
              <TouchableOpacity
                style={[styles.item, {borderBottomColor: colors.border}]}
                onPress={() => onChange(item)}>
                <Text
                  body1
                  style={
                    selected
                      ? {
                          color: colors.primary,
                        }
                      : {}
                  }>
                  {Utils.languageFromCode(item)}
                </Text>
                {selected && (
                  <Icon name="check" size={14} color={colors.primary} />
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
