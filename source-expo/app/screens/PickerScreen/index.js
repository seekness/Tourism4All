import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {BaseStyle, useTheme, BaseColor} from '@config';
import {Header, SafeAreaView, Icon, Text, TextInput, Button} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function PickerScreen({route, navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [search, setSearch] = useState('');
  const [data, setData] = useState(route.params.data ?? []);
  const [selected, setSelected] = useState(route.params.selected);

  /**
   * @description Called when apply
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} value
   */
  const onApply = value => {
    navigation.goBack();
    route.params?.onApply(value);
  };

  /**
   * on change keyword
   *
   * @param {*} keyword
   */
  const onSearch = keyword => {
    setSearch(keyword);
    if (!keyword) {
      setData(route.params.data ?? []);
    } else {
      setData(
        data.filter(item => {
          return item.title.toUpperCase().includes(search.toUpperCase());
        }),
      );
    }
  };

  /**
   * @description Called when item is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */
  const onChange = select => {
    setSelected(select);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
      <Header
        title={route.params?.title ?? t('location')}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contain}>
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <TextInput
            onChangeText={text => onSearch(text)}
            placeholder={t('search')}
            value={search}
            icon={
              <TouchableOpacity onPress={() => onSearch('')}>
                <Icon name="times" size={16} color={BaseColor.grayColor} />
              </TouchableOpacity>
            }
          />
        </View>
        <FlatList
          style={{paddingHorizontal: 20, flex: 1}}
          data={data}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}) => {
            const checked = item.id == selected?.id;
            return (
              <TouchableOpacity
                style={[styles.item, {borderBottomColor: colors.border}]}
                onPress={() => onChange(item)}>
                <Text
                  body1
                  style={
                    checked
                      ? {
                          color: colors.primary,
                        }
                      : {}
                  }>
                  {item.title}
                </Text>
                {checked && (
                  <Icon name="check" size={14} color={colors.primary} />
                )}
              </TouchableOpacity>
            );
          }}
        />
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <Button full onPress={() => onApply(selected)}>
            {t('apply')}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
