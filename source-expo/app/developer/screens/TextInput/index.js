import React, {useContext, useMemo, useRef, useState} from 'react';
import {
  Linking,
  ScrollView,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Application,
  BottomSheetPicker,
  BottomSheetView,
  Icon,
  IconButton,
  Image,
  InputPicker,
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
} from '@components';
import {Images, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import styles from './styles';

const SIZE = [
  {title: 'large', value: 'large'},
  {title: 'small', value: 'small'},
];

const REFERENCE = 'https://reactnative.dev/docs/textinput#props';

export default function Index({navigation, route}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const sizeRef = useRef();
  const infoRef = useRef();

  const [value, setValue] = useState('');
  const [size, setSize] = useState('large');
  const [label, setLabel] = useState('Label');
  const [placeholder, setPlaceholder] = useState('Placeholder');
  const [error, setError] = useState();
  const [info, setInfo] = useState(true);
  const [style, setStyle] = useState();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const styleObject = useMemo(() => {
    try {
      return JSON.parse(style);
    } catch (e) {
      return {};
    }
  }, [style]);

  return (
    <ScreenContainer
      navigation={navigation}
      enableKeyboardAvoidingView={true}
      options={{
        headerRight: () => {
          return (
            <View style={Styles.nativeRightButton}>
              <IconButton
                onPress={() => infoRef.current?.present()}
                size="small">
                <Icon name="information-outline" />
              </IconButton>
              <SizedBox width={4} />
              <IconButton
                onPress={() => {
                  navigation.push('Code', route.params);
                }}
                size="small">
                <Icon name="file-code-outline" />
              </IconButton>
            </View>
          );
        },
      }}>
      <BottomSheetPicker
        ref={sizeRef}
        title="Size"
        onSelect={item => setSize(item.value)}
        selected={{title: size, value: size}}
        data={SIZE}
      />
      <BottomSheetView ref={infoRef}>
        <View style={Styles.padding8}>
          <Image
            source={Images.textinput}
            resizeMode="contain"
            style={styles.example}
          />
        </View>
      </BottomSheetView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[Styles.flex, {backgroundColor: theme.colors.card}]}
        contentContainerStyle={Styles.padding16}>
        <Text typography="h4" weight="bold">
          {t('interactive_demo')}
        </Text>
        <SizedBox height={24} />
        <View style={Styles.rowCenter}>
          <TextInput
            defaultValue={value}
            size={size}
            label={label}
            error={error}
            placeholder={placeholder}
            onChangeText={setValue}
            info={info}
            onPressInfo={() => infoRef.current?.present()}
            style={styleObject}
          />
        </View>
        <SizedBox height={16} />
        <Text typography="h4" weight="bold">
          {t('props')}
        </Text>
        <SizedBox height={16} />
        <InputPicker
          label="size"
          value={size}
          placeholder="Props size"
          onPress={() => sizeRef.current?.present()}
          style={Styles.flex}
        />
        <SizedBox height={16} />
        <TextInput
          defaultValue={label}
          size="small"
          label="label"
          placeholder="Input label"
          onChangeText={setLabel}
        />
        <SizedBox height={16} />
        <TextInput
          defaultValue={placeholder}
          size="small"
          label="placeholder"
          placeholder="Input placeholder"
          onChangeText={setPlaceholder}
        />
        <SizedBox height={16} />
        <TextInput
          defaultValue={error}
          size="small"
          label="error"
          placeholder="Input error"
          onChangeText={setError}
        />
        <SizedBox height={16} />
        <TextInput
          defaultValue={style}
          size="small"
          label="style"
          placeholder='Example: {"backgroundColor":"red"}'
          onChangeText={val => {
            const text = val.replace(/[“”]/g, '"');
            setStyle(text);
          }}
        />
        <SizedBox height={16} />
        <View style={Styles.rowSpace}>
          <Text typography="title" weight="bold">
            info
          </Text>
          <SizedBox width={24} />
          <Switch onValueChange={val => setInfo(val)} value={info} />
        </View>
        <SizedBox height={16} />
        <Text typography="h4" weight="bold">
          {t('reference')}
        </Text>
        <SizedBox height={8} />
        <Text
          typography="title"
          color="secondary"
          onPress={() => {
            try {
              Linking.openURL(REFERENCE);
            } catch (e) {}
          }}>
          {REFERENCE}
        </Text>
        <SizedBox height={16} />
        <Text typography="h4" weight="bold">
          {t('example')}
        </Text>
        <SizedBox height={16} />
        <TextInput
          defaultValue={password}
          size="small"
          label="Mật khẩu"
          placeholder="Mật khẩu"
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          info={true}
          trailing={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                color={theme.colors.secondary}
              />
            </TouchableOpacity>
          }
        />
        <SizedBox height={16} />
        <TextInput
          defaultValue={password}
          label="Mật khẩu"
          placeholder="Mật khẩu"
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          info={true}
          trailing={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                type="MaterialIcons"
                name={showPassword ? 'favorite' : 'favorite-outline'}
                color={theme.colors.secondary}
              />
            </TouchableOpacity>
          }
        />
      </ScrollView>
    </ScreenContainer>
  );
}
