import React, {useContext, useEffect, useRef, useState} from 'react';
import {Keyboard, ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Styles} from '@configs';
import {
  Application,
  Button,
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
  Toast,
} from '@components';
import {useTranslation} from 'react-i18next';
import {validate} from '@utils';
import {authActions} from '@actions';

export default function ForgotPassword({navigation}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const emailRef = useRef();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [error, setError] = useState();

  useEffect(() => {
    setTimeout(() => {
      emailRef.current?.focus();
    }, 500);
  }, []);

  /**
   * on change email
   * @param {*} value
   */
  const onChangeEmail = value => {
    const valid = validate(value, {empty: false, email: true});
    setEmail(value);
    setError(valid);
  };

  /**
   * on next
   */
  const onNext = () => {
    Keyboard.dismiss();
    dispatch(
      authActions.onForgot({email}, ({success, message}) => {
        if (success) {
          navigation.goBack();
        }
        Toast.show(t(message));
      }),
    );
  };

  /**
   * check disable next step
   */
  const disableNext = () => {
    const valid = validate(email, {empty: false, email: true});
    return !!valid;
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
        <Text typography="title" weight="bold" type="secondary">
          {t('forgot_password_tour')}
        </Text>
        <SizedBox height={24} />
        <TextInput
          ref={emailRef}
          defaultValue={email}
          size="small"
          label={t('email')}
          placeholder={t('input_email')}
          onChangeText={onChangeEmail}
          onFocus={() => {
            setError(null);
          }}
          onBlur={() => onChangeEmail(email)}
          error={t(error)}
        />
      </ScrollView>
      <View style={Styles.buttonContent}>
        <Button onPress={onNext} disabled={disableNext()}>
          {t('continue')}
        </Button>
      </View>
    </ScreenContainer>
  );
}
