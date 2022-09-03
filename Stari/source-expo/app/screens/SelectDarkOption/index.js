import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TouchableOpacity} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {SafeAreaView, Icon, Text} from '@components';
import {applicationActions} from '@actions';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function SelectDarkOption({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const storageForceDark = useSelector(state => state.application.force_dark);
  const [forceDarkMode, setForceDarkMode] = useState(storageForceDark);

  /**
   * call when on change dark option
   * @param {*} value
   */
  const onChange = value => {
    dispatch(applicationActions.forceTheme(value));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
      <View style={styles.contain}>
        <View style={[styles.contentModal, {backgroundColor: colors.card}]}>
          <View style={{padding: 8}}>
            <TouchableOpacity
              style={[
                styles.item,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => setForceDarkMode(null)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text body1 style={{marginHorizontal: 8}}>
                  {t('dynamic_system')}
                </Text>
              </View>
              {forceDarkMode == null && (
                <Icon name="check" size={18} color={colors.primary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.item,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => setForceDarkMode(true)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text body1 style={{marginHorizontal: 8}}>
                  {t('always_on')}
                </Text>
              </View>
              {forceDarkMode == true && (
                <Icon name="check" size={18} color={colors.primary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => setForceDarkMode(false)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text body1 style={{marginHorizontal: 8}}>
                  {t('always_off')}
                </Text>
              </View>
              {forceDarkMode == false && (
                <Icon name="check" size={18} color={colors.primary} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.contentAction}>
            <TouchableOpacity
              style={{padding: 8, marginHorizontal: 24}}
              onPress={() => navigation.goBack()}>
              <Text body1 grayColor>
                {t('cancel')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{padding: 8}}
              onPress={() => onChange(forceDarkMode)}>
              <Text body1 primaryColor>
                {t('apply')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
