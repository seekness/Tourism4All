import React, {useEffect} from 'react';
import {Text, Icon} from '@components';
import {TouchableOpacity, View, BackHandler} from 'react-native';
import {useTheme, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function Alert({route, navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {title, message, action, option, type} = route?.params;
  const success = type === 'success';

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => !option?.cancelable,
    );

    return () => backHandler.remove();
  }, [option.cancelable]);

  const renderButtonFirst = () => {
    const firstTitle = action?.[0]?.text ?? t('close');
    const onPress = action?.[0]?.onPress;
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onPress?.();
          if (option?.cancelable) navigation.goBack();
        }}>
        <Text body2 semibold>
          {firstTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderButtonSecond = () => {
    const secondTitle = action?.[1]?.text;
    const onPress = action?.[1]?.onPress;
    if (title && onPress) {
      return (
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderLeftColor: colors.border,
              borderLeftWidth: 0.5,
            },
          ]}
          onPress={() => {
            onPress?.();
            if (option?.cancelable) navigation.goBack();
          }}>
          <Text body2 semibold>
            {secondTitle}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.contain}>
      <View style={[styles.content, {backgroundColor: colors.card}]}>
        <View
          style={[
            styles.contentIcon,
            {backgroundColor: success ? BaseColor.greenColor : colors.primary},
          ]}>
          <Icon
            name={success ? 'check-circle' : 'exclamation-triangle'}
            size={28}
            color={BaseColor.whiteColor}
          />
        </View>
        <View style={{padding: 8, alignItems: 'center'}}>
          <Text title3 medium>
            {title}
          </Text>
          <Text body2 medium style={styles.message}>
            {message}
          </Text>
        </View>
        <View style={[styles.contentButton, {borderTopColor: colors.border}]}>
          {renderButtonFirst()}
          {renderButtonSecond()}
        </View>
      </View>
    </View>
  );
}
