import React, {useContext, useMemo, useRef, useState} from 'react';
import {Linking, ScrollView, View} from 'react-native';
import {
  Application,
  BottomSheetPicker,
  BottomSheetView,
  Icon,
  IconButton,
  Image,
  InputPicker,
  ListItem,
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
} from '@components';
import {Images, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import styles from './styles';

const SIZE = [
  {title: 16, value: 16},
  {title: 24, value: 24},
  {title: 32, value: 32},
  {title: 40, value: 40},
  {title: 46, value: 46},
];

const REFERENCE = 'https://reactnative.dev/docs/text#props';

export default function Index({navigation, route}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const sizeRef = useRef();
  const infoRef = useRef();

  const [size, setSize] = useState(24);
  const [title, setTitle] = useState('Title');
  const [subtitle, setSubTitle] = useState('Sub title');
  const [style, setStyle] = useState();

  const styleObject = useMemo(() => {
    try {
      return JSON.parse(style);
    } catch (error) {
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
        title="Typography"
        onSelect={item => setSize(item.value)}
        selected={{title: size, value: size}}
        data={SIZE}
      />
      <BottomSheetView ref={infoRef}>
        <View style={Styles.padding8}>
          <Image
            source={Images.text}
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
          <ListItem
            size={size}
            title={title}
            subtitle={subtitle}
            leading={null}
            trailing={null}
            onPress={() => {}}
            style={styleObject}
          />
        </View>
        <SizedBox height={24} />
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
          defaultValue={title}
          size="small"
          label="title"
          placeholder="Input title"
          onChangeText={setTitle}
        />
        <SizedBox height={16} />
        <TextInput
          defaultValue={subtitle}
          size="small"
          label="subtitle"
          placeholder="Input subtitle"
          onChangeText={setSubTitle}
        />
        <SizedBox height={16} />
        <TextInput
          defaultValue={style}
          size="small"
          label="style"
          placeholder='Example: {"color":"red"}'
          onChangeText={value => {
            const text = value.replace(/[“”]/g, '"');
            setStyle(text);
          }}
        />
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
            } catch (error) {}
          }}>
          {REFERENCE}
        </Text>
        <SizedBox height={16} />
        <Text typography="h4" weight="bold">
          {t('example')}
        </Text>
        <SizedBox height={8} />
      </ScrollView>
    </ScreenContainer>
  );
}
