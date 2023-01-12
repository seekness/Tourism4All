import {Images} from '@configs';
import {I18nManager, LayoutAnimation, Platform, UIManager} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import RNRestart from 'react-native-restart';
import * as FileSystem from 'react-native-fs';
import {PERMISSIONS, request} from 'react-native-permissions';

const trackTimeStore = {};

export function startTrackTime(key) {
  if (trackTimeStore[key]) {
    throw 'start track already start';
  }
  trackTimeStore[key] = Date.now();
}

export function validateTheme(data) {
  if (data && data?.id && data?.light && data?.dark) {
    return true;
  }
  return false;
}

export function getFileName(uri) {
  if (uri) {
    return uri.substring(uri.lastIndexOf('/') + 1);
  }
  return null;
}

export async function fileExists(uri) {
  const fileName = getFileName(uri);
  const path = `${FileSystem.DocumentDirectoryPath}/${fileName}`;
  return await FileSystem.exists(path);
}

export function getFilePath(fileName) {
  return `${FileSystem.DocumentDirectoryPath}/${fileName}`;
}

export const enableExperimental = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const getCurrentLocation = () => {
  return new Promise(async (resolve, reject) => {
    const type = Platform.select({
      io: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });
    const status = await request(type);
    if (status === 'granted') {
      Geolocation.getCurrentPosition(
        data => {
          resolve(data?.coords);
        },
        data => {
          resolve();
        },
      );
    } else {
      resolve();
    }
  });
};

export const convertIcon = name => {
  if (name.includes('far fa-')) {
    name = name?.replace('far fa-', '');
    return {name};
  }
  if (name.includes('fas fa-')) {
    name = name?.replace('fas fa-', '');
    return {name, solid: true};
  }
  if (name.includes('fab fa-')) {
    name = name?.replace('fab fa-', '');
    return {name, brand: true};
  }
  return {name};
};

export function stopTrackTime(key) {
  if (!trackTimeStore[key] || typeof trackTimeStore[key] !== 'number') {
    throw 'could not found start track';
  }
  console.log(`TRACK TIME ${key}`, Date.now() - trackTimeStore[key]);
  delete trackTimeStore[key];
}

export function validate(
  value,
  {empty = false, match, email = false, number = false},
) {
  if (!value && !empty) {
    return 'value_not_empty';
  }
  if (match && match !== value) {
    return 'value_not_match';
  }
  if (email) {
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    const valid = regex.test(value);
    if (!valid) {
      return 'not_an_email';
    }
  }
  if (number) {
    const regex = new RegExp('^[0-9]*$');
    const valid = regex.test(value);
    if (!valid) {
      return 'not_an_number';
    }
  }
}

export function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function getNational(code) {
  switch (code) {
    case 'vi':
      return {
        value: 'vi',
        title: 'Việt Nam',
        icon: Images.vi,
      };
    case 'ar':
      return {
        value: 'ar',
        title: 'Arabic',
        icon: Images.ar,
      };

    case 'da':
      return {
        value: 'da',
        title: 'Danish',
        icon: Images.da,
      };

    case 'de':
      return {
        value: 'de',
        title: 'German',
        icon: Images.de,
      };

    case 'el':
      return {
        value: 'el',
        title: 'Greek',
        icon: Images.el,
      };

    case 'fr':
      return {
        value: 'fr',
        title: 'French',
        icon: Images.fr,
      };

    case 'he':
      return {
        value: 'he',
        title: 'Hebrew',
        icon: Images.he,
      };

    case 'id':
      return {
        value: 'id',
        title: 'Indonesian',
        icon: Images.id,
      };

    case 'ja':
      return {
        value: 'ja',
        title: 'Japanese',
        icon: Images.ja,
      };

    case 'ko':
      return {
        value: 'ko',
        title: 'Korean',
        icon: Images.ko,
      };

    case 'lo':
      return {
        value: 'lo',
        title: 'Lao',
        icon: Images.lo,
      };

    case 'nl':
      return {
        value: 'nl',
        title: 'Dutch',
        icon: Images.nl,
      };

    case 'zh':
      return {
        value: 'zh',
        title: 'Chinese',
        icon: Images.zh,
      };

    case 'fa':
      return {
        value: 'fa',
        title: 'Persian',
        icon: Images.fa,
      };

    case 'km':
      return {
        value: 'km',
        title: 'Cambodian',
        icon: Images.km,
      };

    case 'hu':
      return {
        value: 'hu',
        title: 'Hungarian',
        icon: Images.hu,
      };
    
    case 'en':
      return {
        value: 'en',
        title: 'English',
        icon: Images.en,
      };

    default:
    case 'sr':
      return {
        value: 'sr',
        title: 'Srpski',
        icon: Images.sr,
      };
  }
}

export const handleRTL = language => {
  const isLanguageRTL = code => {
    switch (code) {
      case 'ar':
      case 'he':
        return true;
      default:
        return false;
    }
  };

  const isRTL = isLanguageRTL(language);
  if (isRTL !== I18nManager.isRTL) {
    I18nManager.forceRTL(isRTL);
    RNRestart.Restart();
  }
};

export function getTitleDarkMode(value) {
  switch (value) {
    case true:
      return 'on';
    case false:
      return 'off';

    default:
      return 'auto_system';
  }
}

export function isValidURL(string) {
  const res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  );
  return res !== null;
}
