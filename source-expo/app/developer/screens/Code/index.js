import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Styles} from '@configs';
import {Application} from '@components';

export default function Code({route}) {
  const {theme} = useContext(Application);

  return (
    <View style={[Styles.flex, {backgroundColor: theme.colors.background}]}>
      <WebView
        style={Styles.flex}
        originWhitelist={['*']}
        startInLoadingState={true}
        source={{
          uri: route.params?.uri ?? 'google.com',
        }}
        renderLoading={() => (
          <View style={[Styles.flexCenter, StyleSheet.absoluteFillObject]}>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </View>
        )}
      />
    </View>
  );
}
