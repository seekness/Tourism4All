import React, {useContext, useState} from 'react';
import {
  Application,
  Button,
  Icon,
  InputPicker,
  ListItem,
  ScreenContainer,
  SizedBox,
  Text,
} from '@components';
import {Setting, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {FlatList, Switch, View} from 'react-native';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {applicationActions} from '@actions';
import {enableExperimental} from '@utils';

export default function Index({navigation}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const dispatch = useDispatch();

  const [custom, setCustom] = useState(false);
  const [selected, setSelected] = useState(
    Setting.themeSupport.find(
      item => item[theme.mode].colors.primary === theme.colors.primary,
    ),
  );
  const [primary, setPrimary] = useState(theme.colors.primary);
  const [secondary, setSecondary] = useState(theme.colors.secondary);

  /**
   * on apply theme setting
   */
  const onApply = () => {
    if (custom && primary && secondary) {
      const value = {
        id: 'custom',
        light: {
          mode: 'light',
          colors: {
            ...Setting.defaultTheme.light.colors,
            primary,
            secondary,
          },
        },
        dark: {
          mode: 'dark',
          colors: {
            ...Setting.defaultTheme.dark.colors,
            primary,
            secondary,
          },
        },
      };
      dispatch(applicationActions.changeTheme(value));
    } else if (selected) {
      dispatch(applicationActions.changeTheme(selected));
    }
  };

  /**
   * on enable custom
   * @param value
   */
  const onCustom = value => {
    enableExperimental();
    setCustom(value);
  };

  /**
   * on change color
   * @param color
   * @param setColor
   */
  const onChangeColor = (color, setColor) => {
    navigation.navigate('PickerColor', {
      item: color,
      onResult: setColor,
    });
  };

  /**
   * render content
   * @returns {JSX.Element}
   */
  const renderContent = () => {
    if (custom) {
      return (
        <View
          style={[
            Styles.row,
            Styles.padding16,
            {backgroundColor: theme.colors.card},
          ]}>
          <InputPicker
            label={t('primary_color')}
            value={primary}
            leading={
              <View style={[styles.itemColor, {backgroundColor: primary}]} />
            }
            placeholder={t('select_color')}
            style={Styles.flex}
            onPress={() => onChangeColor(primary, setPrimary)}
          />
          <SizedBox width={16} />
          <InputPicker
            label={t('secondary_color')}
            value={secondary}
            leading={
              <View style={[styles.itemColor, {backgroundColor: secondary}]} />
            }
            placeholder={t('select_color')}
            style={Styles.flex}
            onPress={() => onChangeColor(secondary, setSecondary)}
          />
        </View>
      );
    }

    return (
      <FlatList
        data={Setting.themeSupport}
        renderItem={({item}) => {
          let trailing;
          if (
            item[theme.mode].colors.primary ===
            selected?.[theme.mode]?.colors?.primary
          ) {
            trailing = (
              <Icon
                name="check"
                style={Styles.paddingHorizontal16}
                color={theme.colors.primary}
              />
            );
          }
          return (
            <ListItem
              title={t(item?.id)}
              leading={
                <View
                  style={[
                    styles.itemColor,
                    {backgroundColor: item[theme.mode].colors.primary},
                  ]}
                />
              }
              trailing={trailing}
              onPress={() => setSelected(item)}
            />
          );
        }}
        keyExtractor={(item, index) => `${item?.id}${index}`}
        style={Styles.flex}
        contentContainerStyle={[
          styles.listContainer,
          {backgroundColor: theme.colors.card},
        ]}
      />
    );
  };

  return (
    <ScreenContainer
      navigation={navigation}
      options={{
        headerRight: () => {
          return (
            <View style={Styles.nativeRightButton}>
              <Button
                onPress={onApply}
                type="text"
                size="small"
                full={false}
                textStyle={{color: theme.colors.primary}}>
                {t('apply')}
              </Button>
            </View>
          );
        },
      }}>
      <View
        style={[styles.customContain, {backgroundColor: theme.colors.card}]}>
        <View style={Styles.row}>
          <Icon name="palette-outline" color={theme.colors.primary} />
          <SizedBox width={8} />
          <Text typography="title" weight="bold">
            {t('customize_color')}
          </Text>
        </View>
        <Switch
          onValueChange={onCustom}
          value={custom}
          trackColor={{false: theme.colors.border, true: theme.colors.primary}}
        />
      </View>
      {renderContent()}
    </ScreenContainer>
  );
}
