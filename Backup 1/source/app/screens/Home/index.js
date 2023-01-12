import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  Loader,
  Progressive,
  PlaceholderMedia,
} from 'rn-placeholder';
import {Image, Text, Icon, Card, SafeAreaView, ListItem} from '@components';
import {BaseStyle, BaseColor, useTheme} from '@config';
import * as Utils from '@utils';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {useSelector, useDispatch} from 'react-redux';
import {homeSelect, settingSelect} from '@selectors';
import {wishListActions} from '@actions';
import {useTranslation} from 'react-i18next';
import {FilterModel} from '@models';

const deltaY = new Animated.Value(0);
export default function Home({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const setting = useSelector(settingSelect);
  const home = useSelector(homeSelect);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(180);
  const marginTopBanner = heightImageBanner - heightHeader + 10;

  /**
   * update status wishlist
   * @param {*} item
   */
  const onUpdate = item => {
    dispatch(wishListActions.onUpdate(item));
  };

  /**
   * render banner
   */
  const renderBanner = () => {
    if (home.sliders?.length > 0) {
      return (
        <Swiper
          dotStyle={{
            backgroundColor: colors.text,
          }}
          activeDotColor={colors.primary}
          paginationStyle={styles.contentPage}
          removeClippedSubviews={false}
          autoplay={true}
          autoplayTimeout={2}>
          {home.sliders.map((item, index) => {
            return <Image key={item} source={{uri: item}} style={{flex: 1}} />;
          })}
        </Swiper>
      );
    }

    return (
      <Placeholder Animation={Loader}>
        <PlaceholderLine style={{height: '98%'}} />
      </Placeholder>
    );
  };

  /**
   * render Category list
   *
   * @returns
   */
  const renderCategory = () => {
    let categories = home.categories;
    let enableMore = categories?.length > 7;
    if (enableMore) {
      categories = home.categories.slice(0, 7);
    }

    if (categories?.length > 0) {
      return (
        <View style={styles.serviceContent}>
          {categories.map((item, index) => {
            return (
              <TouchableOpacity
                key={`category${item.id}`}
                style={[
                  styles.serviceItem,
                  {width: (Utils.getWidthDevice() - 40) * 0.25},
                ]}
                onPress={() => {
                  const filter = new FilterModel();
                  filter.category = [item];
                  filter.perPage = setting.perPage;
                  navigation.navigate('List', {filter});
                }}>
                <View
                  style={[
                    styles.serviceCircleIcon,
                    {backgroundColor: item.color},
                  ]}>
                  <Icon
                    name={Utils.iconConvert(item.icon)}
                    size={20}
                    color={BaseColor.whiteColor}
                    solid
                  />
                </View>
                <Text footnote numberOfLines={1}>
                  {t(item.title)}
                </Text>
              </TouchableOpacity>
            );
          })}
          {enableMore && (
            <TouchableOpacity
              style={[
                styles.serviceItem,
                {width: (Utils.getWidthDevice() - 40) * 0.25},
              ]}
              onPress={() => navigation.navigate('Category')}>
              <View
                style={[
                  styles.serviceCircleIcon,
                  {backgroundColor: BaseColor.kashmir},
                ]}>
                <Icon
                  name="ellipsis-h"
                  size={20}
                  color={BaseColor.whiteColor}
                  solid
                />
              </View>
              <Text footnote numberOfLines={1}>
                {t('more')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return (
      <View style={styles.serviceContent}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
          return (
            <View
              style={{
                width: (Utils.getWidthDevice() - 40) * 0.25,
                marginBottom: 8,
              }}
              key={`category${item}`}>
              <Placeholder Animation={Progressive}>
                <View style={{alignItems: 'center'}}>
                  <PlaceholderMedia style={styles.serviceCircleIcon} />
                  <PlaceholderLine
                    style={{width: '50%', height: 8, marginTop: 2}}
                  />
                </View>
              </Placeholder>
            </View>
          );
        })}
      </View>
    );
  };

  /**
   * render Popular list
   * @returns
   */
  const renderPopular = () => {
    if (home.locations?.length > 0) {
      return (
        <FlatList
          contentContainerStyle={{paddingLeft: 5, paddingRight: 15}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={home.locations}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item, index}) => {
            return (
              <Card
                style={[styles.popularItem, {marginLeft: 15}]}
                image={item.image?.full}
                onPress={() => {
                  const filter = new FilterModel();
                  filter.area = item;
                  filter.perPage = setting.perPage;
                  navigation.navigate('List', {filter});
                }}>
                <Text headline whiteColor semibold>
                  {item.title}
                </Text>
              </Card>
            );
          }}
        />
      );
    }

    return (
      <FlatList
        contentContainerStyle={{paddingLeft: 5, paddingRight: 15}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item, index) => item.toString()}
        renderItem={({item, index}) => {
          return (
            <View style={[styles.popularItem, {marginLeft: 15}]}>
              <Placeholder Animation={Progressive}>
                <PlaceholderMedia
                  style={{width: '100%', height: '100%', borderRadius: 8}}
                />
              </Placeholder>
            </View>
          );
        }}
      />
    );
  };

  /**
   * render List recent
   * @returns
   */
  const renderRecent = () => {
    if (home.recents?.length > 0) {
      return home.recents.map((item, index) => {
        return (
          <ListItem
            small
            key={`recent${item.id}`}
            image={item.image?.full}
            title={item.title}
            subtitle={t(item.category?.title)}
            rate={item.rate}
            style={{marginBottom: 15}}
            onPress={() => {
              navigation.navigate('ProductDetail', {
                id: item.id,
                onLike: favorite => {
                  item.favorite = favorite;
                  onUpdate(item);
                },
              });
            }}
          />
        );
      });
    }

    return [1, 2, 3].map((item, index) => {
      return (
        <ListItem
          small
          loading={true}
          key={`recent${item}`}
          style={{marginBottom: 15}}
        />
      );
    });
  };

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.imageBackground,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(110),
                Utils.scaleWithPixel(110),
              ],
              outputRange: [heightImageBanner, heightHeader, 0],
            }),
          },
        ]}>
        {renderBanner()}
      </Animated.View>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: deltaY},
                },
              },
            ],
            {useNativeDriver: false},
          )}
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          scrollEventThrottle={8}>
          <View
            style={[
              styles.searchForm,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
                shadowColor: colors.border,
              },
              {marginTop: marginTopBanner},
            ]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchHistory')}>
              <View
                style={[BaseStyle.textInput, {backgroundColor: colors.card}]}>
                <Text body1 grayColor style={{flex: 1}}>
                  {t('search_location')}
                </Text>
                <View style={{paddingVertical: 8}}>
                  <View
                    style={[styles.lineForm, {backgroundColor: colors.border}]}
                  />
                </View>
                <Icon
                  name="location-arrow"
                  size={18}
                  color={colors.primaryLight}
                  solid
                />
              </View>
            </TouchableOpacity>
          </View>
          {renderCategory()}
          <View style={styles.contentPopular}>
            <Text title3 semibold>
              {t('popular_location')}
            </Text>
            <Text body2 grayColor>
              {t('popular_lologan')}
            </Text>
          </View>
          {renderPopular()}
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 15,
            }}>
            <Text title3 semibold>
              {t('recent_location')}
            </Text>
            <Text body2 grayColor style={{marginBottom: 15}}>
              {t('recent_sologan')}
            </Text>
            {renderRecent()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
