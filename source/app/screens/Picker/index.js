import React, {useContext, useState} from 'react';
import {
  Application,
  Button,
  Chip,
  Icon,
  IconButton,
  ScreenContainer,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import styles from './styles';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const {data, title, multiple, onResult} = route.params;
  const [selected, setSelected] = useState([...(route.params?.item ?? [])]);

  /**
   * on apply gallery
   */
  const onApply = () => {
    onResult?.(selected);
    navigation.goBack();
  };

  /**
   * on press item
   * @param item
   */
  const onPressItem = item => {
    if (multiple) {
      if (selected.some(i => i.id === item.id)) {
        const result = selected.filter(i => {
          return i.id !== item.id;
        });
        setSelected(result);
      } else {
        selected.push(item);
        setSelected([...selected]);
      }
    } else {
      setSelected([item]);
    }
  };

  /**
   * render content of picker
   * @returns {JSX.Element}
   */
  const renderContent = () => {
    return (
      <View style={styles.selectionContent}>
        {data.map?.(item => {
          return (
            <View style={Styles.padding4} key={item.id}>
              <Chip
                selected={selected.some(i => i.id === item.id)}
                onPress={() => onPressItem(item)}>
                {item.title}
              </Chip>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScreenContainer
      navigation={navigation}
      options={{
        title: title,
        headerLeft: () => {
          return (
            <View style={Styles.nativeLeftButton}>
              <IconButton
                onPress={() => {
                  navigation.goBack();
                }}
                size="small">
                <Icon name="close" type="MaterialIcons" />
              </IconButton>
            </View>
          );
        },
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
      <ScrollView style={Styles.flex}>{renderContent()}</ScrollView>
    </ScreenContainer>
  );
}
