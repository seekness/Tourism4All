import React, {useContext} from 'react';
import {Application, Icon, IconButton, ScreenContainer} from '@components';
import {Styles} from '@configs';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

export default function Index({navigation, route}) {
  const {theme} = useContext(Application);
  const web = route.params?.item;

  /**
   * handle state change
   * @param data
   */
  const onNavigationStateChange = ({url}) => {
    if (!url) {
      return;
    }
    for (let i = 0; i < web?.handleUrl?.length; i++) {
      const item = web?.handleUrl[i];
      if (url.includes(item)) {
        web?.callback?.(item);
        if (web?.dismissOnHandle) {
          navigation.goBack();
        }
      }
    }
  };

  return (
    <ScreenContainer
      navigation={navigation}
      options={{
        title: web?.title,
        headerLeft: () => {
          return (
            <View style={Styles.nativeLeftButton}>
              <IconButton
                onPress={() => {
                  web?.callback?.();
                  navigation.goBack();
                }}
                size="small">
                <Icon name="close" type="MaterialIcons" />
              </IconButton>
            </View>
          );
        },
      }}>
      <WebView
        style={Styles.flex}
        originWhitelist={['*']}
        startInLoadingState={true}
        cacheEnabled={web?.cacheEnabled}
        source={{
          uri: web?.url,
        }}
        onNavigationStateChange={onNavigationStateChange}
        renderLoading={() => (
          <View style={[Styles.flexCenter, StyleSheet.absoluteFillObject]}>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </View>
        )}
      />
    </ScreenContainer>
  );
}
