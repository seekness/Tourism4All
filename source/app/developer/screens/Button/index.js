import React, {useContext, useMemo, useRef, useState} from 'react';
import {Linking, ScrollView, Switch, View} from 'react-native';
import {
  Application,
  BottomSheetPicker,
  BottomSheetView,
  Button,
  Icon,
  IconButton,
  Image,
  InputPicker,
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
} from '@components';
import {Colors, Images, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import styles from './styles';

const TYPE = [
  {title: 'primary', value: 'primary'},
  {title: 'secondary', value: 'secondary'},
  {title: 'outline', value: 'outline'},
  {title: 'text', value: 'text'},
];

const SIZE = [
  {title: 'large', value: 'large'},
  {title: 'medium', value: 'medium'},
  {title: 'small', value: 'small'},
];

const REFERENCE = 'https://reactnative.dev/docs/touchableopacity#props';

export default function Index({navigation, route}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const typeRef = useRef();
  const sizeRef = useRef();
  const infoRef = useRef();

  const [type, setType] = useState('primary');
  const [size, setSize] = useState('large');
  const [full, setFull] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [children, setChildren] = useState('Title');
  const [style, setStyle] = useState();
  const [textStyle, setTextStyle] = useState();

  const styleObject = useMemo(() => {
    try {
      return JSON.parse(style);
    } catch (e) {
      return {};
    }
  }, [style]);

  const textStyleObject = useMemo(() => {
    try {
      return JSON.parse(textStyle);
    } catch (e) {
      return {};
    }
  }, [textStyle]);

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
        ref={typeRef}
        title="Type"
        onSelect={item => setType(item.value)}
        selected={{title: type, value: type}}
        data={TYPE}
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
            source={Images.button}
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
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button
            type={type}
            size={size}
            full={full}
            disabled={disabled}
            loading={loading}
            style={styleObject}
            textStyle={textStyleObject}>
            {children}
          </Button>
        </View>
        <SizedBox height={16} />
        <Text typography="h4" weight="bold">
          {t('props')}
        </Text>
        <SizedBox height={16} />
        <InputPicker
          label="type"
          value={type}
          placeholder="Props type"
          onPress={() => typeRef.current?.present()}
          style={Styles.flex}
        />
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
          size="small"
          defaultValue={children}
          label="children"
          placeholder="Input children"
          onChangeText={setChildren}
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
        <TextInput
          defaultValue={textStyle}
          size="small"
          label="textStyle"
          placeholder='Example: {"color":"blue"}'
          onChangeText={val => {
            const text = val.replace(/[“”]/g, '"');
            setTextStyle(text);
          }}
        />
        <SizedBox height={16} />
        <View style={Styles.rowSpace}>
          <Text typography="title" weight="bold">
            full
          </Text>
          <SizedBox width={24} />
          <Switch onValueChange={val => setFull(val)} value={full} />
        </View>
        <SizedBox height={8} />
        <View style={Styles.rowSpace}>
          <Text typography="title" weight="bold">
            disabled
          </Text>
          <SizedBox width={24} />
          <Switch onValueChange={val => setDisabled(val)} value={disabled} />
        </View>
        <SizedBox height={8} />
        <View style={Styles.rowSpace}>
          <Text typography="title" weight="bold">
            loading
          </Text>
          <SizedBox width={24} />
          <Switch onValueChange={val => setLoading(val)} value={loading} />
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
        <SizedBox height={8} />
        <Button
          type="primary"
          loading={true}
          leading={<Icon color={Colors.white} name="home-outline" />}>
          Title
        </Button>
        <SizedBox height={16} />
        <Button type="primary">Title</Button>
        <SizedBox height={16} />
        <Button type="secondary">Title</Button>
        <SizedBox height={16} />
        <Button type="outline">Title</Button>
        <SizedBox height={16} />
        <Button type="text">Title</Button>
        <SizedBox height={16} />
        <Button type="primary" size="medium">
          Title
        </Button>
        <SizedBox height={16} />
        <Button type="secondary" size="medium">
          Title
        </Button>
        <SizedBox height={16} />
        <Button type="outline" size="medium">
          Title
        </Button>
        <SizedBox height={16} />
        <Button type="text" size="medium">
          Title
        </Button>
        <SizedBox height={16} />
        <Button type="primary" size="small">
          Title
        </Button>
        <SizedBox height={16} />
        <Button type="secondary" size="small">
          Title
        </Button>
        <SizedBox height={16} />
        <Button type="outline" size="small">
          Title
        </Button>
        <SizedBox height={16} />
        <Button type="text" size="small">
          Title
        </Button>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="primary" full={false}>
            Title
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="secondary" full={false}>
            Title
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="outline" full={false}>
            Title
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="text" full={false}>
            Title
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="primary" size="medium" full={false}>
            Title
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="secondary" size="medium" full={false}>
            Title
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="outline" size="medium" full={false}>
            Title
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="text" size="medium" full={false}>
            Title
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="primary" size="small" full={false}>
            Title
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="secondary" size="small" full={false}>
            Title
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="outline" size="small" full={false}>
            Title
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowCenter}>
          <Button type="text" size="small" full={false}>
            Title
          </Button>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
