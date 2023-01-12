import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import {
  Application,
  BottomSheetView,
  Divider,
  Empty,
  Icon,
  ListItem,
  ReviewItem,
  SizedBox,
  Text,
  TextInput,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {reviewActions} from '@actions';
import {settingSelect} from '@selectors';
import styles from './styles';
import {FilterModel} from '@models';

export default memo(Review);

function Review(props) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const setting = useSelector(settingSelect);
  const dispatch = useDispatch();
  const debounceRef = useRef();
  const sortRef = useRef();
  const keywordRef = useRef('');
  const author = props.route?.author;

  const [review, setReview] = useState();
  const [sort, setSort] = useState(FilterModel.fromSettings(setting).sort);

  useEffect(() => {
    dispatch(
      reviewActions.onLoadAuthor({author}, ({success, data, pagination}) => {
        if (success) {
          setReview({data, pagination});
        }
      }),
    );
  }, [author, dispatch]);

  /**
   * on load list
   * @param loading
   */
  const onLoad = loading => {
    dispatch(
      reviewActions.onLoadAuthor(
        {
          author,
          keyword: keywordRef.current,
          sort,
          loading,
        },
        ({success, data, pagination}) => {
          if (success) {
            setReview({data, pagination});
          }
        },
      ),
    );
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
   * on change sort
   * @param item
   */
  const onChangeSort = item => {
    sortRef.current?.dismiss();
    setSort(item);
    onLoad(true);
  };

  /**
   * on load more
   */
  const onMore = () => {
    if (review?.pagination?.allowMore) {
      dispatch(
        reviewActions.onLoadAuthor(
          {
            page: review?.pagination?.page + 1,
            author,
            keyword: keywordRef.current,
            sort,
          },
          ({success, data, pagination}) => {
            if (success) {
              setReview({data: [...review?.data, ...data], pagination});
            }
          },
        ),
      );
    }
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

  return (
    <View style={Styles.flex}>
      <SizedBox height={16} />
      {renderSelectSort()}
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
        style={Styles.flex}
        data={review?.data ?? []}
        ListEmptyComponent={
          <Empty
            style={Styles.flex}
            title={t('not_found_matching')}
            message={t('please_try_again')}
          />
        }
        contentContainerStyle={[
          Styles.paddingHorizontal16,
          Styles.paddingVertical8,
        ]}
        renderItem={({item}) => {
          return (
            <ReviewItem
              item={item}
              style={[styles.reviewItem, {borderColor: theme.colors.border}]}
              showPostName={true}
            />
          );
        }}
        keyExtractor={(item, index) => `${item?.id}${index}`}
        onEndReachedThreshold={0.1}
        onEndReached={onMore}
      />
    </View>
  );
}
