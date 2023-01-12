import React, {useContext} from 'react';
import {Pressable, View} from 'react-native';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {
  Application,
  ContentLoader,
  Icon,
  Image,
  Rating,
  SizedBox,
  Text,
} from '@components';
import styles from './styles';
import {Colors, Styles} from '@configs';

const Index = props => {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const {style, item, onPress, type} = props;

  /**
   * render small style
   * @returns {JSX.Element}
   */
  const renderSmall = () => {
    if (item?.id) {
      return (
        <View style={Styles.row}>
          <Image
            style={styles.smallImage}
            source={{uri: item.image?.full}}
            resizeMode="cover"
          />
          <SizedBox width={8} />
          <View style={Styles.flex}>
            <Text typography="title" weight="bold">
              {item.title}
            </Text>
            <Text typography="subtitle" type="secondary">
              {item.category?.title}
            </Text>
            <SizedBox height={4} />
            <View style={Styles.row}>
              <View
                style={[
                  styles.tagRate,
                  {backgroundColor: theme.colors.primary},
                ]}>
                <Text typography="caption" weight="bold" color="white">
                  {item.rate}
                </Text>
              </View>
              <SizedBox width={4} />
              <Rating rate={item?.rate} size={12} disabled={true} />
            </View>
            {item.priceDisplay && (
              <>
                <SizedBox height={4} />
                <Text typography="title" weight="bold" color="primary">
                  {item.priceDisplay}
                </Text>
              </>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={Styles.row}>
        <ContentLoader style={styles.smallImage} />
        <SizedBox width={8} />
        <View style={styles.smallContent}>
          <SizedBox height={10} width={100}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={8} />
          <SizedBox height={16} width={120}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={8} />
          <SizedBox height={10} width={150}>
            <ContentLoader />
          </SizedBox>
        </View>
      </View>
    );
  };

  /**
   * render grid style
   * @returns {JSX.Element}
   */
  const renderGrid = () => {
    if (item?.id) {
      return (
        <View style={styles.gridContainer}>
          <View style={styles.gridImage}>
            <Image
              style={Styles.flex}
              source={{uri: item.image?.full}}
              resizeMode="cover"
            />
            {item.status && (
              <View
                style={[
                  styles.gridStatus,
                  {backgroundColor: theme.colors.primary},
                ]}>
                <Text typography="caption" weight="bold" color="white">
                  {item.status}
                </Text>
              </View>
            )}
            <View style={styles.gridFavorite}>
              <Icon
                name={item.favorite ? 'heart' : 'heart-outline'}
                color="white"
              />
            </View>
          </View>
          <SizedBox height={8} />
          <Text typography="subtitle" type="secondary">
            {item.category?.title}
          </Text>
          <SizedBox height={4} />
          <Text typography="title" weight="bold">
            {item.title}
          </Text>
          <SizedBox height={4} />
          <View style={Styles.rowSpace}>
            <View style={Styles.row}>
              <View
                style={[
                  styles.tagRate,
                  {backgroundColor: theme.colors.primary},
                ]}>
                <Text typography="caption" weight="bold" color="white">
                  {item.rate}
                </Text>
              </View>
              <SizedBox width={4} />
              <Rating rate={item?.rate} size={12} disabled={true} />
            </View>
            {item.priceDisplay && (
              <Text typography="h4" weight="bold" color="primary">
                {item.priceDisplay}
              </Text>
            )}
          </View>
          <SizedBox height={8} />
          <View style={Styles.row}>
            <Icon
              name="map-marker-outline"
              color={theme.colors.primary}
              size={14}
            />
            <SizedBox width={4} />
            <Text typography="caption" type="secondary">
              {item.address}
            </Text>
          </View>
          <SizedBox height={4} />
          <View style={Styles.row}>
            <Icon name="phone-outline" color={theme.colors.primary} size={14} />
            <SizedBox width={4} />
            <Text typography="caption" type="secondary">
              {item.phone}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.gridContainer}>
        <ContentLoader style={styles.gridImage} />
        <SizedBox height={8} />
        <SizedBox height={10} width={100}>
          <ContentLoader />
        </SizedBox>
        <SizedBox height={8} />
        <SizedBox height={10} width={100}>
          <ContentLoader />
        </SizedBox>
        <SizedBox height={8} />
        <SizedBox height={16} width={100}>
          <ContentLoader />
        </SizedBox>
        <SizedBox height={8} />
        <SizedBox height={10} width={100}>
          <ContentLoader />
        </SizedBox>
        <SizedBox height={4} />
        <SizedBox height={10} width={120}>
          <ContentLoader />
        </SizedBox>
      </View>
    );
  };

  /**
   * render list style
   * @returns {JSX.Element}
   */
  const renderList = () => {
    if (item?.id) {
      return (
        <View style={Styles.row}>
          <Image
            style={styles.listImage}
            source={{uri: item.image?.full}}
            resizeMode="cover"
          />
          <View style={styles.listContent}>
            <Text typography="subtitle" type="secondary">
              {item.category?.title}
            </Text>
            <SizedBox height={4} />
            <Text typography="title" weight="bold">
              {item.title}
            </Text>
            <SizedBox height={4} />
            <View style={Styles.row}>
              <View
                style={[
                  styles.tagRate,
                  {backgroundColor: theme.colors.primary},
                ]}>
                <Text typography="caption" weight="bold" color="white">
                  {item.rate}
                </Text>
              </View>
              <SizedBox width={4} />
              <Rating rate={item?.rate} size={12} disabled={true} />
            </View>
            <SizedBox height={8} />
            <View style={Styles.row}>
              <Icon
                name="map-marker-outline"
                color={theme.colors.primary}
                size={14}
              />
              <SizedBox width={4} />
              <Text typography="caption" type="secondary">
                {item.address}
              </Text>
            </View>
            <SizedBox height={4} />
            <View style={Styles.row}>
              <Icon
                name="phone-outline"
                color={theme.colors.primary}
                size={14}
              />
              <SizedBox width={4} />
              <Text typography="caption" type="secondary">
                {item.phone}
              </Text>
            </View>
            {item.priceDisplay && (
              <>
                <SizedBox height={8} />
                <Text typography="h4" weight="bold" color="primary">
                  {item.priceDisplay}
                </Text>
              </>
            )}
          </View>
          {item.status && (
            <View
              style={[
                styles.listStatus,
                {backgroundColor: theme.colors.primary},
              ]}>
              <Text typography="caption" weight="bold" color="white">
                {item.status}
              </Text>
            </View>
          )}
          <View style={styles.listFavorite}>
            <Icon
              name={item.favorite ? 'heart' : 'heart-outline'}
              color={theme.colors.primary}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={Styles.row}>
        <ContentLoader style={styles.listImage} />
        <View style={styles.listContent}>
          <SizedBox height={10} width={100}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={8} />
          <SizedBox height={10} width={120}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={8} />
          <SizedBox height={24} width={100}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={8} />
          <SizedBox height={10} width={100}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={8} />
          <SizedBox height={10} width={100}>
            <ContentLoader />
          </SizedBox>
        </View>
        <View style={styles.listFavorite}>
          <SizedBox height={24} width={24}>
            <ContentLoader />
          </SizedBox>
        </View>
      </View>
    );
  };

  /**
   * render block style
   */
  const renderBlock = () => {
    if (item?.id) {
      return (
        <View style={styles.blockContainer}>
          <View style={styles.blockImage}>
            <Image
              style={Styles.flex}
              source={{uri: item.image?.full}}
              resizeMode="cover"
            />
            <View style={styles.blockRate}>
              <View style={Styles.row}>
                <View
                  style={[
                    styles.tagRate,
                    {backgroundColor: theme.colors.primary},
                  ]}>
                  <Text typography="caption" weight="bold" color="white">
                    {item.rate}
                  </Text>
                </View>
                <SizedBox width={4} />
                <Rating rate={item?.rate} size={12} disabled={true} />
              </View>
              <SizedBox height={4} />
              <Text typography="caption" weight="bold" color="white">
                {item.numRate} {t('feedback')}
              </Text>
            </View>
          </View>
          <SizedBox height={8} />
          <View style={styles.blockContent}>
            <View style={styles.rowPrice}>
              <View style={Styles.flex}>
                <Text typography="subtitle" type="secondary">
                  {item.category?.title}
                </Text>
                <SizedBox height={4} />
                <Text typography="title" weight="bold">
                  {item.title}
                </Text>
              </View>
              {item.priceDisplay && (
                <Text typography="h4" weight="bold" color="primary">
                  {item.priceDisplay}
                </Text>
              )}
            </View>
            <SizedBox height={8} />
            <View style={Styles.row}>
              <Icon
                name="map-marker-outline"
                color={theme.colors.primary}
                size={14}
              />
              <SizedBox width={4} />
              <Text typography="caption" type="secondary">
                {item.address}
              </Text>
            </View>
            <SizedBox height={4} />
            <View style={Styles.row}>
              <Icon
                name="phone-outline"
                color={theme.colors.primary}
                size={14}
              />
              <SizedBox width={4} />
              <Text typography="caption" type="secondary">
                {item.phone}
              </Text>
            </View>
          </View>
          {item.status && (
            <View
              style={[
                styles.blockStatus,
                {backgroundColor: theme.colors.primary},
              ]}>
              <Text typography="caption" weight="bold" color="white">
                {item.status}
              </Text>
            </View>
          )}
          <View style={styles.blockFavorite}>
            <Icon
              name={item.favorite ? 'heart' : 'heart-outline'}
              color="white"
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.blockContainer}>
        <ContentLoader style={styles.blockImage} />
        <SizedBox height={8} />
        <View style={styles.blockContent}>
          <SizedBox height={10} width={100}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={8} />
          <SizedBox height={10} width={120}>
            <ContentLoader />
          </SizedBox>
          <SizedBox height={8} />
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
   * render thumb style
   * @returns {JSX.Element}
   */
  const renderThumb = () => {
    if (item?.id) {
      return (
        <>
          <Image
            style={[Styles.flex, styles.thumbImage]}
            source={{uri: item.image?.full}}
            resizeMode="cover"
          />
          <View style={styles.thumbTitle}>
            <Text
              typography="subtitle"
              weight="bold"
              color="white"
              numberOfLines={2}
              style={Styles.flex}>
              {item.title}
            </Text>
          </View>
        </>
      );
    }
    return <ContentLoader style={[Styles.flex, styles.thumbImage]} />;
  };

  /**
   * render card style
   * @returns {JSX.Element}
   */
  const renderCard = () => {
    if (item?.id) {
      return (
        <View style={styles.cardContainer}>
          <Image
            style={Styles.flex}
            source={{uri: item.image?.full}}
            resizeMode="cover"
          />
          {item.status && (
            <View
              style={[
                styles.cardStatus,
                {backgroundColor: theme.colors.primary},
              ]}>
              <Text typography="caption" weight="bold" color="white">
                {item.status}
              </Text>
            </View>
          )}
          <View style={styles.cardFavorite}>
            <Icon
              name={item.favorite ? 'heart' : 'heart-outline'}
              color="white"
            />
          </View>
          <View style={styles.rowCard}>
            <View>
              <Text typography="title" weight="bold" color="white">
                {item.title}
              </Text>
              <SizedBox height={4} />
              <View style={Styles.row}>
                <Icon
                  name="map-marker-outline"
                  color={theme.colors.primary}
                  size={12}
                />
                <SizedBox width={2} />
                <Text typography="caption" weight="bold" color="white">
                  {item.address}
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              {item.priceDisplay && (
                <>
                  <Text typography="title" weight="bold" color="white">
                    {item.priceDisplay}
                  </Text>
                  <SizedBox height={4} />
                </>
              )}
              <View style={Styles.row}>
                <Icon name="star" color={Colors.yellow} size={12} />
                <SizedBox width={2} />
                <Text typography="caption" weight="bold" color="white">
                  {`${item?.rate} ${t('rating')}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return <ContentLoader style={styles.cardContainer} />;
  };

  const renderContent = () => {
    switch (type) {
      case 'small':
        return renderSmall;
      case 'grid':
        return renderGrid;
      case 'list':
        return renderList;
      case 'block':
        return renderBlock;
      case 'thumb':
        return renderThumb;
      case 'card':
        return renderCard;
      default:
        return <View />;
    }
  };

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => onPress(item)}
      disabled={!item?.id}>
      {renderContent()}
    </Pressable>
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  item: PropTypes.object,
  onPress: PropTypes.func,
  type: PropTypes.oneOf(['small', 'grid', 'list', 'block', 'card', 'thumb']),
};

Index.defaultProps = {
  style: {},
  item: {},
  onPress: () => {},
  type: 'small',
};

export default Index;
