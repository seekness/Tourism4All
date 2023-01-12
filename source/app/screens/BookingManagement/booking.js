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
  ContentLoader,
  Divider,
  Empty,
  Icon,
  ListItem,
  SizedBox,
  Text,
  TextInput,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {bookingActions} from '@actions';
import {bookingSelect} from '@selectors';
import styles from './styles';

export default memo(MyBooking);

function MyBooking(props) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const booking = useSelector(bookingSelect);
  const dispatch = useDispatch();
  const debounceRef = useRef();
  const sortRef = useRef();
  const statusRef = useRef();

  const [refreshing, setRefreshing] = useState(false);
  const [sort, setSort] = useState();
  const [status, setStatus] = useState();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(bookingActions.onLoad({}));
  }, [dispatch]);

  /**
   * on load list booking
   * @param refresh
   * @param loading
   */
  const onLoad = ({refresh, params}) => {
    if (refresh) {
      setRefreshing(true);
    }
    dispatch(
      bookingActions.onLoad({sort, status, keyword, ...params}, () => {
        setRefreshing(false);
      }),
    );
  };

  /**
   * on search
   */
  const onSearch = value => {
    setKeyword(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onLoad({params: {keyword: value}});
    }, 500);
  };

  /**
   * on change sort
   * @param item
   */
  const onChangeSort = item => {
    sortRef.current?.dismiss();
    setSort(item);
    onLoad({params: {sort: item, loading: true}});
  };

  /**
   * on change status
   * @param item
   */
  const onChangeStatus = item => {
    statusRef.current?.dismiss();
    setStatus(item);
    onLoad({params: {status: item, loading: true}});
  };

  /**
   * on load more
   */
  const onMore = () => {
    if (booking?.pagination?.allowMore) {
      dispatch(bookingActions.onLoadMore({sort, status, keyword}));
    }
  };

  /**
   * on detail booking
   * @param item
   */
  const onDetail = item => {
    props.route?.navigation.navigate('BookingDetail', {item});
  };

  /**
   * render bottom sheet select sort
   * @returns {JSX.Element}
   */
  const renderSelectSort = () => {
    return (
      <BottomSheetView ref={sortRef}>
        <View style={styles.bottomSheetContainer}>
          {booking.sortOptions?.map?.((item, index) => {
            let trailing;
            if (item.field === sort?.field && item.value === sort?.value) {
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
                {index < booking.sortOptions?.length - 1 && <Divider />}
              </View>
            );
          })}
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render bottom sheet select sort
   * @returns {JSX.Element}
   */
  const renderSelectStatus = () => {
    return (
      <BottomSheetView ref={statusRef}>
        <View style={styles.bottomSheetContainer}>
          {booking.statusOptions?.map?.((item, index) => {
            let trailing;
            if (item.field === status?.field && item.value === status?.value) {
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
                  onPress={() => onChangeStatus(item)}
                />
                {index < booking.statusOptions?.length - 1 && <Divider />}
              </View>
            );
          })}
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render item list
   * @param item
   * @returns {JSX.Element}
   */
  const renderItem = ({item}) => {
    if (item?.id) {
      return (
        <TouchableOpacity
          style={[Styles.paddingVertical8, Styles.row]}
          onPress={() => onDetail(item)}>
          <View style={Styles.flex}>
            <Text typography="title" weight="bold">
              {item.title}
            </Text>
            <SizedBox height={4} />
            <Text typography="caption" type="secondary">
              {item.createdBy}
            </Text>
          </View>
          <View style={styles.alignRight}>
            <Text typography="subtitle" type="secondary">
              {item.date?.format?.('YYYY-MM-DD hh:mm')}
            </Text>
            <SizedBox height={4} />
            <Text
              typography="subtitle"
              weight="bold"
              style={{color: item.statusColor}}>
              {t(item.status)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={[Styles.paddingVertical8, Styles.row]}>
        <View style={Styles.flex}>
          <SizedBox height={10} width={100}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={4} />
          <SizedBox height={10} width={150}>
            <ContentLoader />
          </SizedBox>
        </View>
        <View style={styles.alignRight}>
          <SizedBox height={10} width={100}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={4} />
          <SizedBox height={10} width={100}>
            <ContentLoader />
          </SizedBox>
        </View>
      </View>
    );
  };

  /**
   * render data for list
   * @type {unknown}
   */
  const data = useMemo(() => {
    if (booking.data) {
      if (booking.pagination.allowMore) {
        return [...booking.data, ...[{}]];
      }
      return booking.data;
    } else {
      return Array.from({length: 10}, () => {
        return {};
      });
    }
  }, [booking]);

  return (
    <View style={Styles.flex}>
      {renderSelectStatus()}
      {renderSelectSort()}
      <SizedBox height={16} />
      <View style={Styles.paddingHorizontal16}>
        <TextInput
          defaultValue={keyword}
          label={t('search')}
          placeholder={t('input_search')}
          onChangeText={onSearch}
          size="small"
        />
        <SizedBox height={12} />
        <View style={Styles.row}>
          <TouchableOpacity
            onPress={statusRef.current?.present}
            style={[
              styles.filterItem,
              {
                borderColor: theme.colors.border,
              },
            ]}>
            <Icon name={'filter-outline'} size={14} />
            <SizedBox width={4} />
            <Text typography="subtitle">{t('status')}</Text>
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onLoad({refresh: true})}
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
          />
        }
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item, index) => `${item?.id}${index}`}
        onEndReachedThreshold={0.1}
        onEndReached={onMore}
        style={Styles.flex}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
