import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Booking,
  BookingDetail,
  BookingManagement,
  CategoryList,
  ChangePassword,
  EditProfile,
  Feedback,
  Filter,
  ForgotPassword,
  Gallery,
  GalleryUpload,
  Listing,
  Loading,
  Modal,
  OnBoard,
  OpenTime,
  Picker,
  PickerColor,
  PickerIcon,
  PickerLocation,
  PickerTags,
  ProductDetail,
  Profile,
  ScanQR,
  Review,
  Search,
  Setting,
  SettingTheme,
  SignIn,
  SignUp,
  Social,
  Splash,
  Submit,
  SubmitResult,
  Web,
} from '@screens';
import {Colors} from '@configs';
import {Application, Text} from '@components';
import Navigator from '@navigator';
import Main from './main';
import Developer from '@developer';

const Stack = createNativeStackNavigator();

export default function App() {
  const {t} = useTranslation();
  const {theme} = useContext(Application);

  return (
    <NavigationContainer theme={theme} ref={Navigator.navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: theme.colors.text,
          headerTitle: props => {
            return (
              <Text
                {...props}
                typography="h4"
                weight="bold"
                style={{color: props.tintColor}}
              />
            );
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: t('sign_in')}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: t('sign_up')}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{title: t('forgot_password')}}
        />
        <Stack.Screen
          name="CategoryList"
          component={CategoryList}
          options={{title: t('category')}}
        />
        <Stack.Screen
          name="Listing"
          component={Listing}
          options={{title: t('listing')}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Submit"
          component={Submit}
          options={{title: t('add_listing')}}
        />
        <Stack.Screen
          name="Booking"
          component={Booking}
          options={{title: t('booking')}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{title: t('search')}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: t('profile')}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{title: t('edit_profile')}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{title: t('change_password')}}
        />
        <Stack.Screen
          name="BookingManagement"
          component={BookingManagement}
          options={{title: t('booking_management')}}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{title: t('setting')}}
        />
        <Stack.Screen
          name="SettingTheme"
          component={SettingTheme}
          options={{title: t('theme')}}
        />
        <Stack.Screen
          name="Filter"
          component={Filter}
          options={{title: t('filter')}}
        />
        <Stack.Screen
          name="PickerLocation"
          component={PickerLocation}
          options={{title: t('location')}}
        />
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Review"
          component={Review}
          options={{title: t('review')}}
        />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{title: t('feedback')}}
        />
        <Stack.Screen
          name="BookingDetail"
          component={BookingDetail}
          options={{title: t('booking_detail')}}
        />
        <Stack.Screen
          name="PickerTags"
          component={PickerTags}
          options={{title: t('picker_tags')}}
        />
        <Stack.Screen
          name="GalleryUpload"
          component={GalleryUpload}
          options={{title: t('gallery_upload')}}
        />
        <Stack.Screen
          name="PickerColor"
          component={PickerColor}
          options={{title: t('select_color')}}
        />
        <Stack.Screen
          name="OpenTime"
          component={OpenTime}
          options={{title: t('open_time')}}
        />
        <Stack.Screen
          name="Social"
          component={Social}
          options={{title: t('social_network')}}
        />
        <Stack.Screen
          name="PickerIcon"
          component={PickerIcon}
          options={{title: t('select_icon')}}
        />
        <Stack.Screen
          name="SubmitResult"
          component={SubmitResult}
          options={{title: t('completed')}}
        />
        <Stack.Screen
          name="ScanQR"
          component={ScanQR}
          options={{title: t('scan_qr')}}
        />
        <Stack.Screen
          name="Web"
          component={Web}
          options={{title: t('web'), presentation: 'containedModal'}}
        />
        <Stack.Screen
          name="Picker"
          component={Picker}
          options={{title: t('picker'), presentation: 'containedModal'}}
        />
        <Stack.Screen
          name="OnBoard"
          component={OnBoard}
          options={{
            headerShown: false,
            presentation: 'containedModal',
          }}
        />
        <Stack.Screen
          name="Modal"
          component={Modal}
          options={{
            headerShown: false,
            presentation: 'containedTransparentModal',
            animation: 'fade',
            contentStyle: {backgroundColor: Colors.modal},
          }}
        />
        <Stack.Screen
          name="Developer"
          component={Developer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <Loading ref={Navigator.loadingRef} />
    </NavigationContainer>
  );
}
