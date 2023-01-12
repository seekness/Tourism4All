import React, {useContext, useEffect, useRef, useState} from 'react';
import {Keyboard, ScrollView, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Styles} from '@configs';
import {
  Application,
  Button,
  Icon,
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
  Toast,
} from '@components';
import {validate} from '@utils';
import {authActions} from '@actions';
import {useTranslation} from 'react-i18next';

export default function SignUp({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorUsername, setErrorUsername] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [errorEmail, setErrorEmail] = useState();

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
   * on change email
   * @param {*} value
   */
  const onChangeEmail = value => {
    const valid = validate(value, {empty: false, email: true});
    setEmail(value);
    setErrorEmail(valid);
  };

  /**
   * on sign up
   */
  const onSignUp = () => {
    Keyboard.dismiss();
    dispatch(
      authActions.onRegister(
        {username, password, email},
        ({success, message}) => {
          if (success) {
            navigation.goBack();
            route.params?.onSignIn?.({username, password});
          }
          Toast.show(message);
        },
      ),
    );
  };

  /**
   * check disable sign up
   */
  const disableSignUp = () => {
    const validUsername = validate(username, {empty: false});
    const validPassword = validate(password, {empty: false});
    const validEmail = validate(email, {empty: false, email: true});
    if (validUsername || validPassword || validEmail) {
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
          {t('sign_up_tour')}
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
          onSubmitEditing={() => emailRef.current?.focus()}
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
        <TextInput
          ref={emailRef}
          defaultValue={email}
          size="small"
          label={t('email')}
          placeholder={t('input_email')}
          onChangeText={onChangeEmail}
          onFocus={() => {
            setErrorEmail(null);
          }}
          onBlur={() => onChangeEmail(email)}
          error={t(errorEmail)}
        />
      </ScrollView>
      <View style={Styles.buttonContent}>
        <Button onPress={onSignUp} disabled={disableSignUp()}>
          {t('sign_up')}
        </Button>
      </View>
    </ScreenContainer>
  );
}
