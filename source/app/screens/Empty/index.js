import React, {useContext, useEffect} from 'react';
import {Application, Empty, ScreenContainer} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';

export default function Index({navigation}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);

  useEffect(() => {}, []);

  return (
    <ScreenContainer navigation={navigation}>
      <Empty
        style={Styles.flex}
        title={t('not_found_matching')}
        message={t('please_check_keyword_again')}
        button={{title: t('try_again'), onPress: () => {}}}
      />
    </ScreenContainer>
  );
}
