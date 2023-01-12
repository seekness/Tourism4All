import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Colors, Images} from '@configs';
import SplashScreen from 'react-native-splash-screen';
import {Application, Image} from '@components';
import {applicationActions} from '@actions';
import styles from './styles';

export default function Splash({navigation}) {
  const {theme} = useContext(Application);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      applicationActions.start(() => {
        navigation.replace('Main');
      }),
    );
    SplashScreen.hide();
  }, [dispatch, navigation]);

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.primary}]}>
      <View style={styles.contentLogo}>
        <View style={styles.logo}>
          <Image
            source={Images.logo}
            resizeMode="contain"
            style={styles.container}
          />
          <ActivityIndicator
            size="large"
            color={Colors.white}
            style={styles.loading}
          />
        </View>
      </View>
    </View>
  );
}
