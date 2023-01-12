import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
} from '@components';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {authActions} from '@actions';
import {userSelect} from '@selectors';
import messaging from '@react-native-firebase/messaging';

export default function Profile({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(userSelect);

  const [loading, setLoading] = useState(false);

  /**
   * on Logout
   *
   */
  const onLogout = () => {
    setLoading(true);
    dispatch(authActions.onLogout());
    messaging().deleteToken();
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
      <Header title={t('profile')} />
      <ScrollView>
        <View style={styles.contain}>
          <ProfileDetail
            image={user.image}
            textFirst={user.name}
            point={user.rate}
            textSecond={user.description}
            textThird={user.email}
          />
          <TouchableOpacity
            style={[
              styles.profileItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => {
              navigation.navigate('ProfileEdit');
            }}>
            <Text body1>{t('edit_profile')}</Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{marginLeft: 5}}
              enableRTL={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            <Text body1>{t('change_password')}</Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{marginLeft: 5}}
              enableRTL={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileItem}
            onPress={() => {
              navigation.navigate('Setting');
            }}>
            <Text body1>{t('setting')}</Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{marginLeft: 5}}
              enableRTL={true}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
        <Button full loading={loading} onPress={onLogout}>
          {t('sign_out')}
        </Button>
      </View>
    </SafeAreaView>
  );
}
