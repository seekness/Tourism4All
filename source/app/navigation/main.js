import React, {useContext, useEffect, useRef} from 'react';
import {Linking, Pressable, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';
import {useTranslation} from 'react-i18next';
import {Account, Discovery, Empty, Home, WishList} from '@screens';
import {Application, getFontFamily, Icon, Text} from '@components';
import {Styles} from '@configs';
import Navigator from '@navigator';
import {useSelector} from 'react-redux';
import {settingSelect} from '@selectors';
import {DeeplinkModel, NotificationModel} from '@models';

const Tab = createBottomTabNavigator();

export default function Main() {
  const settings = useSelector(settingSelect);
  const {theme, font} = useContext(Application);
  const {t} = useTranslation();
  const debounceDeepLink = useRef();

  useEffect(() => {
    const linkingSubscription = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL()
      .then(handleDeepLink)
      .catch(error => {});
    messaging().onNotificationOpenedApp(handleNotification);
    messaging().getInitialNotification().then(handleNotification);
    return () => {
      linkingSubscription.remove();
    };
  }, []);

  /**
   * handle deeplink
   * @param data
   */
  const handleDeepLink = data => {
    if (data) {
      clearTimeout(debounceDeepLink.current);
      debounceDeepLink.current = setTimeout(() => {
        const deeplink = DeeplinkModel.fromString(data?.url ?? data);
        if (deeplink && deeplink.target) {
          if (deeplink.authentication) {
            Navigator.navigateAuth(deeplink.target, {item: deeplink.item});
          } else {
            Navigator.navigate(deeplink.target, {item: deeplink.item});
          }
        }
      }, 250);
    }
  };

  /**
   * on process notification
   */
  const handleNotification = item => {
    const notification = NotificationModel.fromJson(item?.data);
    if (notification && notification.target) {
      if (notification.authentication) {
        Navigator.navigateAuth(notification.target, {item: notification.item});
      } else {
        Navigator.navigate(notification.target, {item: notification.item});
      }
    }
  };

  /**
   * on navigate
   * @param name
   */
  const onAuthNavigate = name => {
    Navigator.navigateAuth(name);
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        headerTitle: props => {
          return <Text {...props} typography="h4" weight="bold" />;
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: getFontFamily({fontFamily: font}),
        },
        tabBarItemStyle: Styles.padding4,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: t('home'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="home-outline" />;
          },
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={Discovery}
        options={{
          title: t('discovery'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="map-marker-radius-outline" />;
          },
        }}
      />
      {settings?.enableSubmit && (
        <Tab.Screen
          name="Empty"
          component={Empty}
          options={{
            tabBarButton: props => (
              <SubmitButton
                {...props}
                onPress={() => onAuthNavigate('Submit')}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="WishList"
        component={WishList}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: t('wishlist'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="bookmark-outline" />;
          },
          tabBarButton: props => (
            <Pressable {...props} onPress={() => onAuthNavigate('WishList')} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: t('account'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="account-outline" />;
          },
          tabBarButton: props => (
            <Pressable {...props} onPress={() => onAuthNavigate('Account')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const SubmitButton = props => {
  const {theme} = useContext(Application);
  return (
    <Pressable
      {...props}
      style={[styles.button, {backgroundColor: theme.colors.primary}]}>
      <Icon name="plus" color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    top: -28,
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
});
