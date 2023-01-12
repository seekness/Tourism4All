import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {
  Application,
  Empty,
  ProductItem,
  ScreenContainer,
  SizedBox,
  TextInput,
} from '@components';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native';
import {Styles} from '@configs';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {searchActions} from '@actions';
import {searchSelect} from '@selectors';

export default function Index({navigation}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const search = useSelector(searchSelect);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    return () => dispatch(searchActions.onReset());
  }, [dispatch]);

  /**
   * handle searching
   * @param value
   */
  const onChangeText = value => {
    setKeyword(value);
    if (value === '') {
      dispatch(searchActions.onReset());
    } else {
      dispatch(searchActions.onSearch({keyword: value}));
    }
  };

  /**
   * on press product
   */
  const onPressProduct = item => {
    navigation.navigate('ProductDetail', {item});
  };

  /**
   * on load more
   */
  const onMore = () => {
    if (search?.pagination?.allowMore) {
      dispatch(searchActions.onLoadMore({keyword}));
    }
  };

  /**
   * render item list
   * @param item
   * @returns {JSX.Element}
   */

  const renderItem = ({item}) => {
    return (
      <ProductItem
        item={item}
        style={styles.item}
        onPress={() => onPressProduct(item)}
        type="small"
      />
    );
  };

  const data = useMemo(() => {
    if (search.data) {
      if (search.pagination?.allowMore) {
        return [...search.data, ...[{}]];
      }
      return search.data;
    } else {
      return Array.from({length: 10}, () => {
        return {};
      });
    }
  }, [search]);

  return (
    <ScreenContainer
      navigation={navigation}
      style={{backgroundColor: theme.colors.card}}>
      <SizedBox height={16} />
      <TextInput
        defaultValue={keyword}
        label={t('search')}
        placeholder={t('input_search')}
        onChangeText={onChangeText}
        size="small"
        style={Styles.paddingHorizontal16}
      />
      <SizedBox height={8} />
      <FlatList
        ListEmptyComponent={
          <Empty
            style={[Styles.flex, {marginBottom: headerHeight * 2}]}
            title={t('not_found_matching')}
            message={t('please_check_keyword_again')}
            button={{
              title: t('try_again'),
              onPress: () =>
                dispatch(searchActions.onSearch({keyword: keyword.current})),
            }}
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
