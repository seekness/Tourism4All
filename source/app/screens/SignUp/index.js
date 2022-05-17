import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Button, TextInput} from '@components';
import styles from './styles';
import * as api from '@api';
import {useTranslation} from 'react-i18next';

export default function SignUp({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    username: true,
    email: true,
    password: true,
  });

  /**
   * call when action signup
   *
   */
  const onSignUp = async () => {
    if (username == '' || email == '' || password == '') {
      setSuccess({
        ...success,
        username: username != '' ? true : false,
        email: email != '' ? true : false,
        password: password != '' ? true : false,
      });
    } else {
      setLoading(true);
      try {
        const params = {
          username,
          password,
          email,
        };
        const response = await api.signUp(params);
        Alert.alert({
          type: 'success',
          title: t('sign_up'),
          message: t('register_success'),
          action: [{onPress: () => navigation.goBack()}],
        });
      } catch (error) {
        Alert.alert({
          title: t('sign_up'),
          message: error.data?.code ?? error.message,
        });
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
      <Header
        title={t('sign_up')}
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
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{flex: 1}}>
        <View style={styles.contain}>
          <TextInput
            onChangeText={text => setUsername(text)}
            placeholder={t('input_id')}
            success={success.username}
            value={username}
            onFocus={() => {
              setSuccess({
                ...success,
                username: true,
              });
            }}
          />
          <TextInput
            style={{marginTop: 10}}
            onChangeText={text => setEmail(text)}
            placeholder={t('input_email')}
            keyboardType="email-address"
            success={success.email}
            value={email}
            onFocus={() => {
              setSuccess({
                ...success,
                email: true,
              });
            }}
          />
          <TextInput
            style={{marginTop: 10}}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            placeholder={t('input_password')}
            success={success.password}
            value={password}
            onFocus={() => {
              setSuccess({
                ...success,
                password: true,
              });
            }}
          />
          <Button
            full
            style={{marginTop: 20}}
            loading={loading}
            onPress={() => onSignUp()}>
            {t('sign_up')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
