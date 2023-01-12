import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Text, Icon, StarRating, Tag} from '@components';
import {BaseColor, useTheme} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {
  Placeholder,
  PlaceholderLine,
  Progressive,
  PlaceholderMedia,
} from 'rn-placeholder';
export default function ListItem(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {
    loading,
    grid,
    block,
    small,
    favorite,
    style,
    image,
    title,
    subtitle,
    location,
    phone,
    rate,
    status,
    numReviews,
    enableAction,
    onPress,
    onPressTag,
    omPressMore,
  } = props;

  /**
   * Display place item as block
   */
  const renderBlock = () => {
    if (loading) {
      return (
        <Placeholder Animation={Progressive}>
          <View style={style}>
            <PlaceholderMedia style={styles.blockImage} />
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}>
              <PlaceholderLine style={{width: '50%'}} />
              <PlaceholderLine style={{width: '80%'}} />
              <View style={styles.blockLineMap}>
                <PlaceholderLine style={{width: '25%'}} />
              </View>
              <View style={styles.blockLinePhone}>
                <PlaceholderLine style={{width: '50%'}} />
              </View>
            </View>
          </View>
        </Placeholder>
      );
    }

    return (
      <View style={style}>
        <TouchableOpacity onPress={onPress}>
          <Image source={{uri: image}} style={styles.blockImage} />
          {status != ''?
          <Tag status style={styles.tagStatus}>
            {t(status)}
          </Tag>
          : null}
          {favorite ? (
            <Icon
              solid
              name="heart"
              color={BaseColor.whiteColor}
              size={18}
              style={styles.iconLike}
            />
          ) : (
            <Icon
              name="heart"
              color={BaseColor.whiteColor}
              size={18}
              style={styles.iconLike}
            />
          )}
          <View style={styles.blockContentRate}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {rate != ''?
              <Tag rate onPress={onPressTag}>
                {rate}
              </Tag>
              : 
              <Tag rate onPress={onPressTag}>
                0.0
              </Tag>
              }
              <View style={{marginLeft: 10}}>

                <Text caption1 whiteColor semibold style={{marginBottom: 5}}>
                  {t('rate')}
                </Text>

                <StarRating
                  disabled={true}
                  starSize={10}
                  maxStars={5}
                  rating={rate}
                  selectedStar={onPressTag}
                  fullStarColor={BaseColor.yellowColor}
                />
              </View>
            </View>
            <Text caption1 semibold whiteColor style={{marginTop: 5}}>
              {numReviews} {t('feedback')}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}>
          <Text headline semibold grayColor>
            {subtitle}
          </Text>
          <Text title2 semibold style={{marginTop: 4}}>
            {title}
          </Text>
          <View style={styles.blockLineMap}>
            <Icon name="map-marker-alt" color={colors.primaryLight} size={12} />
            <Text caption1 grayColor style={{paddingHorizontal: 4}}>
              {location}
            </Text>
          </View>
          <View style={styles.blockLinePhone}>
            <Icon name="phone" color={colors.primaryLight} size={12} />
            <Text caption1 grayColor style={{paddingHorizontal: 4}}>
              {phone}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  /**
   * Display place item as list
   */
  const renderList = () => {
    if (loading) {
      return (
        <Placeholder Animation={Progressive}>
          <View style={[styles.listContent, style]}>
            <PlaceholderMedia style={styles.listImage} />
            <View style={styles.listContentRight}>
              <PlaceholderLine style={{width: '50%'}} />
              <PlaceholderLine style={{width: '70%'}} />
              <View style={styles.lineRate}>
                <PlaceholderLine style={{width: '20%'}} />
              </View>
              <PlaceholderLine style={{width: '50%'}} />
              <PlaceholderLine style={{width: '50%'}} />
            </View>
          </View>
        </Placeholder>
      );
    }

    return (
      <View style={[styles.listContent, style]}>
        <TouchableOpacity onPress={onPress}>
          <Image source={{uri: image}} style={styles.listImage} />
          {status != ''?
          <Tag status style={styles.listTagStatus}>
            {t(status)}
          </Tag>
          :null}
        </TouchableOpacity>
        <View style={styles.listContentRight}>
          <Text headline semibold grayColor>
            {subtitle}
          </Text>
          <Text title2 semibold style={{marginTop: 5}}>
            {title}
          </Text>
          <View style={styles.lineRate}>
            {rate != ''?
            <Tag onPress={onPressTag} rateSmall style={{marginRight: 5}}>
              {rate}
            </Tag>
            :
            <Tag onPress={onPressTag} rateSmall style={{marginRight: 5}}>
              0.0
            </Tag>
            }
            <StarRating
              disabled={true}
              starSize={10}
              maxStars={5}
              rating={rate}
              selectedStar={rating => {}}
              fullStarColor={BaseColor.yellowColor}
            />
          </View>
          <Text caption1 grayColor style={{marginTop: 10}}>
            {location}
          </Text>
          <Text caption1 grayColor style={{marginTop: 5}}>
            {phone}
          </Text>
          {favorite ? (
            <Icon
              name="heart"
              color={colors.primaryLight}
              solid
              size={18}
              style={styles.iconListLike}
            />
          ) : (
            <Icon
              name="heart"
              color={colors.primaryLight}
              size={18}
              style={styles.iconListLike}
            />
          )}
        </View>
      </View>
    );
  };

  /**
   * Display place item as grid
   */
  const renderGrid = () => {
    if (loading) {
      return (
        <View style={[styles.girdContent, style]}>
          <Placeholder Animation={Progressive}>
            <View style={[styles.girdContent, style]}>
              <PlaceholderMedia style={styles.girdImage} />
              <PlaceholderLine style={{width: '30%', marginTop: 8}} />
              <PlaceholderLine style={{width: '50%'}} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <PlaceholderLine style={{width: '20%'}} />
              </View>
              <PlaceholderLine style={{width: '30%'}} />
            </View>
          </Placeholder>
        </View>
      );
    }

    return (
      <View style={[styles.girdContent, style]}>
        <TouchableOpacity onPress={onPress}>
          <Image source={{uri: image}} style={styles.girdImage} />
          {status != ''?
          <Tag status style={styles.tagGirdStatus}>
            {t(status)}
          </Tag>
          :null}
          {favorite ? (
            <Icon
              name="heart"
              color={colors.primaryLight}
              solid
              size={18}
              style={styles.iconGirdLike}
            />
          ) : (
            <Icon
              name="heart"
              color={colors.primaryLight}
              size={18}
              style={styles.iconGirdLike}
            />
          )}
        </TouchableOpacity>
        <Text
          footnote
          semibold
          grayColor
          style={{marginTop: 5}}
          numberOfLines={1}>
          {subtitle}
        </Text>
        <Text subhead semibold style={{marginTop: 5}} numberOfLines={1}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}>
          {rate != ''?
          <Tag onPress={onPressTag} rateSmall style={{marginRight: 5}}>
            {rate}
          </Tag>
          :
          <Tag onPress={onPressTag} rateSmall style={{marginRight: 5}}>
            0.0
          </Tag>
          }
          <StarRating
            disabled={true}
            starSize={10}
            maxStars={5}
            rating={rate}
            selectedStar={onPressTag}
            fullStarColor={BaseColor.yellowColor}
          />
        </View>
        <Text caption2 grayColor style={{marginTop: 10}} numberOfLines={1}>
          {location}
        </Text>
      </View>
    );
  };

  const renderSmall = () => {
    if (loading) {
      return (
        <Placeholder Animation={Progressive}>
          <View style={[styles.contain, style]}>
            <PlaceholderMedia style={styles.smallImage} />
            <View
              style={{
                paddingHorizontal: 10,
                justifyContent: 'center',
                flex: 1,
              }}>
              <PlaceholderLine style={{width: '80%'}} />
              <PlaceholderLine style={{width: '55%'}} />
              <PlaceholderLine style={{width: '75%'}} />
            </View>
          </View>
        </Placeholder>
      );
    }

    return (
      <TouchableOpacity style={[styles.contain, style]} onPress={onPress}>
        <Image source={{uri: image}} style={styles.smallImage} />
        <View
          style={{paddingHorizontal: 10, justifyContent: 'center', flex: 1}}>
          <Text headline semibold numberOfLines={1}>
            {title}
          </Text>
          <Text footnote semibold grayColor style={{marginTop: 4}}>
            {subtitle}
          </Text>
          <View style={styles.smallContentRate}>
            {rate != ''?
            <Tag onPress={onPressTag} rateSmall style={{marginRight: 4}}>
              {rate}
            </Tag>
            :
            <Tag onPress={onPressTag} rateSmall style={{marginRight: 4}}>
              0.0
            </Tag>
            }
            <StarRating
              disabled={true}
              starSize={10}
              maxStars={5}
              rating={rate}
              selectedStar={onPressTag}
              fullStarColor={BaseColor.yellowColor}
            />
          </View>
        </View>
        {enableAction && (
          <TouchableOpacity onPress={omPressMore} style={styles.moreButton}>
            <Icon name="ellipsis-v" color={colors.text} size={16} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  if (grid) return renderGrid();
  else if (block) return renderBlock();
  else if (small) return renderSmall();
  else return renderList();
}

ListItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  list: PropTypes.bool,
  block: PropTypes.bool,
  grid: PropTypes.bool,
  small: PropTypes.bool,
  favorite: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  location: PropTypes.string,
  phone: PropTypes.string,
  rate: PropTypes.number,
  status: PropTypes.string,
  numReviews: PropTypes.number,
  enableAction: PropTypes.bool,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
  omPressMore: PropTypes.func,
};

ListItem.defaultProps = {
  style: {},
  image: '',
  loading: false,
  list: true,
  block: false,
  grid: false,
  small: false,
  favorite: false,
  title: '',
  subtitle: '',
  location: '',
  phone: '',
  rate: 4.5,
  status: '',
  numReviews: 99,
  enableAction: false,
  onPress: () => {},
  onPressTag: () => {},
  omPressMore: () => {},
};
