import React, {useContext, useRef, useState} from 'react';
import {
  Application,
  Button,
  ImagePicker,
  ScreenContainer,
  SizedBox,
  TextInput,
  Toast,
  UploadImage,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {Keyboard, ScrollView, View} from 'react-native';
import {validate} from '@utils';
import {useDispatch, useSelector} from 'react-redux';
import {userSelect} from '@selectors';
import {authActions} from '@actions';
import styles from './styles';

export default function Index({navigation}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const user = useSelector(userSelect);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const websiteRef = useRef();
  const infoRef = useRef();
  const imageRef = useRef();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [website, setWebsite] = useState(user?.url);
  const [info, setInfo] = useState(user?.description);

  const [error, setError] = useState({
    name: null,
    email: null,
    website: null,
    info: null,
  });

  const onChangeName = value => {
    const validName = validate(value, {empty: false});
    setName(value);
    setError({...error, name: validName});
  };

  const onChangeEmail = value => {
    const validEmail = validate(value, {empty: false, email: true});
    setEmail(value);
    setError({...error, email: validEmail});
  };

  const onChangeWebsite = value => {
    const validWebsite = validate(value, {empty: false});
    setWebsite(value);
    setError({...error, website: validWebsite});
  };

  const onChangeInfo = value => {
    const validInfo = validate(value, {empty: false});
    setInfo(value);
    setError({...error, info: validInfo});
  };

  /**
   * on next
   */
  const onNext = () => {
    Keyboard.dismiss();
    const params = {name, email, url: website, description: info};
    if (imageRef.current) {
      params.listar_user_photo = imageRef.current?.id;
    }
    dispatch(
      authActions.onEditProfile(params, ({success, message}) => {
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
    const validName = validate(name, {empty: false});
    const validEmail = validate(email, {empty: false, email: true});
    const validWebsite = validate(website, {empty: false});
    const validInfo = validate(info, {empty: false});

    return !!(validName || validEmail || validWebsite || validInfo);
  };

  return (
    <ScreenContainer navigation={navigation} enableKeyboardAvoidingView={true}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={Styles.flex}
        contentContainerStyle={[
          Styles.padding16,
          {backgroundColor: theme.colors.card},
        ]}>
        <View style={Styles.rowCenter}>
          <UploadImage
            onCompleted={data => {
              imageRef.current = data;
            }}>
            {({percent, uri, processing, upload}) => {
              return (
                <ImagePicker
                  image={{uri: uri ?? user?.image}}
                  percent={percent}
                  processing={processing}
                  onResult={upload}
                  style={styles.avatar}
                />
              );
            }}
          </UploadImage>
        </View>
        <SizedBox height={16} />
        <TextInput
          ref={nameRef}
          defaultValue={name}
          size="small"
          label={t('name')}
          placeholder={t('input_name')}
          onChangeText={onChangeName}
          onFocus={() => {
            setError({...error, name: null});
          }}
          onBlur={() => onChangeName(name)}
          onSubmitEditing={() => emailRef.current?.focus()}
          error={t(error.name)}
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
            setError({...error, email: null});
          }}
          onBlur={() => onChangeEmail(email)}
          onSubmitEditing={() => websiteRef.current?.focus()}
          error={t(error.email)}
        />
        <SizedBox height={16} />
        <TextInput
          ref={websiteRef}
          defaultValue={website}
          size="small"
          label={t('website')}
          placeholder={t('input_website')}
          onChangeText={onChangeWebsite}
          onFocus={() => {
            setError({...error, website: null});
          }}
          onBlur={() => onChangeWebsite(website)}
          onSubmitEditing={() => infoRef.current?.focus()}
          error={t(error.website)}
        />
        <SizedBox height={16} />
        <TextInput
          ref={infoRef}
          defaultValue={info}
          size="small"
          label={t('info')}
          placeholder={t('input_info')}
          onChangeText={onChangeInfo}
          onFocus={() => {
            setError({...error, info: null});
          }}
          numberOfLines={5}
          onBlur={() => onChangeInfo(info)}
          error={t(error.info)}
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
