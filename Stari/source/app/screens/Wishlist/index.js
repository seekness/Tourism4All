import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, ListItem, Text, Icon} from '@components';
import {wishlistSelect} from '@selectors';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {wishListActions} from '@actions';
import Share from 'react-native-share';
import Modal from 'react-native-modal';
import styles from './styles';

export default function Wishlist({navigation}) {
  let disableEndReached;

  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const wishlist = useSelector(wishlistSelect);
  const [modalVisible, setModalVisible] = useState(false);

  const [refreshing, setRefresh] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [actionItem, setActionItem] = useState(null);

  /**
   * Reload wishlist
   */
  const onRefresh = () => {
    setRefresh(true);
    dispatch(
      wishListActions.onLoad(null, () => {
        setRefresh(false);
      }),
    );
  };

  /**
   * Loadmore action
   */
  const onLoadMore = () => {
    if (!disableEndReached) {
      if (wishlist.pagination?.allowLoadMore && !loadingMore) {
        setLoadingMore(true);
        const page = wishlist.pagination.page + 1;
        dispatch(
          wishListActions.onLoad({page}, () => {
            setLoadingMore(false);
          }),
        );
      }
      disableEndReached = true;
    }
  };

  /**
   * Action Delete/Reset
   */
  const onDelete = id => {
    setDeleting(true);
    dispatch(
      wishListActions.onDelete(id ? {post_id: id} : null, () => {
        setDeleting(false);
      }),
    );
  };

  /**
   * update status wishlist
   * @param {*} item
   */
  const onUpdate = item => {
    dispatch(wishListActions.onUpdate(item));
  };

  /**
   * Action for share
   */
  const onShare = async item => {
    const shareOptions = {
      title: 'Share item',
      url: item.link,
    };
    try {
      Share.open(shareOptions);
    } catch (error) {}
    setModalVisible(false);
  };

  /**
   * render UI Modal action
   * @returns
   */
  const renderModal = () => {
    return (
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
          setActionItem(null);
        }}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <SafeAreaView
          style={[styles.contentFilterBottom, {backgroundColor: colors.card}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => {
              setModalVisible(false);
              setActionItem(null);
            }}>
            <Icon name="times" size={12} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onShare(actionItem);
            }}
            style={[
              styles.contentActionModalBottom,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}>
            <Icon name="share" size={18} color={colors.text} />
            <Text body2 semibold style={{marginLeft: 15}}>
              {t('share')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contentActionModalBottom]}
            onPress={() => {
              setModalVisible(false);
              onDelete(actionItem.id);
            }}>
            <Icon name="trash-alt" size={18} color={colors.text} />
            <Text body2 semibold style={{marginLeft: 15}}>
              {t('remove')}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };

  /**
   * render content wishlist
   * @returns
   */
  const renderContent = () => {
    if (wishlist.list) {
      return (
        <FlatList
          contentContainerStyle={{paddingTop: 15, flex: 1}}
          style={styles.contentList}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={wishlist.list}
          keyExtractor={(item, index) => item.id}
          onEndReachedThreshold={0.5}
          onEndReached={onLoadMore}
          onMomentumScrollBegin={() => {
            disableEndReached = false;
          }}
          renderItem={({item, index}) => (
            <ListItem
              small
              enableAction={true}
              image={item.image?.full}
              title={item.title}
              subtitle={item.category?.title}
              rate={item.rate}
              style={{marginBottom: 15}}
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  id: item.id,
                  onLike: favorite => {
                    item.favorite = favorite;
                    onUpdate(item);
                  },
                })
              }
              omPressMore={() => {
                setActionItem(item);
                setModalVisible(true);
              }}
            />
          )}
          ListEmptyComponent={
            <View style={styles.loadingContent}>
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
          }
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
      <FlatList
        contentContainerStyle={{paddingTop: 15}}
        style={styles.contentList}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        keyExtractor={(item, index) => item.toString()}
        renderItem={({item, index}) => (
          <ListItem small loading={true} style={{marginBottom: 15}} />
        )}
      />
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
      <Header
        title={t('wishlist')}
        renderRight={() => {
          if (deleting) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          }
          return <Icon name="trash-alt" size={16} color={colors.text} />;
        }}
        onPressRight={() => onDelete()}
      />
      {renderModal()}
      {renderContent()}
    </SafeAreaView>
  );
}
