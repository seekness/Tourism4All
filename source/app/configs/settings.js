import {version} from '../../package.json';
import moment from 'moment';

/**
 * Basic Setting Variables Define
 */
export const Setting = {
  name: 'Tourism4All',
  appVersion: version,
  domain: 'https://tourism4all.online',
  defaultLanguage: 'sr',
  defaultFont: 'ProximaNova',
  fontSupport: ['ProximaNova', 'SFProText', 'Raleway'],
  defaultTheme: {
    id: 'default',
    light: {
      mode: 'light',
      colors: {
        primary: '#e5634d',
        secondary: '#4a91a4',
        background: '#f9f9f9',
        card: '#ffffff',
        text: '#303233',
        textSecondary: '#727272',
        border: '#e8e8e8',
        error: '#f44336',
      },
    },
    dark: {
      mode: 'dark',
      colors: {
        primary: '#e5634d',
        secondary: '#4a91a4',
        background: '#171819',
        card: '#202122',
        text: '#e4e6eb',
        textSecondary: '#b0b3b8',
        border: '#333435',
        error: '#f44336',
      },
    },
  },
  themeSupport: [
    {
      id: 'default',
      light: {
        mode: 'light',
        colors: {
          primary: '#4f9ec9',
          secondary: '#de7002',
          background: '#f9f9f9',
          card: '#ffffff',
          text: '#303233',
          textSecondary: '#727272',
          border: '#e8e8e8',
          error: '#f44336',
        },
      },
      dark: {
        mode: 'dark',
        colors: {
          primary: '#e5634d',
          secondary: '#4a91a4',
          background: '#171819',
          card: '#202122',
          text: '#e4e6eb',
          textSecondary: '#b0b3b8',
          border: '#333435',
          error: '#f44336',
        },
      },
    },
    {
      id: 'orange',
      light: {
        mode: 'light',
        colors: {
          primary: '#f4a261',
          secondary: '#a5d6a7',
          background: '#f9f9f9',
          card: '#ffffff',
          text: '#303233',
          textSecondary: '#727272',
          border: '#e8e8e8',
          error: '#f44336',
        },
      },
      dark: {
        mode: 'dark',
        colors: {
          primary: '#f4a261',
          secondary: '#a5d6a7',
          background: '#171819',
          card: '#202122',
          text: '#e4e6eb',
          textSecondary: '#b0b3b8',
          border: '#333435',
          error: '#f44336',
        },
      },
    },
  ],
  languageSupport: [
    'sr',
    'hu',
    'en',
    //'vi',
    //'ar',
    //'da',
    //'de',
    //'el',
    //'fr',
    //'he',
    //'id',
    //'ja',
    //'ko',
    //'lo',
    //'nl',
    //'zh',
    //'fa',
    //'km',
  ],
  resourcesLanguage: {
    sr: {
      translation: require('../localization/sr.json'),
    },
    hu: {
      translation: require('../localization/hu.json'),
    },
    en: {
      translation: require('../localization/en.json'),
    },
    vi: {
      translation: require('../localization/vi.json'),
    },
    ar: {
      translation: require('../localization/ar.json'),
    },
    da: {
      translation: require('../localization/da.json'),
    },
    de: {
      translation: require('../localization/de.json'),
    },
    el: {
      translation: require('../localization/el.json'),
    },
    fr: {
      translation: require('../localization/fr.json'),
    },
    he: {
      translation: require('../localization/he.json'),
    },
    id: {
      translation: require('../localization/id.json'),
    },
    ja: {
      translation: require('../localization/ja.json'),
    },
    ko: {
      translation: require('../localization/ko.json'),
    },
    lo: {
      translation: require('../localization/lo.json'),
    },
    nl: {
      translation: require('../localization/nl.json'),
    },
    zh: {
      translation: require('../localization/zh.json'),
    },
    fa: {
      translation: require('../localization/fa.json'),
    },
    km: {
      translation: require('../localization/km.json'),
    },
  },
  resourcesFont: {
    'ProximaNova-Black': require('../assets/fonts/ProximaNova-Black.otf'),
    'ProximaNova-Bold': require('../assets/fonts/ProximaNova-Bold.otf'),
    'ProximaNova-ExtraBold': require('../assets/fonts/ProximaNova-ExtraBold.otf'),
    'ProximaNova-Regular': require('../assets/fonts/ProximaNova-Regular.otf'),
    'ProximaNova-Thin': require('../assets/fonts/ProximaNova-Thin.otf'),
    'Raleway-Black': require('../assets/fonts/Raleway-Black.ttf'),
    'Raleway-BlackItalic': require('../assets/fonts/Raleway-BlackItalic.ttf'),
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
    'Raleway-BoldItalic': require('../assets/fonts/Raleway-BoldItalic.ttf'),
    'Raleway-ExtraBold': require('../assets/fonts/Raleway-ExtraBold.ttf'),
    'Raleway-ExtraBoldItalic': require('../assets/fonts/Raleway-ExtraBoldItalic.ttf'),
    'Raleway-ExtraLight': require('../assets/fonts/Raleway-ExtraLight.ttf'),
    'Raleway-ExtraLightItalic': require('../assets/fonts/Raleway-ExtraLightItalic.ttf'),
    'Raleway-Italic': require('../assets/fonts/Raleway-Italic.ttf'),
    'Raleway-Light': require('../assets/fonts/Raleway-Light.ttf'),
    'Raleway-LightItalic': require('../assets/fonts/Raleway-LightItalic.ttf'),
    'Raleway-Medium': require('../assets/fonts/Raleway-Medium.ttf'),
    'Raleway-MediumItalic': require('../assets/fonts/Raleway-MediumItalic.ttf'),
    'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
    'Raleway-SemiBold': require('../assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-SemiBoldItalic': require('../assets/fonts/Raleway-SemiBoldItalic.ttf'),
    'Raleway-Thin': require('../assets/fonts/Raleway-Thin.ttf'),
    'Raleway-ThinItalic': require('../assets/fonts/Raleway-ThinItalic.ttf'),
    'SFProText-Black': require('../assets/fonts/SFProText-Black.ttf'),
    'SFProText-Bold': require('../assets/fonts/SFProText-Bold.ttf'),
    'SFProText-Heavy': require('../assets/fonts/SFProText-Heavy.ttf'),
    'SFProText-Light': require('../assets/fonts/SFProText-Light.ttf'),
    'SFProText-Medium': require('../assets/fonts/SFProText-Medium.ttf'),
    'SFProText-Regular': require('../assets/fonts/SFProText-Regular.ttf'),
    'SFProText-Semibold': require('../assets/fonts/SFProText-Semibold.ttf'),
    'SFProText-Thin': require('../assets/fonts/SFProText-Thin.ttf'),
    'SFProText-Ultralight': require('../assets/fonts/SFProText-Ultralight.ttf'),
  },
  storeReview: moment().isBefore(moment('2022-09-25', 'YYYY-MM-DD')),
};
