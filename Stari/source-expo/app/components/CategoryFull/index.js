import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BaseColor} from '@config';
import {Text, Icon, Image} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import {Placeholder, Progressive, PlaceholderMedia} from 'rn-placeholder';
import {useTranslation} from 'react-i18next';

export default function CategoryFull(props) {
  const {t} = useTranslation();
  const {style, loading, image, icon, color, title, subtitle, onPress} = props;
  if (loading) {
    return (
      <Placeholder Animation={Progressive}>
        <View style={[styles.contain, style]}>
          <PlaceholderMedia style={styles.placeholderContent} />
        </View>
      </Placeholder>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.contentIcon}>
        <View style={[styles.iconCircle, {backgroundColor: color}]}>
          <Icon name={icon} size={18} color={BaseColor.whiteColor} />
        </View>
        <View style={styles.contentTitle}>
          <Text headline bold whiteColor>
            {title}
          </Text>
          <Text body2 bold whiteColor>
            {subtitle} {t('location')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

CategoryFull.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool,
  image: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
};

CategoryFull.defaultProps = {
  style: {},
  loading: false,
  image: '',
  icon: '',
  color: '',
  title: '',
  subtitle: '',
  onPress: () => {},
};
