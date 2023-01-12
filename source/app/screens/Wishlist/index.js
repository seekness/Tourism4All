import React, {useContext, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Application,
  BottomSheetView,
  Divider,
  Empty,
  Icon,
  IconButton,
  ListItem,
  ProductItem,
  ScreenContainer,
  SizedBox,
  Toast,
} from '@components';
import {FlatList, RefreshControl, Share, View} from 'react-native';
import {wishlistActions} from '@actions';
import {wishlistSelect} from '@selectors';
import {Setting, Styles} from '@configs';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import Navigator from '@navigator';

export default function WishList({navigation}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const bottomFullRef = useRef();
  const bottomLimitRef = useRef();
  const selectedRef = useRef();

  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector(wishlistSelect);

  /**
   * on refresh
   */
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(
      wishlistActions.onLoad(() => {
        setRefreshing(false);
      }),
    );
  };

  /**
   * on press product
   */
  const onPressProduct = item => {
    navigation.navigate('ProductDetail', {item});
  };

  /**
   * on clear wishlist
   */
  const onClear = () => {
    dispatch(
      wishlistActions.onClear(({message}) => {
        Toast.show(t(message));
      }),
    );
  };

  /**
   * on action
   * @param item
   */
  const onAction = item => {
    if (item.bookingUse) {
      bottomFullRef.current?.present();
    } else {
      bottomLimitRef.current?.present();
    }
    selectedRef.current = item;
  };

  /**
   * on booking item
   */
  const onBooking = item => {
    bottomFullRef.current?.dismiss();
    bottomLimitRef.current?.dismiss();
    Navigator.navigateAuth('Booking', {item});
  };

  /**
   * on delete wishlist
   */
  const onDelete = item => {
    bottomFullRef.current?.dismiss();
    bottomLimitRef.current?.dismiss();
    dispatch(
      wishlistActions.onDeleted(item, ({message}) => {
        Toast.show(message);
      }),
    );
  };

  /**
   * on share
   */
  const onShare = async item => {
    bottomFullRef.current?.dismiss();
    bottomLimitRef.current?.dismiss();
    try {
      await Share.share({
        title: item.title,
        message: `Check out my item ${item.link}`,
        subject: Setting.name,
      });
    } catch (e) {
      Toast.show(e.message);
    }
  };

  /**
   * on load more
   */
  const onMore = () => {
    if (wishlist?.pagination?.allowMore) {
      dispatch(wishlistActions.onLoadMore(() => {}));
    }
  };

  /**
   * render item list
   * @param item
   * @returns {JSX.Element}
   */
  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <ProductItem
          item={item}
          onPress={() => onPressProduct(item)}
          type="small"
        />
        <SizedBox width={4} />
        {item?.id && (
          <IconButton onPress={() => onAction(item)}>
            <Icon name="dots-vertical" />
          </IconButton>
        )}
      </View>
    );
  };

  /**
   * render bottom sheet select full option
   * @returns {JSX.Element}
   */
  const renderFullOptions = () => {
    return (
      <BottomSheetView ref={bottomFullRef}>
        <View style={styles.bottomSheetContainer}>
          <ListItem
            title={t('booking')}
            leading={<Icon name="bookmark-outline" />}
            onPress={() => onBooking(selectedRef.current)}
          />
          <Divider />
          <ListItem
            title={t('share')}
            leading={<Icon name="share-outline" />}
            onPress={() => onShare(selectedRef.current)}
          />
          <Divider />
          <ListItem
            title={t('delete')}
            leading={<Icon name="delete-outline" />}
            onPress={() => onDelete(selectedRef.current)}
          />
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render bottom sheet select limit option
   * @returns {JSX.Element}
   */
  const renderLimitOptions = () => {
    return (
      <BottomSheetView ref={bottomLimitRef}>
        <View style={styles.bottomSheetContainer}>
          <ListItem
            title={t('share')}
            leading={<Icon name="share-outline" />}
            onPress={() => onShare(selectedRef.current)}
          />
          <Divider />
          <ListItem
            title={t('delete')}
            leading={<Icon name="delete-outline" />}
            onPress={() => onDelete(selectedRef.current)}
          />
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render data for list
   * @type {unknown}
   */
  const data = useMemo(() => {
    if (wishlist.data) {
      if (wishlist.pagination.allowMore) {
        return [...wishlist.data, ...[{}]];
      }
      return wishlist.data;
    } else {
      return Array.from({length: 10}, () => {
        return {};
      });
    }
  }, [wishlist]);

  return (
    <ScreenContainer
      edges={['left', 'right']}
      navigation={navigation}
      options={{
        headerRight: () => {
          return (
            <View style={Styles.rightButton}>
              <IconButton onPress={onClear} size="small">
                <Icon name="delete-empty-outline" />
              </IconButton>
            </View>
          );
        },
      }}>
      {renderFullOptions()}
      {renderLimitOptions()}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.text}
            title={t('pull_to_reload')}
            titleColor={theme.colors.text}
            colors={[theme.colors.primary]}
            progressBackgroundColor={theme.colors.card}
          />
        }
        ListEmptyComponent={
          <Empty
            style={Styles.flex}
            title={t('not_found_matching')}
            message={t('please_try_again')}
            button={{title: t('try_again'), onPress: onRefresh}}
          />
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item?.id}${index}`}
        onEndReachedThreshold={0.1}
        onEndReached={onMore}
        style={Styles.flex}
        contentContainerStyle={styles.listContainer}
      />
    </ScreenContainer>
  );
}
