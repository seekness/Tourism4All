import React, {useContext, useEffect, useRef, useState} from 'react';
import {Application, Icon, IconButton, ScreenContainer, SizedBox, Text, Toast,} from '@components';
import {Colors, Images, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {Linking, StyleSheet, View} from 'react-native';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import {BarCodeScanner} from "expo-barcode-scanner";

export default function Index({navigation}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const data = useRef();
  const camera = useRef();

  const [flashMode, setFlashMode] = useState(false);
  const [permission, setPermission] = useState('unavailable');

  useEffect(() => {
    const requestPermission = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync()
      if (status) {
        setPermission(status);
      }
    };
    requestPermission().then();
  }, []);

  /**
   * handle read qrcode
   * @param data
   */
  const onBarCodeRead = async ({nativeEvent}) => {
    if (data.current) {
      return;
    }
    data.current = nativeEvent?.codeStringValue;
    try {
      navigation.goBack();
      await Linking.openURL(nativeEvent?.codeStringValue);
    } catch (e) {
      Toast.show(e.message);
    }
  };

  /**
   * on help about qrcode work
   */
  const onHelp = () => {
    navigation?.push('OnBoard', {
      allowBack: true,
      slides: [
        {
          title: 'listing',
          subtitle: 'scan_to_detail_listing',
          image: Images.qrcodeListing,
        },
        {
          title: 'profile',
          subtitle: 'scan_to_detail_profile',
          image: Images.qrcodeProfile,
        },
        {
          title: 'booking',
          subtitle: 'scan_to_detail_booking',
          image: Images.qrcodeBooking,
        },
      ],
    });
  };

  /**
   * read qrcode from image
   * @returns {Promise<void>}
   */
  const onReadImage = async () => {
    const options = {
      selectionLimit: 1,
      includeBase64: true,
    };
    try {
      const result = await ImagePicker.launchImageLibraryAsync(options);

      const picked = result?.assets?.[0];
      if (picked) {
        // camera.current?.readImageQRCode(picked?.base64);
      }
    } catch (e) {
      Toast.show(e.message);
    }
  };

  return (
    <ScreenContainer
      navigation={navigation}
      options={{
        headerTransparent: true,
        headerTintColor: Colors.white,
        headerRight: () => {
          return (
            <View style={Styles.nativeRightButton}>
              <IconButton onPress={onHelp}>
                <Icon name="help-circle-outline" color="white" />
              </IconButton>
            </View>
          );
        },
      }}
      edges={['left', 'right']}
      style={{backgroundColor: theme.colors.background}}>
      {permission === 'granted' && (
        <BarCodeScanner
          style={Styles.flex}
          ref={camera}
          type="back"
          onReadCode={onBarCodeRead}
          scanBarcode={!!onBarCodeRead}
          flashMode={flashMode ? 'on' : 'off'}
          torchMode={flashMode ? 'on' : 'off'}
        />
      )}
      <View
        style={{
          ...StyleSheet.absoluteFill,
        }}>
        <View style={styles.modal} />
        <View style={{flexDirection: 'row'}}>
          <View style={styles.modal} />
          <View style={styles.qrContent}>
            <View style={[Styles.rowSpace]}>
              <View
                style={[styles.topLeft, {borderColor: theme.colors.primary}]}
              />
              <View
                style={[styles.topRight, {borderColor: theme.colors.primary}]}
              />
            </View>
            <View style={Styles.flex} />
            <View style={Styles.rowSpace}>
              <View
                style={[styles.bottomLeft, {borderColor: theme.colors.primary}]}
              />
              <View
                style={[
                  styles.bottomRight,
                  {borderColor: theme.colors.primary},
                ]}
              />
            </View>
          </View>
          <View style={styles.modal} />
        </View>
        <View style={styles.bottomCenter}>
          <View style={Styles.columnCenter}>
            <IconButton
              onPress={onReadImage}
              style={{backgroundColor: Colors.modal}}>
              <Icon name="image-outline" color="white" />
            </IconButton>
            <SizedBox height={8} />
            <Text typography="subtitle" color="white">
              {t('gallery')}
            </Text>
          </View>
          <SizedBox width={32} />
          <View style={Styles.columnCenter}>
            <IconButton
              onPress={() => setFlashMode(!flashMode)}
              style={{backgroundColor: Colors.modal}}>
              <Icon
                name={flashMode ? 'flashlight' : 'flashlight-off'}
                color="white"
              />
            </IconButton>
            <SizedBox height={8} />
            <Text typography="subtitle" color="white">
              {t('flash')}
            </Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
