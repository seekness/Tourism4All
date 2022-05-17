import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  TextInput,
  Icon,
  Text,
  ListItem,
} from '@components';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {searchSelect} from '@selectors';
import {searchActions, wishListActions} from '@actions';
import {useTranslation} from 'react-i18next';

let timeout;
let disableEndReached;

export default function SearchHistory({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const search = useSelector(searchSelect);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * on refresh list
   *
   */
  const onRefresh = () => {
    setRefreshing(true);
    loadData({s: keyword});
  };

  /**
   * Loadmore action
   */
  const onLoadMore = () => {
    if (!disableEndReached) {
      if (search?.pagination?.allowLoadMore && !loadingMore) {
        setLoadingMore(true);
        const page = search?.pagination?.page + 1;
        dispatch(
          searchActions.onSearch({s: keyword, page}, () => {
            setLoadingMore(false);
          }),
        );
      }
      disableEndReached = true;
    }
  };

  /**
   * update status wishlist
   * @param {*} item
   */
  const onUpdate = item => {
    dispatch(wishListActions.onUpdate(item));
  };

  /**
   * call when search data
   * @param {*} keyword
   */
  const onSearch = keyword => {
    setKeyword(keyword);
    if (keyword != '') {
      setLoading(true);
      if (timeout) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          loadData({s: keyword});
        }, 1000);
      } else {
        timeout = setTimeout(() => {
          loadData({s: keyword});
        }, 1000);
      }
    } else {
      setShowResult(false);
    }
  };

  /**
   * on load list
   * @param {*} params
   */
  const loadData = params => {
    dispatch(
      searchActions.onSearch(params, () => {
        setLoading(false);
        setShowResult(true);
        setRefreshing(false);
      }),
    );
  };

  /**
   * on load detail and save history
   * @param {*} item
   */
  const onDetail = item => {
    navigation.navigate('ProductDetail', {
      id: item.id,
      onLike: favorite => {
        item.favorite = favorite;
        onUpdate(item);
      },
    });
    dispatch(searchActions.onSaveHistory(item));
  };

  /**
   * on clear
   */
  const onClear = () => {
    dispatch(searchActions.onClear());
  };

  /**
   * render content
   *
   */
  const renderContent = () => {
    if (showResult) {
      return (
        <FlatList
          contentContainerStyle={{paddingHorizontal: 20}}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={search?.list ?? []}
          onEndReachedThreshold={0.5}
          onEndReached={onLoadMore}
          onMomentumScrollBegin={() => {
            disableEndReached = false;
          }}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item, index}) => (
            <ListItem
              small
              image={item.image?.full}
              title={item.title}
              subtitle={item.category?.title}
              location={item.address}
              phone={item.phone}
              rate={item.rate}
              status={item.status}
              numReviews={item.numRate}
              favorite={item.favorite}
              style={{
                marginBottom: 15,
              }}
              onPress={() => onDetail(item)}
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
      );
    }

    return (
      <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
        <View style={styles.rowTitle}>
          <Text headline>{t('search_history').toUpperCase()}</Text>
          <TouchableOpacity onPress={onClear}>
            <Text caption1 accentColor>
              {t('clear')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {search.history?.map?.((item, index) => (
            <TouchableOpacity
              style={[styles.itemHistory, {backgroundColor: colors.card}]}
              onPress={() => onDetail(item)}
              key={`search ${item.id}`}>
              <Text caption2>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
      <Header
        title={t('search')}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <TextInput
            placeholder={t('search')}
            value={keyword}
            onSubmitEditing={() => {
              onSearch(keyword);
            }}
            onChangeText={onSearch}
            icon={
              <TouchableOpacity
                onPress={() => {
                  onSearch('');
                }}
                style={styles.btnClearSearch}>
                <Icon name="times" size={18} color={BaseColor.grayColor} />
              </TouchableOpacity>
            }
          />
        </View>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}
