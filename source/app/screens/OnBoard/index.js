import React, {useContext, useRef} from 'react';
import {View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors, Images, Setting, Styles} from '@configs';
import {
  Application,
  BottomSheetPicker,
  Icon,
  IconButton,
  Image,
  LinearGradient,
  SafeAreaView,
  Text,
} from '@components';
import {getNational} from '@utils';
import {applicationActions} from '@actions';
import styles from './styles';

const DEFAULT = [
  {
    title: 'onboard_title_1',
    subtitle: 'onboard_message_1',
    image: Images.onboard1,
  },
  {
    title: 'onboard_title_2',
    subtitle: 'onboard_message_2',
    image: Images.onboard2,
  },
  {
    title: 'onboard_title_3',
    subtitle: 'onboard_message_3',
    image: Images.onboard3,
  },
];

export default function OnBoard({navigation, route}) {
  const {theme} = useContext(Application);
  const bottomSheetRef = useRef();
  const slides = route.params?.slides ?? DEFAULT;
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  /**
   * save onboard storage
   * @param {*} value
   */
  const onDone = value => {
    navigation.pop?.();
    route.params?.callback?.(value);
  };

  /**
   * on change language
   * @param {*} item
   */
  const onChangeLanguage = item => {
    dispatch(applicationActions.changeLanguage(item.value));
  };

  /**
   * render next button
   * @return {*}
   */
  const renderNextButton = () => {
    return (
      <View
        style={[
          styles.buttonCircle,
          {backgroundColor: theme.colors.textSecondary},
        ]}>
        <Icon name="arrow-right" color={Colors.white} />
      </View>
    );
  };

  /**
   * render done button
   * @return {*}
   */
  const renderDoneButton = () => {
    return (
      <View
        style={[styles.buttonCircle, {backgroundColor: theme.colors.primary}]}>
        <Icon name="check" color={Colors.white} />
      </View>
    );
  };

  /**
   * render item of slides
   *
   * @param {*} {item}
   * @return {*}
   */
  const renderItem = ({item}) => {
    return (
      <View style={[Styles.flexCenter, Styles.padding16]}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <Text typography="h3" weight="bold" style={styles.textTitle}>
          {t(item.title)}
        </Text>
        <Text typography="title" style={styles.textSubtitle}>
          {t(item.subtitle)}
        </Text>
      </View>
    );
  };

  /**
   * render back action
   * @return {*}
   */
  const renderBackButton = () => {
    if (route.params?.allowBack) {
      return (
        <View style={styles.backButton}>
          <SafeAreaView>
            <IconButton
              style={{backgroundColor: theme.colors.primary}}
              onPress={() => navigation.pop?.()}
              size="small">
              <Icon name="close" color={Colors.white} />
            </IconButton>
          </SafeAreaView>
        </View>
      );
    }
  };

  /**
   * render bottom sheet language picker
   * @returns {JSX.Element}
   */
  const renderSelectLanguage = () => {
    return (
      <BottomSheetPicker
        ref={bottomSheetRef}
        title={t('choose_language')}
        onSelect={onChangeLanguage}
        selected={getNational(i18n.language)}
        data={Setting.languageSupport.map(item => getNational(item))}
      />
    );
  };

  /**
   * render change language
   * @return {*}
   */
  const renderLanguageButton = () => {
    if (route.params?.allowChangeLanguage) {
      return (
        <View style={styles.languageButton}>
          {renderSelectLanguage()}
          <SafeAreaView>
            <IconButton
              style={{backgroundColor: theme.colors.primary}}
              onPress={() => bottomSheetRef.current?.present()}
              size="small">
              <Icon name="web" color={Colors.white} />
            </IconButton>
          </SafeAreaView>
        </View>
      );
    }
  };

  return (
    <LinearGradient
      colors={[
        theme.colors.primary,
        theme.colors.background,
        theme.colors.background,
      ]}
      style={Styles.flex}>
      <AppIntroSlider
        data={slides}
        activeDotStyle={{backgroundColor: theme.colors.primary}}
        dotStyle={{backgroundColor: theme.colors.textSecondary}}
        renderItem={renderItem}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        onDone={() => onDone(true)}
        onSkip={() => onDone(false)}
      />
      {renderBackButton()}
      {renderLanguageButton()}
    </LinearGradient>
  );
}
