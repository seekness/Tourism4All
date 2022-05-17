import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import {ThemeSupport} from '@config';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import {applicationActions} from '@actions';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function ThemeSetting({navigation}) {
  const themeStorage = useSelector(state => state.application.theme);
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [themeSupport, setTheme] = useState(ThemeSupport);

  useEffect(() => {
    setTheme(
      ThemeSupport.map(item => {
        return {
          ...item,
          selected: item.theme === themeStorage,
        };
      }),
    );
  }, [themeStorage]);

  /**
   * call when select theme
   *
   * @param {*} selected
   */
  const onSelect = selected => {
    setTheme(
      themeSupport.map(item => {
        return {
          ...item,
          selected: item.theme === selected.theme,
        };
      }),
    );
  };

  /**
   * call when save theme
   *
   */
  const onChangeTheme = () => {
    const list = themeSupport.filter(item => item.selected);
    if (list.length > 0) {
      dispatch(applicationActions.changeTheme(list[0].theme));
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(list[0].light.colors.primary, true);
      }
    }
  };

  /**
   * render UI theme item
   *
   * @param {*} item
   * @returns
   */
  const renderItem = item => {
    return (
      <TouchableOpacity
        style={[
          styles.profileItem,
          {borderBottomColor: colors.border, borderBottomWidth: 1},
        ]}
        onPress={() => onSelect(item)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 16,
              height: 16,
              backgroundColor: item.light.colors.primary,
            }}
          />
          <Text body1 style={{marginHorizontal: 8}}>
            {item.theme}
          </Text>
        </View>
        {item.selected && (
          <Icon name="check" size={18} color={colors.primary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
      <Header
        title={t('theme')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        contentContainerStyle={styles.contain}
        data={themeSupport}
        keyExtractor={(item, index) => item.theme}
        renderItem={({item}) => renderItem(item)}
      />
      <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
        <Button full onPress={onChangeTheme}>
          {t('apply')}
        </Button>
      </View>
    </SafeAreaView>
  );
}
