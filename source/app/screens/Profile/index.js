import React, {useContext, useEffect, useRef, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Application,
  BottomSheetView,
  Button,
  ContentLoader,
  Icon,
  IconButton,
  Image,
  Rating,
  ScreenContainer,
  SizedBox,
  Text,
  Toast,
} from '@components';
import {Colors, Setting, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {Share, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ListingTab from './listing';
import PendingTab from './pending';
import ReviewTab from './review';
import styles from './styles';
import api from '@api';
import {UserModel} from '@models';
import {useSelector} from 'react-redux';
import {userSelect} from '@selectors';
import QRCode from 'react-native-qrcode-svg';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const bottomQRCode = useRef();
  const {width: widthDevice} = useWindowDimensions();
  const user = useSelector(userSelect);

  const [author, setAuthor] = useState(route.params?.item);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await api.getAuthorInfo({
          user_id: route.params?.item.id,
        });
        if (response.success) {
          return UserModel.fromJson(response.data);
        }
      } catch (e) {
        console.log('ERROR', e);
      }
    };
    getAuthor().then(data => {
      if (data) {
        setAuthor(data);
      }
    });
  }, [route.params]);

  /**
   * on submit listing
   */
  const onSubmit = () => {
    navigation.navigate('Submit');
  };

  /**
   * on qrcode
   */
  const onQrcode = () => {
    bottomQRCode.current?.present();
  };

  /**
   * on share
   */
  const onShare = async item => {
    try {
      await Share.share({
        title: item.name,
        message: item.url,
        subject: Setting.name,
      });
    } catch (e) {
      Toast.show(e.message);
    }
  };

  /**
   * on copy to clipboard
   * @param link
   */
  const onCopy = link => {
    Clipboard.setString(link);
    Toast.show(t('link_already_copy_clipboard'));
  };

  /**
   * render bottom sheet share QRCode
   * @returns {JSX.Element}
   */
  const renderQRCodeShare = () => {
    return (
      <BottomSheetView ref={bottomQRCode}>
        <View style={styles.bottomSheetContainer}>
          <View style={Styles.row}>
            <Image
              source={{uri: author?.image}}
              style={styles.userImageShare}
            />
            <SizedBox width={8} />
            <View style={Styles.flex}>
              <Text typography="title" weight="bold">
                {author.name}
              </Text>
              <Text typography="caption">{t('share_profile_message')}</Text>
            </View>
          </View>
          <View style={Styles.row}>
            <View style={Styles.flex}>
              <Button
                size="medium"
                type="outline"
                onPress={() => onShare(author)}
                leading={
                  <Icon
                    name="share-outline"
                    size={16}
                    color={theme.colors.primary}
                  />
                }>
                {t('share')}
              </Button>
              <SizedBox height={16} />
              <Button
                size="medium"
                onPress={() => onCopy(author.link)}
                leading={
                  <Icon name="content-copy" size={16} color={Colors.white} />
                }>
                {t('copy')}
              </Button>
            </View>
            <SizedBox width={16} />
            <QRCode
              value={`listar://qrcode?type=profile&action=view&id=${author.id}`}
              size={160}
              logo={{uri: author?.image}}
              logoSize={24}
              logoBackgroundColor={Colors.white}
            />
          </View>
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render author info
   * @returns {JSX.Element}
   */
  const renderAuthor = () => {
    if (author) {
      return (
        <View style={Styles.row}>
          <Image style={styles.userImage} source={{uri: author?.image}} />
          <SizedBox width={8} />
          <View style={Styles.flex}>
            <Text typography="title" weight="bold">
              {author?.name}
            </Text>
            <SizedBox height={8} />
            <Rating
              rate={author?.rate}
              size={12}
              disabled={true}
              style={styles.rateContent}
            />
            <SizedBox height={4} />
            <Text typography="caption" color="secondary">
              {author?.total !== 0 && `${author?.total} Posts, `}
              {author?.comment !== 0 && `${author?.comment} Reviews`}
            </Text>
          </View>
          {user?.id === author.id && (
            <>
              <IconButton onPress={onQrcode}>
                <Icon name="qrcode-scan" />
              </IconButton>
              {renderQRCodeShare()}
            </>
          )}
        </View>
      );
    }

    return (
      <View style={Styles.row}>
        <ContentLoader style={styles.userImage} />
        <SizedBox width={8} />
        <View style={Styles.flex}>
          <SizedBox height={10} width={100}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={8} />
          <SizedBox height={16} width={100}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={4} />
          <SizedBox height={10} width={150}>
            <ContentLoader />
          </SizedBox>
        </View>
      </View>
    );
  };

  let tabRoutes = [
    {
      key: 'listing',
      title: t('listing'),
      author,
      navigation,
    },
    {
      key: 'pending',
      title: t('pending'),
      author,
      navigation,
    },
    {
      key: 'review',
      title: t('review'),
      author,
      navigation,
    },
  ];
  let scenes = {
    listing: ListingTab,
    pending: PendingTab,
    review: ReviewTab,
  };

  if (user?.id !== author.id) {
    tabRoutes = [
      {
        key: 'listing',
        title: t('listing'),
        author,
        navigation,
      },

      {
        key: 'review',
        title: t('review'),
        author,
        navigation,
      },
    ];
    scenes = {
      listing: ListingTab,
      review: ReviewTab,
    };
  }

  return (
    <ScreenContainer
      navigation={navigation}
      style={{backgroundColor: theme.colors.card}}
      options={{
        headerRight: () => {
          return (
            <View style={Styles.nativeRightButton}>
              <Button
                onPress={onSubmit}
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
      <View style={Styles.paddingHorizontal16}>
        <SizedBox height={16} />
        {renderAuthor()}
      </View>
      <SizedBox height={8} />
      <TabView
        navigationState={{
          index: 0,
          routes: tabRoutes,
        }}
        renderTabBar={props => (
          <View style={Styles.paddingHorizontal16}>
            <TabBar
              {...props}
              activeColor={theme.colors.text}
              inactiveColor={theme.colors.textSecondary}
              pressColor={theme.colors.background}
              renderLabel={({route: routeTab, focused}) => (
                <Text
                  typography="title"
                  weight={focused ? 'medium' : 'regular'}
                  style={Styles.paddingHorizontal8}>
                  {routeTab.title}
                </Text>
              )}
              indicatorStyle={{
                backgroundColor: theme.colors.primary,
              }}
              style={[
                styles.tabView,
                {
                  backgroundColor: theme.colors.card,
                },
              ]}
            />
          </View>
        )}
        renderScene={SceneMap(scenes)}
        onIndexChange={() => {}}
        initialLayout={{width: widthDevice}}
        style={Styles.flex}
      />
    </ScreenContainer>
  );
}
