import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
import * as api from '@api';
import styles from './styles';

export default function ChangePassword({navigation}) {
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const {colors} = useTheme();
  const [success, setSuccess] = useState({
    password: true,
    repassword: true,
  });

  /**
   *
   * On Change Password
   */
  const onChange = async () => {
    if (!password || !repassword || password != repassword) {
      if (password != repassword) {
        Alert.alert({
          title: t('change_password'),
          message: t('confirm_password_not_corrent'),
        });
      }
      setSuccess({
        ...success,
        password: false,
        repassword: false,
      });
      return;
    }
    setLoading(true);
    try {
      const params = {
        password,
      };
      const response = await api.changePassword(params);
      Alert.alert({
        type: 'success',
        title: t('change_password'),
        message: t('change_password_success'),
        action: [{onPress: () => navigation.goBack()}],
      });
    } catch (error) {
      Alert.alert({
        title: t('change_password'),
        message: error.data?.code ?? error.message,
      });
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
      <Header
        title={t('change_password')}
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
        style={{flex: 1, justifyContent: 'center'}}
        keyboardVerticalOffset={offsetKeyboard}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            padding: 20,
          }}>
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('password')}
            </Text>
          </View>
          <TextInput
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            placeholder={t('password')}
            value={password}
            success={success.password}
            onFocus={() => {
              setSuccess({
                ...success,
                password: true,
              });
            }}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('re_password')}
            </Text>
          </View>
          <TextInput
            onChangeText={text => setRepassword(text)}
            secureTextEntry={true}
            placeholder={t('password_confirm')}
            value={repassword}
            success={success.repassword}
            onFocus={() => {
              setSuccess({
                ...success,
                repassword: true,
              });
            }}
          />
          <View style={{paddingVertical: 15}}>
            <Button loading={loading} full onPress={onChange}>
              {t('confirm')}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
