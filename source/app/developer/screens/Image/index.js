import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, Linking, ScrollView, View} from 'react-native';
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

const RESIZEMODE = [
  {title: 'contain', value: 'contain'},
  {title: 'cover', value: 'cover'},
  {title: 'stretch', value: 'stretch'},
  {title: 'center', value: 'center'},
];

const REFERENCE = 'https://github.com/DylanVann/react-native-fast-image';

export default function Index({navigation, route}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const resizeModeRef = useRef();
  const infoRef = useRef();

  const [resizeMode, setResizeMode] = useState('cover');
  const [source, setSource] = useState(
    `{"uri": "https://source.unsplash.com/random${Date.now()}", "cache": "web"}`,
  );
  const [style, setStyle] = useState('{"width": "100%", "height": 200}');
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const styleObject = useMemo(() => {
    try {
      return JSON.parse(style);
    } catch (error) {
      return {};
    }
  }, [style]);

  const sourceObject = useMemo(() => {
    try {
      return JSON.parse(source);
    } catch (error) {
      return {};
    }
  }, [source]);

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
        ref={resizeModeRef}
        title="resizeMode"
        onSelect={item => setResizeMode(item.value)}
        selected={{title: resizeMode, value: resizeMode}}
        data={RESIZEMODE}
      />
      <BottomSheetView ref={infoRef}>
        <View style={Styles.padding8}>
          <Image
            source={Images.image}
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
          <Image
            source={sourceObject}
            resizeMode={resizeMode}
            placeholder={
              <View style={Styles.flexCenter}>
                <ActivityIndicator color={theme.colors.primary} />
              </View>
            }
            error={
              <View style={Styles.flexCenter}>
                <Icon name="error-outline" type="MaterialIcons" />
                <Text typography="subtitle" type="secondary">
                  Can't load image
                </Text>
              </View>
            }
            style={styleObject}
          />
        </View>
        <SizedBox height={24} />
        <Text typography="h4" weight="bold">
          {t('props')}
        </Text>
        <SizedBox height={16} />
        <TextInput
          defaultValue={source}
          size="small"
          label="source"
          placeholder='Example: {"uri": "https://source.unsplash.com/random", "cache": "web"}'
          onChangeText={value => {
            const text = value.replace(/[“”]/g, '"');
            setSource(text);
          }}
        />
        <SizedBox height={16} />
        <InputPicker
          label="resizeMode"
          value={resizeMode}
          placeholder="Props resizeMode"
          onPress={() => resizeModeRef.current?.present()}
          style={Styles.flex}
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
        <View style={Styles.row}>
          <View style={Styles.flex}>
            <Image
              key={`small1${time}`}
              source={{
                uri: 'https://github.com/react-native-google-signin/google-signin',
                cache: 'web',
              }}
              resizeMode="cover"
              style={styles.small}
            />
          </View>
          <SizedBox width={8} />
          <View style={Styles.flex}>
            <Image
              key={`small2${time}`}
              placeholder={
                <View style={Styles.flexCenter}>
                  <ActivityIndicator color={theme.colors.primary} />
                </View>
              }
              source={{
                uri: `https://source.unsplash.com/random?t=${time}`,
                cache: 'web',
              }}
              resizeMode="cover"
              style={styles.small}
            />
          </View>
        </View>
        <SizedBox height={8} />
        <Image
          key={`medium${time}`}
          source={{
            uri: `https://source.unsplash.com/random?t=${time}`,
            cache: 'web',
          }}
          resizeMode="cover"
          style={styles.medium}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
