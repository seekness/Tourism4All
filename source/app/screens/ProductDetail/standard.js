import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Linking,
  Platform,
  Share,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import Animated from 'react-native-reanimated';
import {
  Application,
  BottomSheetView,
  Button,
  Chip,
  ContentLoader,
  Divider,
  DownloadFile,
  Icon,
  IconButton,
  Image,
  ListItem,
  ProductItem,
  Rating,
  ScreenContainer,
  SizedBox,
  Text,
  Toast,
  useHeaderAnimated,
  Video,
} from '@components';
import {Colors, Images, Opacity, Setting, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {listingActions, wishlistActions} from '@actions';
import styles from './styles';
import {convertIcon, enableExperimental} from '@utils';
import Navigator from '@navigator';
import {Circle} from 'react-native-progress';
import {userSelect} from '@selectors';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const heightHeader = useHeaderHeight();
  const {height: heightDevice, width: widthDevice} = useWindowDimensions();
  const {theme} = useContext(Application);
  const userSession = useSelector(userSelect);
  const bottomSheetShare = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const {onScroll, headerStyle} = useHeaderAnimated();

  const [product, setProduct] = useState();
  const [showVideo, setShowVideo] = useState(true);
  const [showCountry, setShowCountry] = useState(true);
  const [showOpenHours, setShowOpenHours] = useState(true);
  const [showSocials, setShowSocials] = useState(true);
  const [muted, setMuted] = useState(false);
  const [showAttachments, setShowAttachments] = useState(true);

  useEffect(() => {
    dispatch(
      listingActions.onDetail(route.params?.item, ({data}) => {
        setProduct(data);
      }),
    );
  }, [dispatch, route.params]);

  /**
   * on load detail
   */
  const onLoad = () => {
    dispatch(
      listingActions.onDetail(route.params?.item, ({data}) => {
        setProduct(data);
      }),
    );
  };

  /**
   * on share
   */
  const onShare = async () => {
    try {
      await Share.share({
        title: product?.title,
        message: product?.link,
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
   * on map
   */
  const onMap = () => {
    if (product) {
      navigation.navigate('PickerLocation', {item: product?.location});
    }
  };

  /**
   * on gallery
   */
  const onGallery = () => {
    if (product) {
      navigation.navigate('Gallery', {item: product});
    }
  };

  /**
   * on author profile
   */
  const onAuthor = () => {
    Navigator.navigateAuth('Profile', {item: product?.author});
  };

  /**
   * on booking
   */
  const onBooking = () => {
    Navigator.navigateAuth('Booking', {item: product});
  };

  /**
   * on review
   */
  const onReview = () => {
    Navigator.navigateAuth('Review', {item: product, onResult: onLoad});
  };

  /**
   * on favorite
   */
  const onFavorite = () => {
    const callback = () => {
      const favorite = !product?.favorite;
      setProduct({...product, favorite});
      if (favorite) {
        dispatch(
          wishlistActions.onAdd(product, ({message}) => {
            Toast.show(t(message));
          }),
        );
      } else {
        dispatch(
          wishlistActions.onDeleted(product, ({message}) => {
            Toast.show(t(message));
          }),
        );
      }
    };
    if (userSession) {
      callback();
    } else {
      navigation.navigate('SignIn', {
        onSuccess: () => {
          navigation.goBack();
          callback();
        },
      });
    }
  };

  /**
   * on press product
   */
  const onPressProduct = item => {
    navigation.push('ProductDetail', {item});
  };

  /**
   * on info action
   */
  const onInfoAction = async url => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      Toast.show(e.message);
    }
  };

  /**
   * on open hours
   */
  const onOpenHours = () => {
    enableExperimental();
    setShowOpenHours(!showOpenHours);
  };

  /**
   * on open file
   */
  const onOpenFiles = () => {
    enableExperimental();
    setShowAttachments(!showAttachments);
  };

  /**
   * on social
   */
  const onSocials = () => {
    enableExperimental();
    setShowSocials(!showSocials);
  };

  /**
   * on mute
   */
  const onMute = () => {
    setMuted(!muted);
  };

  /**
   * render banner
   * @returns {JSX.Element}
   */
  const renderBanner = () => {
    let content = <ContentLoader style={Styles.flex} />;
    if (product?.image) {
      content = (
        <View style={Styles.flex}>
          <Image
            source={{
              uri: product.image?.full,
            }}
            style={Styles.flex}
          />
          {showVideo && product.videoURL && (
            <View style={styles.backgroundVideo}>
              <Video
                source={{
                  uri: product.videoURL,
                }}
                isMuted={muted}
                muted={muted}
                shouldPlay={true}
                repeat={true}
                resizeMode="cover"
                style={Styles.flex}
              />
            </View>
          )}
          {product.videoURL && (
            <View style={styles.videoActions}>
              <TouchableOpacity
                onPress={() => setShowVideo(!showVideo)}
                style={[
                  styles.videoButton,
                  {backgroundColor: theme.colors.border + Opacity[60]},
                ]}>
                <Icon
                  name={showVideo ? 'image-outline' : 'television-play'}
                  size={18}
                />
              </TouchableOpacity>
              {showVideo && (
                <>
                  <SizedBox width={8} />
                  <TouchableOpacity
                    onPress={onMute}
                    style={[
                      styles.videoButton,
                      {backgroundColor: theme.colors.border + Opacity[60]},
                    ]}>
                    <Icon
                      name={muted ? 'volume-variant-off' : 'volume-high'}
                      size={18}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
      );
    }
    return <View style={{height: heightDevice * 0.3}}>{content}</View>;
  };

  /**
   * render content
   */
  const renderInformation = () => {
    if (product) {
      return (
        <View style={Styles.paddingHorizontal16}>
          <SizedBox height={16} />
          <View style={styles.rowContent}>
            <TouchableOpacity
              style={[Styles.flex, Styles.row]}
              onPress={onAuthor}>
              <Image
                source={{uri: product?.author?.image}}
                style={styles.userImage}
              />
              <SizedBox width={8} />
              <View>
                <Text typography="title" weight="bold">
                  {product?.author?.name}
                </Text>
                <Text typography="subtitle" type="secondary">
                  {product?.author?.email}
                </Text>
              </View>
            </TouchableOpacity>
            {product?.status && (
              <View
                style={[
                  styles.statusContent,
                  {backgroundColor: theme.colors.primary},
                ]}>
                <Text typography="subtitle" type="secondary" color="white">
                  {product?.status}
                </Text>
              </View>
            )}
          </View>
          <SizedBox height={4} />
          <View style={Styles.row}>
            <Text typography="h4" weight="bold" style={Styles.flex}>
              {product?.title}
            </Text>
            {product?.priceDisplay && (
              <View style={Styles.row}>
                <Text typography="h4" weight="bold" color="primary">
                  {product.priceDisplay}
                </Text>
                <SizedBox width={12} />
              </View>
            )}
            {product?.bookingUse && (
              <TouchableOpacity
                onPress={onBooking}
                style={[
                  styles.bookingContent,
                  {
                    backgroundColor: theme.colors.primary + Opacity[30],
                  },
                ]}>
                <Text typography="title" color="primary">
                  {t('book_now')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <SizedBox height={4} />
          <View style={Styles.row}>
            <View style={Styles.flex}>
              <Text typography="title" type="secondary">
                {product?.category?.title}
              </Text>
              <SizedBox height={4} />
              <TouchableOpacity style={Styles.row} onPress={onReview}>
                <View
                  style={[
                    styles.tagRate,
                    {backgroundColor: theme.colors.primary},
                  ]}>
                  <Text typography="caption" weight="bold" color="white">
                    {product?.rate}
                  </Text>
                </View>
                <SizedBox width={4} />
                <Rating rate={product?.rate} size={14} disabled={true} />
                <SizedBox width={4} />
                <Text typography="caption">({product?.numRate})</Text>
              </TouchableOpacity>
            </View>
            <IconButton type="secondary" onPress={onFavorite}>
              <Icon
                name={product?.favorite ? 'heart' : 'heart-outline'}
                color={theme.colors.primary}
              />
            </IconButton>
          </View>
          {product?.address && (
            <>
              {renderAddressAction()}
              <TouchableOpacity
                style={[Styles.row, Styles.paddingVertical8]}
                onPress={() => addressRef.current?.present()}>
                <View
                  style={[
                    styles.iconInfo,
                    {
                      backgroundColor: theme.colors.border,
                    },
                  ]}>
                  <Icon name="map-marker-outline" size={20} />
                </View>
                <SizedBox width={8} />
                <View style={Styles.flex}>
                  <Text typography="subtitle" type="secondary">
                    {t('address')}
                  </Text>
                  <SizedBox height={2} />
                  <Text typography="subtitle" weight="bold">
                    {product?.address}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    enableExperimental();
                    setShowCountry(!showCountry);
                  }}>
                  <Icon name={showCountry ? 'chevron-up' : 'chevron-down'} />
                </TouchableOpacity>
              </TouchableOpacity>
              {showCountry && (
                <View style={[styles.subInfoContent, Styles.paddingVertical4]}>
                  <Text typography="subtitle" type="secondary">
                    {`${product.country?.title}, ${product.city?.title}, ${product.state?.title}`}
                  </Text>
                </View>
              )}
            </>
          )}
          {product?.phone && (
            <>
              {renderPhoneAction()}
              <TouchableOpacity
                style={[Styles.row, Styles.paddingVertical8]}
                onPress={() => phoneRef.current?.present()}>
                <View
                  style={[
                    styles.iconInfo,
                    {
                      backgroundColor: theme.colors.border,
                    },
                  ]}>
                  <Icon name="phone-outline" size={20} />
                </View>
                <SizedBox width={8} />
                <View style={Styles.flex}>
                  <Text typography="subtitle" type="secondary">
                    {t('phone')}
                  </Text>
                  <SizedBox height={2} />
                  <Text typography="subtitle" weight="bold">
                    {product?.phone}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {product?.fax && (
            <TouchableOpacity
              style={[Styles.row, Styles.paddingVertical8]}
              onPress={() => onInfoAction(`tel:${product?.fax}`)}>
              <View
                style={[
                  styles.iconInfo,
                  {
                    backgroundColor: theme.colors.border,
                  },
                ]}>
                <Icon name="fax" size={20} />
              </View>
              <SizedBox width={8} />
              <View style={Styles.flex}>
                <Text typography="subtitle" type="secondary">
                  {t('fax')}
                </Text>
                <SizedBox height={2} />
                <Text typography="subtitle" weight="bold">
                  {product?.fax}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {product?.email && (
            <TouchableOpacity
              style={[Styles.row, Styles.paddingVertical8]}
              onPress={() => onInfoAction(`mailto:${product?.email}`)}>
              <View
                style={[
                  styles.iconInfo,
                  {
                    backgroundColor: theme.colors.border,
                  },
                ]}>
                <Icon name="email-outline" size={20} />
              </View>
              <SizedBox width={8} />
              <View style={Styles.flex}>
                <Text typography="subtitle" type="secondary">
                  {t('email')}
                </Text>
                <SizedBox height={2} />
                <Text typography="subtitle" weight="bold">
                  {product?.email}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {product?.website && (
            <TouchableOpacity
              style={[Styles.row, Styles.paddingVertical8]}
              onPress={() => onInfoAction(product?.website)}>
              <View
                style={[
                  styles.iconInfo,
                  {
                    backgroundColor: theme.colors.border,
                  },
                ]}>
                <Icon name="web" size={20} />
              </View>
              <SizedBox width={8} />
              <View style={Styles.flex}>
                <Text typography="subtitle" type="secondary">
                  {t('website')}
                </Text>
                <SizedBox height={2} />
                <Text typography="subtitle" weight="bold">
                  {product?.website}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {product?.openHours?.length > 0 && (
            <>
              <TouchableOpacity
                style={[Styles.row, Styles.paddingVertical8]}
                onPress={onOpenHours}>
                <View
                  style={[
                    styles.iconInfo,
                    {
                      backgroundColor: theme.colors.border,
                    },
                  ]}>
                  <Icon name="clock-outline" size={20} />
                </View>
                <SizedBox width={8} />
                <View style={Styles.flex}>
                  <Text typography="subtitle" type="secondary">
                    {t('open_time')}
                  </Text>
                </View>
                <Icon name={showOpenHours ? 'chevron-up' : 'chevron-down'} />
              </TouchableOpacity>
              {showOpenHours &&
                product?.openHours.map(item => {
                  return (
                    <View key={item.key} style={styles.subInfoContent}>
                      <View style={styles.rowHour}>
                        <Text typography="caption" type="secondary">
                          {t(item.key)}
                        </Text>
                        <Text
                          typography="subtitle"
                          weight="bold"
                          color="secondary">
                          {item.schedule
                            .map?.(i => {
                              return `${i?.start} - ${i?.end}`;
                            })
                            ?.join?.(',')}
                        </Text>
                      </View>
                      <Divider />
                    </View>
                  );
                })}
            </>
          )}
          {product?.attachments?.length > 0 && (
            <>
              <TouchableOpacity
                style={[Styles.row, Styles.paddingVertical8]}
                onPress={onOpenFiles}>
                <View
                  style={[
                    styles.iconInfo,
                    {
                      backgroundColor: theme.colors.border,
                    },
                  ]}>
                  <Icon name="paperclip" size={20} />
                </View>
                <SizedBox width={8} />
                <View style={Styles.flex}>
                  <Text typography="subtitle" type="secondary">
                    {t('attachments')}
                  </Text>
                  <SizedBox height={2} />
                  <Text typography="subtitle" weight="bold">
                    {product?.attachments?.length} {t('files')}
                  </Text>
                </View>
                <Icon name={showAttachments ? 'chevron-up' : 'chevron-down'} />
              </TouchableOpacity>
              {showAttachments &&
                product?.attachments.map(item => {
                  return (
                    <View key={item.url} style={styles.subInfoContent}>
                      <View style={styles.rowAttachment}>
                        <Text typography="caption" type="secondary">
                          {item.name}
                        </Text>
                        <DownloadFile
                          onCompleted={() => {
                            Toast.show(t('download_success'));
                          }}
                          link={item.url}>
                          {({percent, uri, download, open}) => {
                            const icon = uri ? 'check' : 'download';
                            let trailing = (
                              <Icon
                                name={icon}
                                size={16}
                                color={theme.colors.secondary}
                              />
                            );
                            if (!uri && percent > 0 && percent < 100) {
                              trailing = (
                                <Circle
                                  progress={percent / 100}
                                  color={theme.colors.secondary}
                                  thickness={2}
                                  size={16}
                                />
                              );
                            }
                            return (
                              <TouchableOpacity
                                onPress={uri ? open : download}
                                style={[Styles.row, Styles.paddingVertical8]}>
                                <Text
                                  typography="subtitle"
                                  weight="bold"
                                  color="secondary">
                                  {item.size}
                                </Text>
                                <SizedBox width={8} />
                                {trailing}
                              </TouchableOpacity>
                            );
                          }}
                        </DownloadFile>
                      </View>
                      <Divider />
                    </View>
                  );
                })}
            </>
          )}
          {Object.entries(product?.socials ?? {})?.length > 0 && (
            <>
              <TouchableOpacity
                style={[Styles.row, Styles.paddingVertical8]}
                onPress={onSocials}>
                <View
                  style={[
                    styles.iconInfo,
                    {
                      backgroundColor: theme.colors.border,
                    },
                  ]}>
                  <Icon name="link" size={20} />
                </View>
                <SizedBox width={8} />
                <View style={Styles.flex}>
                  <Text typography="subtitle" type="secondary">
                    {t('social_network')}
                  </Text>
                </View>
                <Icon name={showSocials ? 'chevron-up' : 'chevron-down'} />
              </TouchableOpacity>
              <View style={Styles.rowWrap}>
                {showSocials &&
                  Object.entries(product?.socials).map(item => {
                    return (
                      <TouchableOpacity
                        key={item[0]}
                        style={styles.socialItem}
                        onPress={() => onInfoAction(item[1])}>
                        <Image style={Styles.flex} source={Images[item[0]]} />
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </>
          )}
          <SizedBox height={8} />
          <Text typography="subtitle" style={styles.description}>
            {product?.description}
          </Text>
          <SizedBox height={16} />
          <View style={Styles.row}>
            {product?.dateEstablish && (
              <View style={Styles.flex}>
                <Text typography="caption" type="secondary">
                  {t('date_established')}
                </Text>
                <SizedBox height={4} />
                <Text typography="subtitle" weight="bold">
                  {product?.dateEstablish}
                </Text>
              </View>
            )}
            {product?.priceMin && product?.priceMax && (
              <View style={styles.flexAlignRight}>
                <Text typography="caption" type="secondary">
                  {t('price_range')}
                </Text>
                <SizedBox height={4} />
                <Text typography="subtitle" weight="bold">
                  {`${product?.priceMin} - ${product?.priceMax}`}
                </Text>
              </View>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={Styles.paddingHorizontal16}>
        <SizedBox height={16} />
        <View style={styles.rowContent}>
          <View style={[Styles.flex, Styles.row]}>
            <ContentLoader style={styles.userImage} />
            <SizedBox width={8} />
            <View>
              <SizedBox height={10} width={100}>
                <ContentLoader />
              </SizedBox>
              <SizedBox height={4} />
              <SizedBox height={10} width={120}>
                <ContentLoader />
              </SizedBox>
            </View>
          </View>
          <SizedBox height={16} width={48}>
            <ContentLoader />
          </SizedBox>
        </View>
        <SizedBox height={4} />
        <View style={Styles.row}>
          <View style={Styles.flex}>
            <SizedBox height={16} width={120}>
              <ContentLoader />
            </SizedBox>
          </View>
          <SizedBox height={24} width={64}>
            <ContentLoader />
          </SizedBox>
        </View>
        <SizedBox height={8} />
        <View style={styles.rowContent}>
          <View style={Styles.flex}>
            <SizedBox height={10} width={100}>
              <ContentLoader />
            </SizedBox>
            <SizedBox height={4} />
            <SizedBox height={24} width={100}>
              <ContentLoader />
            </SizedBox>
          </View>
          <View style={Styles.paddingVertical8}>
            <SizedBox height={24} width={24}>
              <ContentLoader />
            </SizedBox>
          </View>
        </View>
        {Array.from(Array(6).keys()).map(index => {
          return (
            <View
              key={`info${index}`}
              style={[Styles.row, Styles.paddingVertical8]}>
              <ContentLoader style={styles.iconInfo} />
              <SizedBox width={8} />
              <View style={Styles.flex}>
                <SizedBox height={10} width={100}>
                  <ContentLoader />
                </SizedBox>
                <SizedBox height={2} />
                <SizedBox height={10} width={150}>
                  <ContentLoader />
                </SizedBox>
              </View>
            </View>
          );
        })}
        {Array.from(Array(10).keys()).map(index => {
          return (
            <View key={`line${index}`} style={styles.linePlaceholder}>
              <ContentLoader />
            </View>
          );
        })}
      </View>
    );
  };

  /**
   * render features
   */
  const renderFeatures = () => {
    if (product && product?.features?.length > 0) {
      return (
        <View style={Styles.paddingHorizontal16}>
          <SizedBox height={16} />
          <Divider />
          <SizedBox height={16} />
          <Text typography="h4" weight="bold">
            {t('featured')}
          </Text>
          <SizedBox height={8} />
          <View style={Styles.rowWrap}>
            {product?.features.map?.(item => {
              return (
                <Chip
                  key={item.id}
                  leading={
                    <Icon
                      {...convertIcon(item.icon)}
                      size={14}
                      color={theme.colors.secondary}
                      type="FontAwesome5"
                    />
                  }
                  style={styles.tagItem}
                  textStyle={{color: theme.colors.secondary}}>
                  {item.title}
                </Chip>
              );
            })}
          </View>
        </View>
      );
    }
  };

  /**
   * render tags
   */
  const renderTags = () => {
    if (product && product?.tags?.length > 0) {
      return (
        <View style={Styles.paddingHorizontal16}>
          <SizedBox height={8} />
          <Divider />
          <SizedBox height={16} />
          <Text typography="h4" weight="bold">
            {t('tags')}
          </Text>
          <SizedBox height={8} />
          <View style={Styles.rowWrap}>
            {product?.tags.map?.(item => {
              return (
                <Chip
                  key={item.id}
                  style={styles.tagItem}
                  textStyle={{color: theme.colors.secondary}}>
                  {item.title}
                </Chip>
              );
            })}
          </View>
        </View>
      );
    }
  };

  /**
   * render latest
   */
  const renderLatest = () => {
    if (product && product?.latest?.length > 0) {
      return (
        <>
          <View style={Styles.paddingHorizontal16}>
            <SizedBox height={8} />
            <Divider />
            <SizedBox height={16} />
            <Text typography="h4" weight="bold">
              {t('latest')}
            </Text>
          </View>
          <SizedBox height={8} />
          <FlatList
            data={product?.latest}
            contentContainerStyle={Styles.paddingHorizontal8}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={({item}) => {
              return (
                <ProductItem
                  item={item}
                  type="grid"
                  onPress={() => onPressProduct(item)}
                  style={[
                    Styles.paddingHorizontal8,
                    {width: (widthDevice - 16) / 2},
                  ]}
                />
              );
            }}
            keyExtractor={(item, index) => `${item?.id}${index}`}
          />
        </>
      );
    }
  };

  /**
   * render related
   */
  const renderRelated = () => {
    if (product && product?.related?.length > 0) {
      return (
        <View style={Styles.paddingHorizontal16}>
          <SizedBox height={16} />
          <Divider />
          <SizedBox height={16} />
          <Text typography="h4" weight="bold">
            {t('related')}
          </Text>
          <SizedBox height={8} />
          {product?.related.map?.((item, index) => {
            return (
              <ProductItem
                key={`${item?.id}${index}`}
                item={item}
                type="small"
                onPress={() => onPressProduct(item)}
                style={styles.smallProductItem}
              />
            );
          })}
        </View>
      );
    }
  };

  /**
   * render bottom sheet phone action
   * @returns {JSX.Element}
   */
  const renderPhoneAction = () => {
    return (
      <BottomSheetView ref={phoneRef}>
        <View style={styles.bottomSheetContainer}>
          <ListItem
            title="WhatsApp"
            leading={<Image source={Images.whatsapp} />}
            onPress={() =>
              onInfoAction(
                Platform.select({
                  ios: `whatsapp://api.whatsapp.com/send?phone=${product?.phone}`,
                  android: `whatsapp://wa.me/${product?.phone}`,
                }),
              )
            }
          />
          <Divider />
          <ListItem
            title="Viber"
            leading={<Image source={Images.viber} />}
            onPress={() =>
              onInfoAction(`viber://contact?number=${product?.phone}`)
            }
          />
          <Divider />
          <ListItem
            title="Telegram"
            leading={<Image source={Images.telegram} />}
            onPress={() => onInfoAction(`tg://msg?to=${product?.phone}`)}
          />
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render bottom sheet address action
   * @returns {JSX.Element}
   */
  const renderAddressAction = () => {
    return (
      <BottomSheetView ref={addressRef}>
        <View style={styles.bottomSheetContainer}>
          <ListItem
            title="Apple Maps"
            leading={<Icon name="apple" size={22} />}
            onPress={() =>
              onInfoAction(
                `http://maps.apple.com/maps?saddr=${product?.location?.latitude},${product?.location?.longitude}`,
              )
            }
          />
          <Divider />
          <ListItem
            title="Google Maps"
            leading={<Image source={Images.googleMaps} />}
            onPress={() =>
              onInfoAction(
                `https://www.google.com/maps/search/?api=1&query=${product?.location?.latitude},${product?.location?.longitude}`,
              )
            }
          />
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render bottom sheet share picker
   */
  const renderSharePicker = () => {
    return (
      <BottomSheetView ref={bottomSheetShare}>
        <View style={styles.bottomSheetShare}>
          <View style={Styles.row}>
            <Image
              source={{uri: product?.image?.thumb}}
              style={styles.userImageShare}
            />
            <SizedBox width={8} />
            <View style={Styles.flex}>
              <Text typography="title" weight="bold">
                {product?.title}
              </Text>
              <Text typography="caption">{t('share_listing_message')}</Text>
            </View>
          </View>
          <View style={Styles.row}>
            <View style={Styles.flex}>
              <Button
                size="medium"
                type="outline"
                onPress={onShare}
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
                onPress={() => onCopy(product?.link)}
                leading={
                  <Icon name="content-copy" size={16} color={Colors.white} />
                }>
                {t('copy')}
              </Button>
            </View>
            <SizedBox width={16} />
            <QRCode
              value={`listar://qrcode?type=listing&action=view&id=${product?.id}`}
              size={160}
              logo={{uri: product?.image?.thumb}}
              logoSize={24}
              logoBackgroundColor={Colors.white}
            />
          </View>
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render action menu
   */
  const renderHeaderAction = () => {
    if (product) {
      let locationAction;
      let galleriesAction;
      if (product?.location) {
        locationAction = (
          <>
            <SizedBox width={8} />
            <IconButton
              onPress={onMap}
              size="small"
              style={{backgroundColor: theme.colors.border + Opacity[60]}}>
              <Icon name="map-legend" />
            </IconButton>
          </>
        );
      }
      if (product?.galleries?.length > 0) {
        galleriesAction = (
          <>
            <SizedBox width={8} />
            <IconButton
              onPress={onGallery}
              size="small"
              style={{backgroundColor: theme.colors.border + Opacity[60]}}>
              <Icon name="image-multiple-outline" />
            </IconButton>
          </>
        );
      }
      return (
        <View style={Styles.nativeRightButton}>
          {renderSharePicker()}
          <IconButton
            onPress={() => bottomSheetShare.current?.present()}
            size="small"
            style={{backgroundColor: theme.colors.border + Opacity[60]}}>
            <Icon name="share-outline" />
          </IconButton>
          {locationAction}
          {galleriesAction}
          <SizedBox width={4} />
        </View>
      );
    }
  };

  return (
    <ScreenContainer
      navigation={navigation}
      options={{
        headerTransparent: true,
        headerRight: renderHeaderAction,
      }}>
      <Animated.View
        style={[
          {
            backgroundColor: theme.colors.card,
            height: heightHeader,
          },
          headerStyle,
        ]}
      />

      <Animated.ScrollView
        style={[Styles.flex]}
        onScroll={onScroll}
        scrollEventThrottle={8}
        bounces={false}>
        {renderBanner()}
        {renderInformation()}
        {renderFeatures()}
        {renderTags()}
        {renderLatest()}
        {renderRelated()}
      </Animated.ScrollView>
    </ScreenContainer>
  );
}
