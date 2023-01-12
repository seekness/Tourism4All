import React, {useContext} from 'react';
import {
  Application,
  Button,
  Icon,
  ScreenContainer,
  SizedBox,
  Text,
} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {ScrollView, View} from 'react-native';
import {Styles} from '@configs';

export default function Index({navigation}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);

  /**
   * on add more
   */
  const onMore = () => {
    navigation.replace('Submit');
  };

  return (
    <ScreenContainer navigation={navigation}>
      <ScrollView style={Styles.flex} contentContainerStyle={Styles.padding16}>
        <View style={styles.successContainer}>
          <View
            style={[
              styles.iconSuccess,
              {
                backgroundColor: theme.colors.primary,
              },
            ]}>
            <Icon name="check" size={32} color="white" />
          </View>
          <SizedBox height={8} />
          <Text typography="h4" weight="bold">
            {t('completed')}
          </Text>
          <SizedBox height={8} />
          <Text typography="subtitle" style={styles.messageSuccess}>
            {t('submit_success_message')}
          </Text>
        </View>
      </ScrollView>
      <View style={Styles.buttonContent}>
        <Button onPress={onMore}>{t('more')}</Button>
      </View>
    </ScreenContainer>
  );
}
