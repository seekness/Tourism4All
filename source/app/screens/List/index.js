import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {BaseStyle, BaseColor, useTheme} from '@config';
import Carousel from 'react-native-snap-carousel';
import {
  Header,
  SafeAreaView,
  Icon,
  ListItem,
  FilterSort,
  Text,
} from '@components';
import styles from './styles';
import * as Utils from '@utils';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {listSelect, settingSelect, userSelect} from '@selectors';
import {listActions, wishListActions} from '@actions';

export default function List({navigation, route}) {
  let disableEndReached;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const screen = useSelector(listSelect);
  const setting = useSelector(settingSelect);
  const user = useSelector(userSelect);

  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    40,
  );

  const sliderRef = useRef(null);
  const [filter, setFilter] = useState(route.params?.filter);
  const [loadingMore, setLoadingMore] = useState(false);
  const [active, setActive] = useState(0);
  const [viewportWidth] = useState(Utils.getWidthDevice());
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modeView, setModeView] = useState(setting.mode);
  const [mapView, setMapView] = useState(false);
  const [region, setRegion] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.009,
    longitudeDelta: 0.004,
  });

  useEffect(() => {
    setLoading(true);
    dispatch(
      listActions.onLoadList(route.params?.filter, null, () => {
        setLoading(false);
        setRefreshing(false);
      }),
    );
  }, [dispatch, route.params.filter]);

  /**
   * on Load data
   *
   */
  const loadData = filter => {
    dispatch(
      listActions.onLoadList(filter, null, () => {
        setLoading(false);
        setRefreshing(false);
      }),
    );
  };

  /**
   * Loadmore action
   */
  const onLoadMore = () => {
    if (!disableEndReached) {
      if (screen?.pagination?.allowLoadMore && !loadingMore) {
        setLoadingMore(true);
        const page = screen?.pagination?.page + 1;
        dispatch(
          listActions.onLoadList(filter, page, () => {
            setLoadingMore(false);
          }),
        );
      }
      disableEndReached = true;
    }
  };

  /**
   * on refresh list
   *
   */
  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  /**
   * update status wishlist
   * @param {*} item
   */
  const onUpdate = item => {
    dispatch(wishListActions.onUpdate(item));
    dispatch(listActions.onUpdate(item));
  };

  /**
   * export viewport
   * @param {*} percentage
   * @returns
   */
  const getViewPort = percentage => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  };

  /**
   * call when on change sort
   */
  const onChangeSort = sort => {
    if (sort) {
      filter.sort = sort;
      setFilter(filter);
      loadData(filter);
    }
  };

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onFilter = () => {
    navigation.navigate('Filter', {
      filter,
      onApply: filter => {
        setFilter(filter);
        loadData(filter);
      },
    });
  };

  /**
   * @description Open modal when view mode is pressed
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onChangeView = () => {
    Utils.enableExperimental();
    switch (modeView) {
      case 'block':
        setModeView('grid');
        break;
      case 'grid':
        setModeView('list');
        break;
      case 'list':
        setModeView('block');
        break;
      default:
        setModeView('block');
        break;
    }
  };

  /**
   * onChange view style
   *
   */
  const onChangeMapView = () => {
    Utils.enableExperimental();
    if (!mapView && screen?.list.length > 0) {
      setRegion({
        latitude: parseFloat(screen?.list?.[0].location.latitude) ?? 0.0,
        longitude: parseFloat(screen?.list?.[0].location.longitude) ?? 0.0,
        latitudeDelta: 0.009,
        longitudeDelta: 0.004,
      });
    }
    setMapView(!mapView);
  };

  /**
   * on Select location map view
   * @param {*} location
   * @returns
   */
  const onSelectLocation = location => {
    const list = screen?.list;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (
        element.location.latitude == location.latitude &&
        element.location.longitude == location.longitude
      ) {
        sliderRef.current.snapToItem(index);
        return;
      }
    }
  };

  /**
   * on Review action
   */
  const onProductDetail = item => {
    navigation.navigate('ProductDetail', {
      id: item.id,
      onLike: favorite => {
        item.favorite = favorite;
        onUpdate(item);
      },
    });
  };

  /**
   * on Review action
   */
  const onReview = item => {
    if (user) {
      navigation.navigate('Review', {
        id: item.id,
        reload: loadData,
      });
    } else {
      navigation.navigate({
        name: 'SignIn',
        params: {
          success: () => {
            navigation.navigate({
              id: item.id,
              reload: loadData,
            });
          },
        },
      });
    }
  };

  /**
   * @description Render loading view
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @returns
   */
  const renderLoading = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });
    switch (modeView) {
      case 'block':
        return (
          <View style={{flex: 1}}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              key={'block'}
              keyExtractor={(item, index) => `block${index}`}
              renderItem={({item, index}) => <ListItem block loading={true} />}
            />
            <Animated.View
              style={[
                styles.navbar,
                {transform: [{translateY: navbarTranslate}]},
              ]}>
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      case 'grid':
        return (
          <View style={{flex: 1}}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              columnWrapperStyle={{
                paddingLeft: 5,
                paddingRight: 20,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              key={'gird'}
              keyExtractor={(item, index) => `gird ${index}`}
              renderItem={({item, index}) => (
                <ListItem
                  grid
                  loading={true}
                  style={{
                    marginLeft: 15,
                    marginBottom: 15,
                  }}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{translateY: navbarTranslate}],
                },
              ]}>
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );

      case 'list':
        return (
          <View style={{flex: 1}}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 20,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              key={'list'}
              keyExtractor={(item, index) => `list ${index}`}
              renderItem={({item, index}) => (
                <ListItem
                  list
                  loading={true}
                  style={{
                    marginBottom: 15,
                  }}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{translateY: navbarTranslate}],
                },
              ]}>
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      default:
        return (
          <View style={{flex: 1}}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              key={'block'}
              keyExtractor={(item, index) => `block${index}`}
              renderItem={({item, index}) => <ListItem block loading={true} />}
            />
            <Animated.View
              style={[
                styles.navbar,
                {transform: [{translateY: navbarTranslate}]},
              ]}>
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
    }
  };

  /**
   * @description Render container view
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @returns
   */
  const renderList = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });
    switch (modeView) {
      case 'block':
        return (
          <View style={{flex: 1}}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              onEndReachedThreshold={0.5}
              onEndReached={onLoadMore}
              onMomentumScrollBegin={() => {
                disableEndReached = false;
              }}
              data={screen?.list ?? []}
              key={'block'}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({item, index}) => (
                <ListItem
                  block
                  image={item.image?.full}
                  title={item.title}
                  subtitle={t(item.category?.title)}
                  location={item.address}
                  phone={item.phone}
                  rate={item.rate}
                  status={item.status}
                  numReviews={item.numRate}
                  favorite={item.favorite}
                  onPress={() => onProductDetail(item)}
                  onPressTag={() => onReview(item)}
                />
              )}
              ListFooterComponent={
                loadingMore ? (
                  <SafeAreaView style={styles.loadMoreContent}>
                    <ActivityIndicator size="small" color={colors.primary} />
                  </SafeAreaView>
                ) : null
              }
            />
            <Animated.View
              style={[
                styles.navbar,
                {transform: [{translateY: navbarTranslate}]},
              ]}>
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      case 'grid':
        return (
          <View style={{flex: 1}}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              columnWrapperStyle={{
                paddingLeft: 5,
                paddingRight: 20,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={screen?.list ?? []}
              key={'gird'}
              onEndReachedThreshold={0.5}
              onEndReached={onLoadMore}
              onMomentumScrollBegin={() => {
                disableEndReached = false;
              }}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({item, index}) => (
                <ListItem
                  grid
                  image={item.image?.full}
                  title={item.title}
                  subtitle={t(item.category?.title)}
                  location={item.address}
                  phone={item.phone}
                  rate={item.rate}
                  status={item.status}
                  numReviews={item.numRate}
                  favorite={item.favorite}
                  style={{
                    marginLeft: 15,
                    marginBottom: 15,
                  }}
                  onPress={() => onProductDetail(item)}
                  onPressTag={() => onReview(item)}
                />
              )}
              ListFooterComponent={
                loadingMore ? (
                  <SafeAreaView style={styles.loadMoreContent}>
                    <ActivityIndicator size="small" color={colors.primary} />
                  </SafeAreaView>
                ) : null
              }
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{translateY: navbarTranslate}],
                },
              ]}>
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );

      case 'list':
        return (
          <View style={{flex: 1}}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 20,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              data={screen?.list ?? []}
              key={'list'}
              onEndReachedThreshold={0.5}
              onEndReached={onLoadMore}
              onMomentumScrollBegin={() => {
                disableEndReached = false;
              }}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({item, index}) => (
                <ListItem
                  list
                  image={item.image?.full}
                  title={item.title}
                  subtitle={t(item.category?.title)}
                  location={item.address}
                  phone={item.phone}
                  rate={item.rate}
                  status={item.status}
                  numReviews={item.numRate}
                  favorite={item.favorite}
                  style={{
                    marginBottom: 15,
                  }}
                  onPress={() => onProductDetail(item)}
                  onPressTag={() => onReview(item)}
                />
              )}
              ListFooterComponent={
                loadingMore ? (
                  <SafeAreaView style={styles.loadMoreContent}>
                    <ActivityIndicator size="small" color={colors.primary} />
                  </SafeAreaView>
                ) : null
              }
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{translateY: navbarTranslate}],
                },
              ]}>
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      default:
        return (
          <View style={{flex: 1}}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              data={screen?.list ?? []}
              key={'block'}
              onEndReachedThreshold={0.5}
              onEndReached={onLoadMore}
              onMomentumScrollBegin={() => {
                disableEndReached = false;
              }}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({item, index}) => (
                <ListItem
                  block
                  image={item.image?.full}
                  title={item.title}
                  subtitle={item.subtitle}
                  location={item.location}
                  phone={item.phone}
                  rate={item.rate}
                  status={item.status}
                  numReviews={item.numReviews}
                  favorite={item.favorite}
                  onPress={() => onProductDetail(item)}
                  onPressTag={() => onReview(item)}
                />
              )}
              ListFooterComponent={
                loadingMore ? (
                  <SafeAreaView style={styles.loadMoreContent}>
                    <ActivityIndicator size="small" color={colors.primary} />
                  </SafeAreaView>
                ) : null
              }
            />
            <Animated.View
              style={[
                styles.navbar,
                {transform: [{translateY: navbarTranslate}]},
              ]}>
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
    }
  };

  /**
   * render MapView
   * @returns
   */
  const renderMapView = () => {
    return (
      <View style={{flex: 1}}>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
          {screen?.list?.map?.((item, index) => {
            return (
              <Marker
                onPress={e => onSelectLocation(e.nativeEvent.coordinate)}
                key={item.id}
                coordinate={{
                  latitude: parseFloat(item.location?.latitude) ?? 0.0,
                  longitude: parseFloat(item.location.longitude) ?? 0.0,
                }}>
                <View
                  style={[
                    styles.iconLocation,
                    {
                      backgroundColor:
                        index == active ? colors.primary : BaseColor.whiteColor,
                      borderColor: colors.primary,
                    },
                  ]}>
                  <Icon
                    name="star"
                    size={16}
                    color={
                      index == active ? BaseColor.whiteColor : colors.primary
                    }
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>
        <View style={{position: 'absolute', bottom: 0}}>
          <Carousel
            ref={sliderRef}
            data={screen?.list ?? []}
            renderItem={({item, index}) => (
              <ListItem
                small
                image={item.image?.full}
                title={item.title}
                subtitle={t(item.category?.title)}
                rate={item.rate}
                favorite={item.favorite}
                style={{
                  margin: 3,
                  padding: 10,
                  backgroundColor: colors.card,
                  borderRadius: 8,
                  shadowColor: colors.border,
                  shadowOffset: {
                    width: 3,
                    height: 2,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={() => onProductDetail(item)}
                onPressTag={() => onReview(item)}
              />
            )}
            sliderWidth={viewportWidth}
            itemWidth={getViewPort(75) + getViewPort(2) * 2}
            firstItem={1}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={0.85}
            contentContainerCustomStyle={{paddingVertical: 10}}
            loop={true}
            loopClonesPerSide={2}
            autoplay={false}
            onSnapToItem={index => {
              setActive(index);
              setRegion({
                latitudeDelta: 0.009,
                longitudeDelta: 0.004,
                latitude:
                  parseFloat(screen?.list?.[index]?.location?.latitude) ?? 0.0,
                longitude:
                  parseFloat(screen?.list[index]?.location?.longitude) ?? 0.0,
              });
            }}
          />
        </View>
      </View>
    );
  };

  /**
   * render Content view
   */
  const renderContent = () => {
    if (loading) {
      return renderLoading();
    }
    if (screen?.list?.length == 0) {
      return (
        <View style={styles.centerView}>
          <View style={{alignItems: 'center'}}>
            <Icon
              name="frown-open"
              size={18}
              color={colors.text}
              style={{marginBottom: 4}}
            />
            <Text>{t('data_not_found')}</Text>
          </View>
        </View>
      );
    }
    if (mapView) return renderMapView();
    return renderList();
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
      <Header
        title={
          t(filter?.category?.[0]?.title) || filter?.area?.title || t('place')
        }
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return (
            <Icon
              name={mapView ? 'align-right' : 'map'}
              size={20}
              color={colors.primary}
            />
          );
        }}
        renderRightSecond={() => {
          return <Icon name="search" size={20} color={colors.primary} />;
        }}
        onPressRightSecond={() => {
          navigation.navigate('SearchHistory');
        }}
        onPressRight={() => {
          onChangeMapView();
        }}
      />
      {renderContent()}
    </SafeAreaView>
  );
}
