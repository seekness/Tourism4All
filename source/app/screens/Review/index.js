import React, {useContext, useEffect, useState} from 'react';
import {
  Application,
  Button,
  Empty,
  RateSummary,
  ReviewItem,
  ScreenContainer,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {reviewActions} from '@actions';
import {reviewSelect} from '@selectors';
import styles from './styles';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const dispatch = useDispatch();
  const review = useSelector(reviewSelect);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(reviewActions.onLoad(route.params?.item));
    return () => dispatch(reviewActions.onReset(route.params?.item));
  }, [dispatch, route.params]);

  /**
   * on refresh review list
   */
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(
      reviewActions.onLoad(route.params?.item, () => {
        setRefreshing(false);
      }),
    );
  };

  /**
   * on feedback
   */
  const onFeedback = () => {
    navigation.navigate('Feedback', route.params);
  };

  /**
   * render item review
   * @param item
   * @returns {JSX.Element}
   */
  const renderItem = ({item}) => {
    return <ReviewItem item={item} style={styles.reviewItem} />;
  };

  /**
   * render content
   */
  const renderContent = () => {
    if (review.data) {
      return (
        <>
          <View style={[Styles.paddingHorizontal16, Styles.paddingVertical8]}>
            <RateSummary data={review?.summary} />
          </View>
          <FlatList
            style={Styles.flex}
            data={review.data ?? []}
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
              />
            }
            contentContainerStyle={[
              Styles.paddingHorizontal16,
              Styles.paddingVertical8,
            ]}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item?.id}${index}`}
          />
        </>
      );
    }

    return (
      <View style={Styles.flexCenter}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  };

  return (
    <ScreenContainer
      navigation={navigation}
      options={{
        headerRight: () => {
          return (
            <View style={Styles.nativeRightButton}>
              <Button
                onPress={onFeedback}
                type="text"
                size="small"
                full={false}
                textStyle={{color: theme.colors.primary}}>
                {t('add')}
              </Button>
            </View>
          );
        },
      }}>
      {renderContent()}
    </ScreenContainer>
  );
}
