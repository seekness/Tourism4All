import React, {
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Application,
  BottomSheetView,
  Divider,
  Empty,
  Icon,
  IconButton,
  ListItem,
  ProductItem,
  SizedBox,
  Text,
  TextInput,
  Toast,
} from '@components';
import {Setting, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {FlatList, Share, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {listingActions} from '@actions';
import {settingSelect, userSelect} from '@selectors';
import styles from './styles';
import {FilterModel} from '@models';

export default memo(Listing);

function Listing(props) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const bottomFullRef = useRef();
  const bottomLimitRef = useRef();
  const selectedRef = useRef();
  const user = useSelector(userSelect);
  const setting = useSelector(settingSelect);
  const dispatch = useDispatch();
  const debounceRef = useRef();
  const sortRef = useRef();
  const filter = useRef(FilterModel.fromSettings(setting)).current;
  const keywordRef = useRef('');
  const author = props.route?.author;

  const [listing, setListing] = useState();
  const [sort, setSort] = useState(filter.sort);

  useEffect(() => {
    dispatch(
      listingActions.onLoadAuthor(
        {author, filter},
        ({success, data, pagination}) => {
          if (success) {
            setListing({data, pagination});
          }
        },
      ),
    );
  }, [author, dispatch, filter]);

  /**
   * on load list
   * @param loading
   */
  const onLoad = loading => {
    dispatch(
      listingActions.onLoadAuthor(
        {
          filter,
          author,
          keyword: keywordRef.current,
          loading,
        },
        ({success, data, pagination}) => {
          if (success) {
            setListing({data, pagination});
          }
        },
      ),
    );
  };

  /**
   * on press product
   */
  const onPressProduct = item => {
    props.route?.navigation?.navigate('ProductDetail', {item});
  };

  /**
   * on edit listing
   */
  const onEdit = item => {
    bottomFullRef.current?.dismiss();
    bottomLimitRef.current?.dismiss();
    props.route?.navigation?.navigate('Submit', {item});
  };

  /**
   * on booking
   */
  const onBooking = item => {
    bottomFullRef.current?.dismiss();
    bottomLimitRef.current?.dismiss();
    props.route?.navigation?.navigate('Booking', {item});
  };

  /**
   * on delete wishlist
   */
  const onDelete = item => {
    bottomFullRef.current?.dismiss();
    bottomLimitRef.current?.dismiss();
    dispatch(
      listingActions.onDelete(item, ({success, message}) => {
        if (success) {
          onLoad(true);
        }
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
   * on filter
   */
  const onFilter = () => {
    props.route?.navigation?.navigate('Filter', {
      filter,
      onApply: () => onLoad(true),
    });
  };

  /**
   * on search
   */
  const onSearch = value => {
    keywordRef.current = value;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onLoad();
    }, 500);
  };

  /**
   * on load more
   */
  const onMore = () => {
    if (listing?.pagination?.allowMore) {
      dispatch(
        listingActions.onLoadAuthor(
          {
            page: listing?.pagination?.page + 1,
            filter,
            author,
            keyword: keywordRef.current,
          },
          ({success, data, pagination}) => {
            if (success) {
              setListing({
                data: [...listing?.data, ...data],
                pagination,
              });
            }
          },
        ),
      );
    }
  };

  /**
   * on change sort
   * @param item
   */
  const onChangeSort = item => {
    filter.update({sort: item});
    sortRef.current?.dismiss();
    setSort(item);
    onLoad(true);
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
          type="small"
          onPress={() => onPressProduct(item)}
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
   * render bottom sheet select full action
   * @returns {JSX.Element}
   */
  const renderFullAction = () => {
    return (
      <BottomSheetView ref={bottomFullRef}>
        <View style={styles.bottomSheetContainer}>
          <ListItem
            title={t('booking')}
            onPress={() => onBooking(selectedRef.current)}
            leading={<Icon name="bookmark-outline" />}
          />
          <Divider />
          <ListItem
            title={t('share')}
            onPress={() => onShare(selectedRef.current)}
            leading={<Icon name="share-outline" />}
          />
          {user.id === author.id && (
            <>
              <Divider />
              <ListItem
                title={t('edit')}
                onPress={() => onEdit(selectedRef.current)}
                leading={<Icon name="playlist-edit" />}
              />
              <Divider />
              <ListItem
                title={t('delete')}
                onPress={() => onDelete(selectedRef.current)}
                leading={<Icon name="delete-outline" />}
              />
            </>
          )}
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render bottom sheet select full action
   * @returns {JSX.Element}
   */
  const renderLimitAction = () => {
    return (
      <BottomSheetView ref={bottomLimitRef}>
        <View style={styles.bottomSheetContainer}>
          <ListItem
            title={t('share')}
            onPress={() => onShare(selectedRef.current)}
            leading={<Icon name="share-outline" />}
          />
          {user.id === author.id && (
            <>
              <Divider />
              <ListItem
                title={t('edit')}
                onPress={() => onEdit(selectedRef.current)}
                leading={<Icon name="playlist-edit" />}
              />
              <Divider />
              <ListItem
                title={t('delete')}
                onPress={() => onDelete(selectedRef.current)}
                leading={<Icon name="delete-outline" />}
              />
            </>
          )}
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render bottom sheet select sort
   * @returns {JSX.Element}
   */
  const renderSelectSort = () => {
    return (
      <BottomSheetView ref={sortRef}>
        <View style={styles.bottomSheetContainer}>
          {setting.sort.map?.((item, index) => {
            let trailing;
            if (item.field === sort.field && item.value === sort.value) {
              trailing = (
                <Icon
                  name="check"
                  style={Styles.paddingHorizontal16}
                  color={theme.colors.primary}
                />
              );
            }
            return (
              <View key={`${item?.field}-${item?.value}`}>
                <ListItem
                  title={t(item?.title)}
                  trailing={trailing}
                  onPress={() => onChangeSort(item)}
                />
                {index < setting.sort.length - 1 && <Divider />}
              </View>
            );
          })}
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render data for list
   * @type {unknown}
   */
  const data = useMemo(() => {
    if (listing?.data) {
      if (listing.pagination.allowMore) {
        return [...listing.data, ...[{}]];
      }
      return listing.data;
    } else {
      return Array.from({length: 10}, () => {
        return {};
      });
    }
  }, [listing]);

  return (
    <View style={Styles.flex}>
      {renderFullAction()}
      {renderLimitAction()}
      {renderSelectSort()}
      <SizedBox height={16} />
      <View style={Styles.paddingHorizontal16}>
        <TextInput
          defaultValue={keywordRef.current}
          label={t('search')}
          placeholder={t('input_search')}
          onChangeText={onSearch}
          size="small"
        />
        <SizedBox height={12} />
        <View style={Styles.row}>
          <TouchableOpacity
            onPress={onFilter}
            style={[
              styles.filterItem,
              {
                borderColor: theme.colors.border,
              },
            ]}>
            <Icon name={'filter-outline'} size={14} />
            <SizedBox width={4} />
            <Text typography="subtitle">{t('filter')}</Text>
          </TouchableOpacity>
          <SizedBox width={12} />
          <TouchableOpacity
            onPress={sortRef.current?.present}
            style={[
              styles.filterItem,
              {
                borderColor: theme.colors.border,
              },
            ]}>
            <Icon name={'sort-variant'} size={14} />
            <SizedBox width={4} />
            <Text typography="subtitle">{t('sort')}</Text>
          </TouchableOpacity>
        </View>
        <SizedBox height={8} />
      </View>
      <FlatList
        ListEmptyComponent={
          <Empty
            style={Styles.flex}
            title={t('not_found_matching')}
            message={t('please_try_again')}
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
    </View>
  );
}
