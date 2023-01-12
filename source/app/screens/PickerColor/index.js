import React, {useContext, useRef} from 'react';
import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
  Preview,
} from 'reanimated-color-picker';
import {Application, Button, ScreenContainer, SizedBox} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import styles from './styles';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const {item, onResult} = route.params;

  const color = useSharedValue(item ?? theme.colors.primary);
  const selected = useRef(item);

  /**
   * on apply color
   */
  const onApply = () => {
    onResult?.(selected.current);
    navigation.goBack();
  };

  const onSelectColor = ({hex}) => {
    if (hex) {
      selected.current = hex;
    }
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
      <ColorPicker
        value={color.value}
        sliderThickness={25}
        thumbSize={30}
        style={styles.container}
        onComplete={onSelectColor}>
        <Panel1 style={[styles.panel, Styles.card]} />
        <View style={Styles.row}>
          <Preview
            style={[styles.previewStyle, Styles.card]}
            hideInitialColor
            hideText
          />
          <View style={Styles.flex}>
            <HueSlider
              thumbShape="triangleDown"
              style={Styles.card}
              thumbColor={theme.colors.textSecondary}
            />
            <SizedBox height={16} />
            <OpacitySlider
              thumbShape="triangleUp"
              style={Styles.card}
              thumbColor={theme.colors.textSecondary}
            />
          </View>
        </View>
      </ColorPicker>
    </ScreenContainer>
  );
}
