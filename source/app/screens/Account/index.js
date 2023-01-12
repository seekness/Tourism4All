import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Application,
  Button,
  Divider,
  Icon,
  ListItem,
  PopupAlert,
  ScreenContainer,
  UserInfo,
} from '@components';
import {ScrollView, View} from 'react-native';
import {Setting, Styles} from '@configs';
import {authActions} from '@actions';
import Navigator from '@navigator';
import {useTranslation} from 'react-i18next';
import {userSelect} from '@selectors';
import styles from './styles';

export default function WishList({navigation}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
  const {theme} = useContext(Application);

  const [showDeveloper, setShowDeveloper] = useState(false);

  useEffect(() => {
    if (!Setting.storeReview) {
      setShowDeveloper(true);
    }
  }, []);

  const onProfile = () => {
    navigation.navigate('Profile', {item: user});
  };

  const onEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const onChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const onBookingManagement = () => {
    navigation.navigate('BookingManagement');
  };

  const onSetting = () => {
    navigation.navigate('Setting');
  };

  const onDeveloper = () => {
    navigation.navigate('Developer');
  };

  /**
   * sign out account
   */
  const onSignOut = () => {
    Navigator.showPopup({
      component: (
        <PopupAlert
          title={t('sign_out')}
          message={t('sign_out_confirm')}
          primaryButton={{
            title: t('ok'),
            onPress: () => {
              dispatch(
                authActions.onLogout(() => {
                  navigation.navigate('Home');
                }),
              );
            },
          }}
          secondaryButton={{
            title: t('close'),
          }}
        />
      ),
    });
  };

  /**
   * deactivate account
   */
  const onDeactivate = () => {
    Navigator.showPopup({
      component: (
        <PopupAlert
          title={t('deactivate_account')}
          message={t('would_you_like_deactivate')}
          primaryButton={{
            title: t('ok'),
            onPress: () => {
              dispatch(
                authActions.onDeactivate(() => {
                  navigation.navigate('Home');
                }),
              );
            },
          }}
          secondaryButton={{
            title: t('close'),
          }}
        />
      ),
    });
  };

  return (
    <ScreenContainer
      navigation={navigation}
      options={{
        headerRight: () => {
          return (
            <View style={Styles.rightButton}>
              <Button
                onPress={onSignOut}
                type="text"
                size="small"
                full={false}
                textStyle={{color: theme.colors.primary}}>
                {t('sign_out')}
              </Button>
            </View>
          );
        },
      }}>
      <ScrollView style={Styles.flex}>
        <UserInfo user={user} style={Styles.margin8} onPress={onProfile} />
        <View
          style={[
            Styles.flex,
            styles.container,
            {backgroundColor: theme.colors.card},
          ]}>
          <ListItem
            title={t('edit_profile')}
            trailing={<Icon name="chevron-right" />}
            onPress={onEditProfile}
          />
          <Divider />
          <ListItem
            title={t('change_password')}
            trailing={<Icon name="chevron-right" />}
            onPress={onChangePassword}
          />
          <Divider />
          <ListItem
            title={t('booking_management')}
            trailing={<Icon name="chevron-right" />}
            onPress={onBookingManagement}
          />
          <Divider />
          <ListItem
            title={t('setting')}
            trailing={<Icon name="chevron-right" />}
            onPress={onSetting}
          />
          <Divider />
          <ListItem
            title={t('deactivate_account')}
            trailing={<Icon name="chevron-right" />}
            onPress={onDeactivate}
          />
          {showDeveloper && (
            <>
              <Divider />
              <ListItem
                title={t('developer')}
                trailing={<Icon name="chevron-right" />}
                onPress={onDeveloper}
              />
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
