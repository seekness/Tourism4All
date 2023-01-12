import React, {Suspense, useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Styles} from '@configs';
import {Application} from '@components';

const Navigation = React.lazy(() => import('./navigation'));

export default function AppContainer() {
  const {theme} = useContext(Application);
  return (
    <Suspense
      fallback={
        <View style={Styles.flexCenter}>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </View>
      }>
      <Navigation />
    </Suspense>
  );
}
