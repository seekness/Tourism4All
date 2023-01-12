import React, {useContext} from 'react';
import {View} from 'react-native';
import {Application, ScreenContainer, Image, SizedBox, Text} from '@components';
import {Images, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function About({navigation}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();

  return (
    <ScreenContainer navigation={navigation} style={[Styles.padding32]}>
      <View style={Styles.columnCenter}>
        <Image
          source={Images.logo}
          style={[
            styles.icon,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}
        />
        <SizedBox height={8} />
        <Text typography="title" weight="medium">
          {t('design_system')}
        </Text>
        <SizedBox height={16} />
        <Text typography="title" type="secondary" style={Styles.textCenter}>
          {t('design_system_desc')}
        </Text>
      </View>
    </ScreenContainer>
  );
}
