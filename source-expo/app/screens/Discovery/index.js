import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  Application,
  Empty,
  Icon,
  ProductItem,
  ScreenContainer,
  SearchPicker,
  SizedBox,
  Text,
} from '@components';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {Styles} from '@configs';
import {discoveryActions} from '@actions';
import {discoverySelect} from '@selectors';
import {convertIcon} from '@utils';

export default function Discovery({navigation}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(discoverySelect);

  useEffect(() => {
    setTimeout(() => setReady(true), 1);
  }, []);

  /**
   * on refresh
   */
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(
      discoveryActions.onLoad(() => {
        setRefreshing(false);
      }),
    );
  };

  /**
   * on search
   */
  const onSearch = () => {
    navigation.navigate('Search');
  };

  /**
   * on scan qrcode
   */
  const onScan = () => {
    navigation.navigate('ScanQR');
  };

  /**
   * on press category
   */
  const onPressCategory = item => {
    navigation.navigate('Listing', {item: item.category});
  };

  /**
   * on press product
   */
  const onPressProduct = item => {
    navigation.navigate('ProductDetail', {item});
  };

  /**
   * render item
   * @param item
   * @returns {JSX.Element}
   */
  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.item}>
          <View style={Styles.row}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: item.category?.color,
                },
              ]}>
              <Icon
                {...convertIcon(item.category?.icon)}
                size={18}
                color="white"
                type="FontAwesome5"
              />
            </View>
            <View style={Styles.paddingHorizontal8}>
              <Text typography="title" weight="bold">
                {item.category?.title}
              </Text>
              <SizedBox height={4} />
              <Text typography="caption" type="secondary">
                {item.category?.count} {t('location')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={Styles.padding4}
            onPress={() => onPressCategory(item)}>
            <Text typography="caption" color="secondary">
              {t('see_more')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={Styles.padding8}
          data={item.list}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderProduct}
          keyExtractor={(i, index) => `${i?.id}${index}`}
        />
      </>
    );
  };

  /**
   * render product item
   * @param item
   * @returns {JSX.Element}
   */
  const renderProduct = ({item}) => {
    return (
      <View style={styles.productItem}>
        <ProductItem
          item={item}
          type="thumb"
          onPress={() => onPressProduct(item)}
        />
      </View>
    );
  };

  const renderContent = () => {
    if (ready) {
      return (
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
          data={data ?? []}
          renderItem={renderItem}
          ListEmptyComponent={
            <Empty
              loading={!data}
              style={Styles.flex}
              title={t('not_found_matching')}
              message={t('please_check_keyword_again')}
            />
          }
          keyExtractor={(item, index) => `${item?.id}${index}`}
          style={Styles.flex}
          contentContainerStyle={styles.listContainer}
        />
      );
    }
    return (
      <View style={Styles.flexCenter}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    );
  };

  return (
    <ScreenContainer navigation={navigation} edges={['left', 'right', 'top']}>
      <View style={styles.searchContainer}>
        <SearchPicker onSearch={onSearch} onScan={onScan} />
      </View>
      {renderContent()}
    </ScreenContainer>
  );
}
