import {
  Platform,
  UIManager,
  LayoutAnimation,
  PixelRatio,
  Dimensions,
  I18nManager,
} from 'react-native';
import RNRestart from 'react-native-restart';

const scaleValue = PixelRatio.get() / 2;

export const enableExperimental = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const scaleWithPixel = (size, limitScale = 1.2) => {
  /* setting default upto 20% when resolution device upto 20% with defalt iPhone 7 */
  const value = scaleValue > limitScale ? limitScale : scaleValue;
  return size * value;
};

export const heightHeader = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const landscape = width > height;

  if (Platform.OS === 'android') {
    return 45;
  }
  if (Platform.isPad) {
    return 65;
  }
  switch (height) {
    case 812:
    case 844:
    case 896:
    case 926:
      return landscape ? 45 : 88;
    default:
      return landscape ? 45 : 65;
  }
};

export const heightTabView = () => {
  const height = Dimensions.get('window').height;
  let size = height - heightHeader();
  switch (height) {
    case 812:
    case 844:
    case 896:
    case 926:
      size -= 30;
      break;
    default:
      break;
  }

  return size;
};

export const getWidthDevice = () => {
  return Dimensions.get('window').width;
};

export const getHeightDevice = () => {
  return Dimensions.get('window').height;
};

export const scrollEnabled = (contentWidth, contentHeight) => {
  return contentHeight > Dimensions.get('window').height - heightHeader();
};

export const languageFromCode = code => {
  switch (code) {
    case 'en':
      return 'English';
    case 'vi':
      return 'Vietnamese';
    case 'sr':
      return 'Serbian';
    case 'hu':
      return 'Hungarian';
    case 'ar':
      return 'Arabic';
    case 'da':
      return 'Danish';
    case 'de':
      return 'German';
    case 'el':
      return 'Greek';
    case 'fr':
      return 'French';
    case 'he':
      return 'Hebrew';
    case 'id':
      return 'Indonesian';
    case 'ja':
      return 'Japanese';
    case 'ko':
      return 'Korean';
    case 'lo':
      return 'Lao';
    case 'nl':
      return 'Dutch';
    case 'zh':
      return 'Chinese';
    case 'fa':
      return 'Iran';
    case 'km':
      return 'Cambodian';
    default:
      return 'Unknown';
  }
};

export const isLanguageRTL = code => {
  switch (code) {
    case 'ar':
    case 'he':
      return true;
    default:
      return false;
  }
};

export const reloadLocale = (oldLanguage, newLanguage) => {
  const oldStyle = isLanguageRTL(oldLanguage);
  const newStyle = isLanguageRTL(newLanguage);
  if (oldStyle !== newStyle) {
    I18nManager.forceRTL(newStyle);
    RNRestart.Restart();
  }
};

export const iconConvert = name => {
  name = name?.replace('far fa-', '');
  name = name?.replace('fas fa-', '');
  return name;
};

export const delay = ms => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
