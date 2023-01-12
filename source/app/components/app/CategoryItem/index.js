import React, {useContext} from 'react';
import {Pressable, View} from 'react-native';
import PropTypes from 'prop-types';
import {
  Application,
  ContentLoader,
  Icon,
  Image,
  SizedBox,
  Text,
} from '@components';
import {Styles} from '@configs';
import styles from './styles';
import {convertIcon} from '@utils';
import {useTranslation} from 'react-i18next';

const Index = props => {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const {style, item, onPress, type} = props;
  /**
   * render for card style
   * @returns {JSX.Element}
   */
  const renderCard = () => {
    let content = <ContentLoader style={[Styles.flex, styles.image]} />;
    if (item?.id) {
      content = (
        <>
          <Image
            style={[Styles.flex, styles.image]}
            source={{uri: item.image?.full}}
            resizeMode="cover"
          />
          <Text
            typography="subtitle"
            weight="bold"
            color="white"
            style={styles.titleCard}>
            {item.title}
          </Text>
        </>
      );
    }
    return (
      <Pressable
        onPress={() => onPress(item)}
        disabled={!item?.id}
        style={[
          Styles.card,
          styles.cardContainer,
          {backgroundColor: theme.colors.background},
          style,
        ]}>
        {content}
      </Pressable>
    );
  };

  /**
   * render for full style
   * @returns {JSX.Element}
   */
  const renderFull = () => {
    let content = <ContentLoader style={[Styles.flex, styles.image]} />;
    if (item?.id) {
      content = (
        <>
          <Image
            style={[Styles.flex, styles.image]}
            source={{uri: item.image?.full}}
            resizeMode="cover"
          />
          <View style={styles.iconFullContainer}>
            <View
              style={[
                styles.iconFull,
                {
                  backgroundColor: item.color,
                },
              ]}>
              <Icon
                {...convertIcon(item.icon)}
                size={18}
                color="white"
                type="FontAwesome5"
              />
            </View>
            <SizedBox width={8} />
            <View>
              <Text typography="title" weight="bold" color="white">
                {item.title}
              </Text>
              <SizedBox height={2} />
              <Text typography="caption" color="white">
                {item.count} {t('location')}
              </Text>
            </View>
          </View>
        </>
      );
    }
    return (
      <Pressable
        onPress={() => onPress(item)}
        disabled={!item?.id}
        style={styles.fullContainer}>
        {content}
      </Pressable>
    );
  };

  /**
   * render for icon style
   * @returns {JSX.Element}
   */
  const renderIcon = () => {
    let content = (
      <View style={styles.icon}>
        <ContentLoader style={styles.image} />
      </View>
    );
    if (item?.id) {
      content = (
        <View style={Styles.row}>
          <View
            style={[
              styles.icon,
              {
                backgroundColor: item.color,
              },
            ]}>
            <Icon
              {...convertIcon(item.icon)}
              size={18}
              color="white"
              type="FontAwesome5"
            />
          </View>
          <SizedBox width={8} />
          <View>
            <Text typography="title" weight="bold">
              {item.title}
            </Text>
            <SizedBox height={2} />
            <Text typography="caption">
              {item.count} {t('location')}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <Pressable
        onPress={() => onPress(item)}
        disabled={!item?.id}
        style={[styles.iconContainer, {backgroundColor: theme.colors.card}]}>
        {content}
      </Pressable>
    );
  };

  if (type === 'card') {
    return renderCard();
  }

  if (type === 'full') {
    return renderFull();
  }

  return renderIcon();
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  item: PropTypes.object,
  onPress: PropTypes.func,
  type: PropTypes.oneOf(['card', 'icon', 'full']),
};

Index.defaultProps = {
  style: {},
  item: {},
  onPress: () => {},
  type: 'card',
};

export default Index;
