import React, {useContext, useMemo, useRef, useState} from 'react';
import {ScrollView, Switch, View} from 'react-native';
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

const INPUT = [
  {title: 'option 1', value: 'option 1'},
  {title: 'option 2', value: 'option 2'},
  {title: 'option 3', value: 'option 3'},
  {title: 'option 4', value: 'option 4'},
];

const SIZE = [
  {title: 'large', value: 'large'},
  {title: 'small', value: 'small'},
];

export default function Index({navigation, route}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();

  const inputRef = useRef();
  const sizeRef = useRef();
  const infoRef = useRef();

  const [value, setValue] = useState();
  const [size, setSize] = useState('large');
  const [label, setLabel] = useState('Label');
  const [placeholder, setPlaceholder] = useState('Placeholder');
  const [error, setError] = useState();
  const [info, setInfo] = useState(true);
  const [style, setStyle] = useState();

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
        ref={inputRef}
        title="Select Option"
        onSelect={item => setValue(item.value)}
        selected={{title: value, value: value}}
        data={INPUT}
      />
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
            source={Images.inputpicker}
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
          <InputPicker
            size={size}
            value={value}
            label={label}
            error={error}
            placeholder={placeholder}
            info={info}
            onPressInfo={() => infoRef.current?.present()}
            onPress={() => inputRef.current?.present()}
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
          {t('example')}
        </Text>
        <SizedBox height={16} />
        <InputPicker
          label="Label"
          placeholder="Placeholder"
          info={true}
          onPress={() => {}}
          style={Styles.flex}
        />
        <SizedBox height={16} />
        <InputPicker
          size="large"
          label="Label"
          placeholder="Placeholder"
          info={true}
          onPress={() => {}}
          style={Styles.flex}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
