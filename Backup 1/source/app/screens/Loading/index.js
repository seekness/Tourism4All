import React, {useEffect} from 'react';
import {ActivityIndicator, View, Alert} from 'react-native';
import {Images, useTheme, BaseSetting} from '@config';
import {configActions} from '@actions';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Text} from '@components';
import {userSelect} from '@selectors';

import styles from './styles';

export default function Loading({navigation}) {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const user = useSelector(userSelect);

  /**
   *
   * Override Alert
   */
  Alert.alert = ({title, message, action, option, type}) => {
    navigation.navigate('Alert', {
      type: type ?? 'warning',
      title: title ?? '',
      message: message ?? '',
      action,
      option: option ?? {cancelable: true},
    });
  };

  /**
   *
   * Process when open app
   */

  useEffect(() => {
    dispatch(
      configActions.onSetup(BaseSetting.domain, user, response => {
        navigation.replace('Main');
      }),
    );
  }, [dispatch, navigation, user]);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        <Text title1 style={{marginTop: 8}}>
          {BaseSetting.displayName}
        </Text>
        <Text headline primaryColor style={{marginTop: 8}}>
          LIST DIRECTORY
        </Text>
      </View>
      <ActivityIndicator
        size="large"
        color={colors.text}
        style={{
          position: 'absolute',
          top: 260,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </View>
  );
}
