import React, {useEffect, useMemo} from 'react';
import {Platform, StatusBar, useColorScheme} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootSiblingParent} from 'react-native-root-siblings';
import {useSelector} from 'react-redux';
import i18n from 'i18next';
import {Application} from '@components';
import {
  fontSelect,
  forceDarkSelect,
  languageSelect,
  themeSelect,
} from '@selectors';
import Navigation from '@navigation';
import {Setting, Styles} from '@configs';
import {validateTheme} from '@utils';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export default function AppContainer() {
  const languageStorage = useSelector(languageSelect);
  const isDarkMode = useColorScheme() === 'dark';
  const fontStorage = useSelector(fontSelect);
  const darkModeStorage = useSelector(forceDarkSelect);
  const themeStorage = useSelector(themeSelect);

  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent', true);
      }
    });
  }, []);

  /**
   * change language change
   */
  useEffect(() => {
    i18n.changeLanguage(languageStorage);
  }, [languageStorage]);

  /**
   * setup theme of application
   */
  const theme = useMemo(() => {
    let item = Setting.defaultTheme;
    let isDark = isDarkMode;
    if (validateTheme(themeStorage)) {
      item = themeStorage;
    }
    if (darkModeStorage === true) {
      isDark = true;
    }
    if (darkModeStorage === false) {
      isDark = false;
    }
    const schema = isDark ? item.dark : item.light;
    SystemNavigationBar.setNavigationColor(
      schema.colors.card,
      isDark ? 'light' : 'dark',
      'navigation',
    );
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    return schema;
  }, [darkModeStorage, isDarkMode, themeStorage]);

  return (
    <GestureHandlerRootView style={Styles.flex}>
      <Application.Provider
        value={{
          language: languageStorage,
          font: fontStorage ?? Setting.defaultFont,
          theme,
        }}>
        <RootSiblingParent>
          <BottomSheetModalProvider>
            <Navigation />
          </BottomSheetModalProvider>
        </RootSiblingParent>
      </Application.Provider>
    </GestureHandlerRootView>
  );
}
