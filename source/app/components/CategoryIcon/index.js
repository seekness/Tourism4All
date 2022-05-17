import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BaseColor} from '@config';
import {Text, Icon} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {
  Placeholder,
  PlaceholderLine,
  Progressive,
  PlaceholderMedia,
} from 'rn-placeholder';

export default function CategoryIcon(props) {
  const {t} = useTranslation();
  const {style, loading, icon, title, subtitle, color, onPress} = props;
  if (loading) {
    return (
      <Placeholder Animation={Progressive}>
        <View style={[styles.contain, style]}>
          <PlaceholderMedia style={styles.iconContent} />
          <View style={{padding: 10, flex: 1}}>
            <PlaceholderLine style={{width: '50%'}} />
            <PlaceholderLine style={{width: '80%'}} />
          </View>
        </View>
      </Placeholder>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={[styles.iconContent, {backgroundColor: color}]}>
        <Icon name={icon} size={32} color={BaseColor.whiteColor} solid />
      </View>
      <View style={{padding: 10, flex: 1}}>
        <Text headline semibold>
          {title}
        </Text>
        <Text footnote semibold grayColor style={{marginTop: 5}}>
          {subtitle} {t('location')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

CategoryIcon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
};

CategoryIcon.defaultProps = {
  style: {},
  loading: false,
  icon: '',
  color: '',
  title: '',
  subtitle: '',
  onPress: () => {},
};
