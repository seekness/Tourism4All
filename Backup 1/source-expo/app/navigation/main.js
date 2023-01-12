import React, {useEffect, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BaseColor, useTheme, useFont} from '@config';
import {useTranslation} from 'react-i18next';
import {Icon} from '@components';
import {userSelect} from '@selectors';
import {useSelector} from 'react-redux';
import * as Notifications from 'expo-notifications';

/* Bottom Screen */
import Home from '@screens/Home';
import Wishlist from '@screens/Wishlist';
import Profile from '@screens/Profile';

/* Stack Screen */
import ThemeSetting from '@screens/ThemeSetting';
import Setting from '@screens/Setting';
import Category from '@screens/Category';
import List from '@screens/List';
import Review from '@screens/Review';
import Feedback from '@screens/Feedback';
import Walkthrough from '@screens/Walkthrough';
import ChangePassword from '@screens/ChangePassword';
import ProfileEdit from '@screens/ProfileEdit';
import ChangeLanguage from '@screens/ChangeLanguage';
import ProductDetail from '@screens/ProductDetail';
import {NotificationModel} from '@models';

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Main({navigation}) {
  const notification = useRef();
  const action = useRef();

  useEffect(() => {
    /**
     * handle touch/foreground receive push notification
     * @param {*} data
     */
    notification.current = Notifications.addNotificationReceivedListener(
      notification => {
        console.log(notification);
      },
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    action.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log(response);
      },
    );

    return () => {
      Notifications.removeNotificationSubscription(notification.current);
      Notifications.removeNotificationSubscription(action.current);
    };
  }, [navigation]);

  /**
   * handle touch/foreground receive push notification
   * @param {*} data
   */
  const handleNotification = data => {
    const notification = new NotificationModel(data);
    console.log('handleNotification', notification);
    switch (notification.action) {
      case 'create_post_listar':
      case 'update_post_listar':
        navigation.navigate('ProductDetail', {
          id: notification.id,
        });
        break;

      default:
        break;
    }
  };

  return (
    <MainStack.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <MainStack.Screen name="ThemeSetting" component={ThemeSetting} />
      <MainStack.Screen name="Setting" component={Setting} />
      <MainStack.Screen name="Category" component={Category} />
      <MainStack.Screen name="List" component={List} />
      <MainStack.Screen name="Walkthrough" component={Walkthrough} />
      <MainStack.Screen name="Review" component={Review} />
      <MainStack.Screen name="Feedback" component={Feedback} />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
      <MainStack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <MainStack.Screen name="ProductDetail" component={ProductDetail} />
    </MainStack.Navigator>
  );
}

function BottomTabNavigator() {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const font = useFont();
  const user = useSelector(userSelect);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveTintColor: BaseColor.grayColor,
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: font,
          paddingBottom: 2,
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: t('home'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="home" size={20} solid />;
          },
        }}
      />

      <BottomTab.Screen
        name="Wishlist"
        component={user ? Wishlist : Walkthrough}
        options={{
          title: t('wishlist'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="bookmark" size={20} solid />;
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={user ? Profile : Walkthrough}
        options={{
          title: t('account'),
          tabBarIcon: ({color}) => {
            return <Icon solid color={color} name="user-circle" size={20} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
