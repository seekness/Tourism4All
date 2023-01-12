import React, {memo, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Application, ContentLoader, Icon, Text} from '@components';
import {Styles} from '@configs';
import styles from './styles';

const Index = props => {
  const {theme} = useContext(Application);
  const {style, resizeMode, placeholder, error, source} = props;
  const [loading, setLoading] = useState(typeof source === 'object');
  const [fail, setFail] = useState(false);

  /**
   * render content
   * @returns {JSX.Element}
   */
  const renderContent = () => {
    if (loading || fail) {
      let content = placeholder ?? <ContentLoader style={styles.placeholder} />;
      if (fail) {
        content = error ?? (
          <View
            style={[Styles.flexCenter, {backgroundColor: theme.colors.border}]}>
            <Icon name="error-outline" type="MaterialIcons" />
            <Text
              typography="subtitle"
              type="secondary"
              style={Styles.textCenter}>
              Can't load image
            </Text>
          </View>
        );
      }
      return <View style={styles.placeholder}>{content}</View>;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <FastImage
        {...props}
        style={styles.image}
        resizeMode={FastImage.resizeMode[resizeMode]}
        onLoad={() => {
          setFail(false);
          setLoading(true);
        }}
        onLoadEnd={() => setLoading(false)}
        onError={() => setFail(true)}
      />
      {renderContent()}
    </View>
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  resizeMode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'center']),
  placeholder: PropTypes.element,
  error: PropTypes.element,
};

Index.defaultProps = {
  style: {},
  resizeMode: 'cover',
  placeholder: null,
  error: null,
};

export default memo(Index);
