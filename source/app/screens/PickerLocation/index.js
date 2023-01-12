import React, {useContext, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Application, Button, Icon, ScreenContainer} from '@components';
import {Styles} from '@configs';
import styles from './styles';
import {TouchableOpacity, View} from 'react-native';
import {getCurrentLocation} from '@utils';
import {LocationModel} from '@models';
import {useTranslation} from 'react-i18next';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const mapRef = useRef();
  let options = {};
  const {item, editable, onResult} = route.params;
  const defaultDelta = {latitudeDelta: 0.0922, longitudeDelta: 0.0421};
  const [location, setLocation] = useState(item);

  /**
   * on current location
   */
  const onCurrentLocation = async () => {
    const result = await getCurrentLocation();
    if (result) {
      mapRef.current?.animateToRegion({...result, ...defaultDelta}, 500);
    }
  };

  /**
   * on press map
   * @param nativeEvent
   */
  const onPressMap = ({nativeEvent}) => {
    if (editable) {
      const newLocation = new LocationModel({
        name: 'Location',
        ...nativeEvent.coordinate,
      });
      setLocation(newLocation);
    }
  };

  /**
   * on apply new location
   */
  const onApply = () => {
    onResult?.(location);
    navigation.goBack();
  };

  if (editable) {
    options = {
      headerRight: () => {
        return (
          <View style={Styles.nativeRightButton}>
            <Button
              onPress={onApply}
              type="text"
              size="small"
              full={false}
              textStyle={{color: theme.colors.primary}}>
              {t('apply')}
            </Button>
          </View>
        );
      },
    };
  }

  return (
    <ScreenContainer navigation={navigation} options={options}>
      <MapView
        ref={mapRef}
        style={Styles.flex}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onPress={onPressMap}
        initialRegion={{
          latitude: 10.8175689,
          longitude: 106.6539669,
          ...defaultDelta,
          ...location,
        }}>
        {location && <Marker coordinate={location} />}
      </MapView>
      <TouchableOpacity
        onPress={onCurrentLocation}
        style={[
          styles.locationIcon,
          Styles.card,
          {
            backgroundColor: theme.colors.card,
          },
        ]}>
        <Icon name="map-marker" color={theme.colors.primary} />
      </TouchableOpacity>
    </ScreenContainer>
  );
}
