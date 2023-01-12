import React, {useContext, useRef} from 'react';
import {
  Application,
  BottomSheetPicker,
  Button,
  Divider,
  Icon,
  ListItem,
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
  Toast,
} from '@components';
import {Setting, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  domainSelect,
  fontSelect,
  forceDarkSelect,
  languageSelect,
  listingStyleSelect,
} from '@selectors';
import {getNational, getTitleDarkMode, handleRTL} from '@utils';
import {applicationActions} from '@actions';
import Navigator from '@navigator';

export default function Index({navigation}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const dispatch = useDispatch();
  const languageRef = useRef();
  const darkModeRef = useRef();
  const fontRef = useRef();
  const domainRef = useRef();
  const listingStyleRef = useRef();

  const languageStorage = useSelector(languageSelect);
  const darkModeStorage = useSelector(forceDarkSelect);
  const fontStorage = useSelector(fontSelect);
  const domainStorage = useSelector(domainSelect);
  const listingStyleStorage = useSelector(listingStyleSelect);

  /**
   * change language
   * @param item
   */
  const onChangeLanguage = item => {
    dispatch(applicationActions.changeLanguage(item.value));
    setTimeout(() => {
      handleRTL(item.value);
    }, 500);
  };

  /**
   * change theme
   */
  const onChangeTheme = () => {
    navigation.navigate('SettingTheme');
  };

  /**
   * change dark mode option
   * @param item
   */
  const onChangeDarkMode = item => {
    dispatch(applicationActions.changeDarkMode(item.data));
  };

  /**
   * change font style
   * @param item
   */
  const onChangeFont = item => {
    dispatch(applicationActions.changeFont(item.value));
  };

  /**
   * on change domain
   */
  const onChangeDomain = () => {
    navigation.goBack();
    setTimeout(() => {
      dispatch(
        applicationActions.changeDomain(
          domainRef.current ?? domainStorage,
          ({success, message}) => {
            if (success) {
              Navigator.popToTop();
              Navigator.navigate('Splash');
            }
            Toast.show(t(message));
          },
        ),
      );
    }, 450);
  };

  /**
   * change listing style
   * @param item
   */
  const onChangeListingStyle = item => {
    dispatch(applicationActions.changeListingStyle(item.value));
  };

  /**
   * on popup change domain
   */
  const onDomain = () => {
    Navigator.showPopup({
      component: (
        <View
          style={[
            styles.popupContainer,
            {
              backgroundColor: theme.colors.card,
            },
          ]}>
          <Text typography="h4" weight="bold">
            {t('domain')}
          </Text>
          <SizedBox height={24} />
          <TextInput
            defaultValue={domainStorage}
            label={t('domain')}
            placeholder={t('input_domain')}
            onChangeText={value => {
              domainRef.current = value;
            }}
            size="small"
          />
          <SizedBox height={24} />
          <View style={Styles.rowCenter}>
            <Button
              style={Styles.flex}
              type="secondary"
              onPress={() => navigation.goBack()}>
              {t('cancel')}
            </Button>
            <SizedBox width={16} />
            <Button style={Styles.flex} onPress={onChangeDomain}>
              {t('ok')}
            </Button>
          </View>
        </View>
      ),
    });
  };

  return (
    <ScreenContainer navigation={navigation} enableKeyboardAvoidingView={true}>
      <BottomSheetPicker
        ref={languageRef}
        title={t('language')}
        onSelect={onChangeLanguage}
        selected={getNational(languageStorage)}
        data={Setting.languageSupport.map(item => {
          return getNational(item);
        })}
      />
      <BottomSheetPicker
        ref={darkModeRef}
        title={t('dark_mode')}
        onSelect={onChangeDarkMode}
        selected={{
          title: getTitleDarkMode(darkModeStorage),
          value: getTitleDarkMode(darkModeStorage),
        }}
        data={[
          {title: t('auto_system'), value: 'auto_system', data: null},
          {title: t('on'), value: 'on', data: true},
          {title: t('off'), value: 'off', data: false},
        ]}
      />
      <BottomSheetPicker
        ref={listingStyleRef}
        title={t('listing')}
        onSelect={onChangeListingStyle}
        selected={{
          title: listingStyleStorage,
          value: listingStyleStorage,
        }}
        data={[
          {title: t('basic'), value: 'basic'},
          {title: t('real_estate'), value: 'real_estate'},
        ]}
      />
      <BottomSheetPicker
        ref={fontRef}
        title={t('font')}
        onSelect={onChangeFont}
        selected={{title: fontStorage, value: fontStorage}}
        data={Setting.fontSupport.map(item => {
          return {
            title: item,
            value: item,
          };
        })}
      />
      <ScrollView style={Styles.flex}>
        <View
          style={[
            Styles.flex,
            styles.container,
            {backgroundColor: theme.colors.card},
          ]}>
          <ListItem
            title={t('language')}
            trailing={
              <View style={Styles.row}>
                <Text typography="subtitle">
                  {
                    getNational(languageStorage ?? Setting.defaultLanguage)
                      .title
                  }
                </Text>
                <Icon name="chevron-right" />
              </View>
            }
            onPress={() => languageRef.current?.present()}
          />
          <Divider />
          <ListItem
            title={t('theme')}
            trailing={
              <View style={Styles.row}>
                <View
                  style={[
                    styles.themeIcon,
                    {
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                />
                <Icon name="chevron-right" />
              </View>
            }
            onPress={onChangeTheme}
          />
          <Divider />
          <ListItem
            title={t('dark_mode')}
            trailing={
              <View style={Styles.row}>
                <Text typography="subtitle">
                  {t(getTitleDarkMode(darkModeStorage))}
                </Text>
                <Icon name="chevron-right" />
              </View>
            }
            onPress={() => darkModeRef.current?.present()}
          />
          <Divider />
          <ListItem
            title={t('font')}
            trailing={
              <View style={Styles.row}>
                <Text typography="subtitle">
                  {fontStorage ?? Setting.defaultFont}
                </Text>
                <Icon name="chevron-right" />
              </View>
            }
            onPress={() => fontRef.current?.present()}
          />
          <Divider />
          <ListItem
            title={t('domain')}
            trailing={
              <View style={Styles.row}>
                <Text typography="subtitle">{domainStorage}</Text>
                <Icon name="chevron-right" />
              </View>
            }
            onPress={onDomain}
          />
          <Divider />
          <ListItem
            title={t('listing_style')}
            trailing={
              <View style={Styles.row}>
                <Text typography="subtitle">
                  {t(listingStyleStorage ?? 'basic')}
                </Text>
                <Icon name="chevron-right" />
              </View>
            }
            onPress={() => listingStyleRef.current?.present()}
          />
          <Divider />
          <ListItem
            title={t('version')}
            trailing={
              <View style={Styles.row}>
                <Text typography="subtitle">{Setting.appVersion}</Text>
                <Icon name="chevron-right" />
              </View>
            }
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
