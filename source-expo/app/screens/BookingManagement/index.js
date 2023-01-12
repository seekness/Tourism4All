import React, {useContext, useEffect} from 'react';
import {Application, ScreenContainer, SizedBox, Text} from '@components';
import {Styles} from '@configs';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useWindowDimensions, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import MyBooking from './booking';
import BookingRequest from './request';
import {bookingActions} from '@actions';

export default function Index({navigation}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const {width: widthDevice} = useWindowDimensions();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(bookingActions.onResetList());
  }, [dispatch]);

  const tabRoutes = [
    {
      key: 'booking',
      title: t('my_booking'),
      navigation,
    },
    {
      key: 'request',
      title: t('request_booking'),
      navigation,
    },
  ];

  const scenes = {
    booking: MyBooking,
    request: BookingRequest,
  };

  return (
    <ScreenContainer
      navigation={navigation}
      style={{backgroundColor: theme.colors.card}}>
      <SizedBox height={4} />
      <TabView
        navigationState={{
          index: 0,
          routes: tabRoutes,
        }}
        renderTabBar={props => (
          <View style={Styles.paddingHorizontal16}>
            <TabBar
              {...props}
              activeColor={theme.colors.text}
              inactiveColor={theme.colors.textSecondary}
              pressColor={theme.colors.background}
              renderLabel={({route: routeTab, focused}) => (
                <Text
                  typography="title"
                  weight={focused ? 'medium' : 'regular'}
                  style={Styles.paddingHorizontal8}>
                  {routeTab.title}
                </Text>
              )}
              indicatorStyle={{
                backgroundColor: theme.colors.primary,
              }}
              style={[
                styles.tabView,
                {
                  backgroundColor: theme.colors.card,
                },
              ]}
            />
          </View>
        )}
        renderScene={SceneMap(scenes)}
        onIndexChange={() => {}}
        initialLayout={{width: widthDevice}}
        style={Styles.flex}
      />
    </ScreenContainer>
  );
}
