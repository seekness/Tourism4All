import React, {useContext} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Application} from '@components';
import styles from './styles';

const Index = props => {
  const {theme} = useContext(Application);
  const {color, thickness, direction} = props;

  let style = [
    styles.horizontal,
    {
      backgroundColor: color ?? theme.colors.border,
      height: thickness,
    },
  ];

  if (direction === 'vertical') {
    style = [
      styles.vertical,
      {
        backgroundColor: color ?? theme.colors.border,
        width: thickness,
      },
    ];
  }
  return <View style={style} />;
};

Index.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.number,
  direction: PropTypes.oneOf('horizontal', 'vertical'),
};

Index.defaultProps = {
  color: null,
  thickness: 1,
  direction: 'horizontal',
};

export default Index;
