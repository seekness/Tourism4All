import React, {useContext, useRef, useState} from 'react';
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
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {Keyboard, ScrollView, TouchableOpacity, View} from 'react-native';
import {validate} from '@utils';
import {useDispatch} from 'react-redux';
import {authActions} from '@actions';

export default function Index({navigation}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({
    password: null,
    rePassword: null,
  });

  const onChangePassword = value => {
    const validPassword = validate(value, {empty: false});
    setPassword(value);
    setError({...error, password: validPassword});
  };

  const onChangeRePassword = value => {
    const validRePassword = validate(value, {empty: false, match: password});
    setRePassword(value);
    setError({...error, rePassword: validRePassword});
  };

  /**
   * on next
   */
  const onNext = () => {
    Keyboard.dismiss();
    dispatch(
      authActions.onChangePassword({password}, ({success, message}) => {
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
    const validPassword = validate(password, {empty: false});
    const validRePassword = validate(rePassword, {
      empty: false,
      match: password,
    });

    return !!(validPassword || validRePassword);
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
        <SizedBox height={2} />
        <Text typography="title" weight="medium" type="secondary">
          {t('change_password_tour')}
        </Text>
        <SizedBox height={24} />
        <TextInput
          ref={passwordRef}
          defaultValue={password}
          size="small"
          label={t('password')}
          placeholder={t('input_password')}
          onChangeText={onChangePassword}
          secureTextEntry={!showPassword}
          trailing={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                color={theme.colors.secondary}
              />
            </TouchableOpacity>
          }
          onFocus={() => {
            setError({...error, password: null});
          }}
          onBlur={() => onChangePassword(password)}
          onSubmitEditing={() => rePasswordRef.current?.focus()}
          error={t(error.password)}
        />
        <SizedBox height={16} />
        <TextInput
          ref={rePasswordRef}
          defaultValue={rePassword}
          size="small"
          label={t('password')}
          placeholder={t('re_input_password')}
          onChangeText={onChangeRePassword}
          secureTextEntry={!showPassword}
          trailing={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                color={theme.colors.secondary}
              />
            </TouchableOpacity>
          }
          onFocus={() => {
            setError({...error, rePassword: null});
          }}
          onBlur={() => onChangeRePassword(rePassword)}
          error={t(error.rePassword)}
        />
      </ScrollView>
      <View style={Styles.buttonContent}>
        <Button onPress={onNext} disabled={disableNext()}>
          {t('update')}
        </Button>
      </View>
    </ScreenContainer>
  );
}
