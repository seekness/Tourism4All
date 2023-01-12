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
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
} from '@components';
import {Images, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import styles from './styles';

const TYPOGRAPHY = [
  {title: 'h1', value: 'h1'},
  {title: 'h2', value: 'h2'},
  {title: 'h3', value: 'h3'},
  {title: 'h4', value: 'h4'},
  {title: 'title', value: 'title'},
  {title: 'subtitle', value: 'subtitle'},
  {title: 'caption', value: 'caption'},
  {title: 'overline', value: 'overline'},
];

const WEIGHT = [
  {title: 'thin', value: 'thin'},
  {title: 'ultraLight', value: 'ultraLight'},
  {title: 'light', value: 'light'},
  {title: 'regular', value: 'regular'},
  {title: 'medium', value: 'medium'},
  {title: 'semibold', value: 'semibold'},
  {title: 'bold', value: 'bold'},
  {title: 'heavy', value: 'heavy'},
  {title: 'black', value: 'black'},
];

const TYPE = [
  {title: 'primary', value: 'primary'},
  {title: 'secondary', value: 'secondary'},
];

const COLOR = [
  {title: 'primary', value: 'primary'},
  {title: 'secondary', value: 'secondary'},
  {title: 'white', value: 'white'},
  {title: 'error', value: 'error'},
];

const STYLE = [
  {title: 'normal', value: 'normal'},
  {title: 'italic', value: 'italic'},
];

const REFERENCE = 'https://reactnative.dev/docs/text#props';

export default function Index({navigation, route}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const typographyRef = useRef();
  const weightRef = useRef();
  const typeRef = useRef();
  const colorRef = useRef();
  const styleRef = useRef();
  const infoRef = useRef();
  const [typography, setTypography] = useState('h1');
  const [weight, setWeight] = useState('regular');
  const [type, setType] = useState('primary');
  const [fontStyle, setFontStyle] = useState('normal');
  const [color, setColor] = useState();
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
        ref={typographyRef}
        title="Typography"
        onSelect={item => setTypography(item.value)}
        selected={{title: typography, value: typography}}
        data={TYPOGRAPHY}
      />
      <BottomSheetPicker
        ref={weightRef}
        title="Weight"
        onSelect={item => setWeight(item.value)}
        selected={{title: weight, value: weight}}
        data={WEIGHT}
      />
      <BottomSheetPicker
        ref={typeRef}
        title="Type"
        onSelect={item => setType(item.value)}
        selected={{title: type, value: type}}
        data={TYPE}
      />
      <BottomSheetPicker
        ref={colorRef}
        title="Color"
        onSelect={item => setColor(item.value)}
        selected={{title: color, value: color}}
        data={COLOR}
      />
      <BottomSheetPicker
        ref={styleRef}
        title="Font Style"
        onSelect={item => setFontStyle(item.value)}
        selected={{title: fontStyle, value: fontStyle}}
        data={STYLE}
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
          <Text
            typography={typography}
            type={type}
            weight={weight}
            color={color}
            fontStyle={fontStyle}
            style={styleObject}>
            Hello World
          </Text>
        </View>
        <SizedBox height={24} />
        <Text typography="h4" weight="bold">
          {t('props')}
        </Text>
        <SizedBox height={16} />
        <View style={Styles.row}>
          <InputPicker
            label="typography"
            value={typography}
            placeholder="Props typography"
            onPress={() => typographyRef.current?.present()}
            style={Styles.flex}
          />
          <SizedBox width={16} />
          <InputPicker
            label="weight"
            value={weight}
            placeholder="Props weight"
            onPress={() => weightRef.current?.present()}
            style={Styles.flex}
          />
        </View>
        <SizedBox height={16} />
        <View style={Styles.row}>
          <InputPicker
            label="type"
            value={type}
            placeholder="Props type"
            onPress={() => typeRef.current?.present()}
            style={Styles.flex}
          />
          <SizedBox width={16} />
          <InputPicker
            label="color"
            value={color}
            placeholder="Props color"
            onPress={() => colorRef.current?.present()}
            style={Styles.flex}
          />
        </View>
        <SizedBox height={16} />
        <InputPicker
          label="fontStyle"
          value={fontStyle}
          placeholder="Props fontStyle"
          onPress={() => styleRef.current?.present()}
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
        <Text typography="h1" weight="thin">
          H1
        </Text>
        <Text typography="h1" weight="ultraLight">
          H1
        </Text>
        <Text typography="h1" weight="light">
          H1
        </Text>
        <Text typography="h1" weight="regular">
          H1
        </Text>
        <Text typography="h1" weight="medium">
          H1
        </Text>
        <Text typography="h1" weight="semibold">
          H1
        </Text>
        <Text typography="h1" weight="bold">
          H1
        </Text>
        <Text typography="h1" weight="heavy">
          H1
        </Text>
        <Text typography="h1" weight="black">
          H1
        </Text>
        <SizedBox height={8} />
        <Text typography="h2" weight="thin">
          H2
        </Text>
        <Text typography="h2" weight="ultraLight">
          H2
        </Text>
        <Text typography="h2" weight="light">
          H2
        </Text>
        <Text typography="h2" weight="regular">
          H2
        </Text>
        <Text typography="h2" weight="medium">
          H2
        </Text>
        <Text typography="h2" weight="semibold">
          H2
        </Text>
        <Text typography="h2" weight="bold">
          H2
        </Text>
        <Text typography="h2" weight="heavy">
          H2
        </Text>
        <Text typography="h2" weight="black">
          H2
        </Text>
        <SizedBox height={8} />
        <Text typography="h3" weight="thin">
          H3
        </Text>
        <Text typography="h3" weight="ultraLight">
          H3
        </Text>
        <Text typography="h3" weight="light">
          H3
        </Text>
        <Text typography="h3" weight="regular">
          H3
        </Text>
        <Text typography="h3" weight="medium">
          H3
        </Text>
        <Text typography="h3" weight="semibold">
          H3
        </Text>
        <Text typography="h3" weight="bold">
          H3
        </Text>
        <Text typography="h3" weight="heavy">
          H3
        </Text>
        <Text typography="h3" weight="black">
          H3
        </Text>
        <SizedBox height={8} />
        <Text typography="h4" weight="thin">
          H4
        </Text>
        <Text typography="h4" weight="ultraLight">
          H4
        </Text>
        <Text typography="h4" weight="light">
          H4
        </Text>
        <Text typography="h4" weight="regular">
          H4
        </Text>
        <Text typography="h4" weight="medium">
          H4
        </Text>
        <Text typography="h4" weight="semibold">
          H4
        </Text>
        <Text typography="h4" weight="bold">
          H4
        </Text>
        <Text typography="h4" weight="heavy">
          H4
        </Text>
        <Text typography="h4" weight="black">
          H4
        </Text>
        <SizedBox height={8} />
        <Text typography="title" weight="thin">
          Title
        </Text>
        <Text typography="title" weight="ultraLight">
          Title
        </Text>
        <Text typography="title" weight="light">
          Title
        </Text>
        <Text typography="title" weight="regular">
          Title
        </Text>
        <Text typography="title" weight="medium">
          Title
        </Text>
        <Text typography="title" weight="semibold">
          Title
        </Text>
        <Text typography="title" weight="bold">
          Title
        </Text>
        <Text typography="title" weight="heavy">
          Title
        </Text>
        <Text typography="title" weight="black">
          Title
        </Text>
        <SizedBox height={8} />
        <Text typography="subtitle" weight="thin">
          Subtitle
        </Text>
        <Text typography="subtitle" weight="ultraLight">
          Subtitle
        </Text>
        <Text typography="subtitle" weight="light">
          Subtitle
        </Text>
        <Text typography="subtitle" weight="regular">
          Subtitle
        </Text>
        <Text typography="subtitle" weight="medium">
          Subtitle
        </Text>
        <Text typography="subtitle" weight="semibold">
          Subtitle
        </Text>
        <Text typography="subtitle" weight="bold">
          Subtitle
        </Text>
        <Text typography="subtitle" weight="heavy">
          Subtitle
        </Text>
        <Text typography="subtitle" weight="black">
          Subtitle
        </Text>
        <SizedBox height={8} />
        <Text typography="caption" weight="thin">
          Caption
        </Text>
        <Text typography="caption" weight="ultraLight">
          Caption
        </Text>
        <Text typography="caption" weight="light">
          Caption
        </Text>
        <Text typography="caption" weight="regular">
          Caption
        </Text>
        <Text typography="caption" weight="medium">
          Caption
        </Text>
        <Text typography="caption" weight="semibold">
          Caption
        </Text>
        <Text typography="caption" weight="bold">
          Caption
        </Text>
        <Text typography="caption" weight="heavy">
          Caption
        </Text>
        <Text typography="caption" weight="black">
          Caption
        </Text>
        <SizedBox height={8} />
        <Text typography="overline" weight="thin">
          Overline
        </Text>
        <Text typography="overline" weight="ultraLight">
          Overline
        </Text>
        <Text typography="overline" weight="light">
          Overline
        </Text>
        <Text typography="overline" weight="regular">
          Overline
        </Text>
        <Text typography="overline" weight="medium">
          Overline
        </Text>
        <Text typography="overline" weight="semibold">
          Overline
        </Text>
        <Text typography="overline" weight="bold">
          Overline
        </Text>
        <Text typography="overline" weight="heavy">
          Overline
        </Text>
        <Text typography="overline" weight="black">
          Overline
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
}
