import React, {useContext, useEffect, useRef, useState} from 'react';
import {Keyboard, ScrollView, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Styles} from '@configs';
import {
  Application,
  Button,
  ScreenContainer,
  Icon,
  SizedBox,
  Text,
  TextInput,
  Toast,
} from '@components';
import {validate} from '@utils';
import {authActions} from '@actions';
import {useTranslation} from 'react-i18next';

export default function SignIn({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('paul');
  const [password, setPassword] = useState('123456@listar');
  const [showPassword, setShowPassword] = useState(false);
  const [errorUsername, setErrorUsername] = useState();
  const [errorPassword, setErrorPassword] = useState();

  useEffect(() => {
    setTimeout(() => {
      usernameRef.current?.focus();
    }, 500);
  }, []);

  /**
   * on change user name
   * @param {*} value
   */
  const onChangeUsername = value => {
    const error = validate(value, {empty: false});
    setUsername(value);
    setErrorUsername(error);
  };

  /**
   * on change password
   * @param {*} value
   */
  const onChangePassword = value => {
    const error = validate(value, {empty: false});
    setErrorPassword(error);
    setPassword(value);
  };

  /**
   * on sign in
   */
  const onSignIn = params => {
    Keyboard.dismiss();
    dispatch(
      authActions.onLogin(params, ({success, message}) => {
        if (success) {
          route?.params?.onSuccess?.();
        } else {
          Toast.show(message);
        }
      }),
    );
  };

  /**
   * on forgot password
   */
  const onForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  /**
   * on sign up
   */
  const onSignUp = () => {
    navigation.navigate('SignUp', {onSignIn});
  };

  /**
   * check disable sign in
   */
  const disableSignIn = () => {
    const validUsername = validate(username, {empty: false});
    const validPassword = validate(password, {empty: false});
    if (validUsername || validPassword) {
      return true;
    }
  };

  return (
    <ScreenContainer
      navigation={navigation}
      enableKeyboardAvoidingView={true}
      style={{backgroundColor: theme.colors.card}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={Styles.flex}
        contentContainerStyle={Styles.padding16}>
        <Text typography="h4" weight="bold">
          {t('welcome')}
        </Text>
        <SizedBox height={2} />
        <Text typography="title" weight="medium" type="secondary">
          {t('sign_in_tour')}
        </Text>
        <SizedBox height={24} />
        <TextInput
          ref={usernameRef}
          defaultValue={username}
          label={t('account')}
          placeholder={t('input_account')}
          onChangeText={onChangeUsername}
          onFocus={() => {
            setErrorUsername(null);
          }}
          onBlur={() => onChangeUsername(username)}
          onSubmitEditing={() => passwordRef.current?.focus()}
          error={t(errorUsername)}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={passwordRef}
          defaultValue={password}
          label={t('password')}
          placeholder={t('input_password')}
          onChangeText={onChangePassword}
          secureTextEntry={!showPassword}
          onFocus={() => {
            setErrorPassword(null);
          }}
          onBlur={() => onChangePassword(password)}
          trailing={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                color={theme.colors.secondary}
              />
            </TouchableOpacity>
          }
          error={t(errorPassword)}
          size="small"
        />
        <SizedBox height={16} />
        <View style={Styles.rowSpace}>
          <TouchableOpacity onPress={onForgotPassword}>
            <Text typography="title" color="secondary">
              {t('forgot_password')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSignUp}>
            <Text typography="title" color="secondary">
              {t('sign_up')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={Styles.buttonContent}>
        <Button
          onPress={() => onSignIn({username, password})}
          disabled={disableSignIn()}>
          {t('sign_in')}
        </Button>
      </View>
    </ScreenContainer>
  );
}
