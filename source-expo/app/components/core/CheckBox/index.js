import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Application, Icon} from '@components';

const Index = props => {
  const {theme} = useContext(Application);
  const {style, value, disabled, size, shape, onPress} = props;

  /**
   * export icon name
   */
  const getIconName = () => {
    switch (shape) {
      case 'circle':
        if (value) {
          return 'checkbox-marked-circle';
        }
        return 'checkbox-blank-circle-outline';
      case 'rectangle':
        if (value) {
          return 'checkbox-marked';
        }
        return 'checkbox-blank-outline';

      default:
        return 'checkbox-blank-outline';
    }
  };

  /**
   * export icon color
   */
  const getIconColor = () => {
    if (disabled) {
      return theme.colors.textSecondary;
    }
    if (value) {
      return theme.colors.primary;
    }
    return theme.colors.text;
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Icon
        name={getIconName()}
        size={size}
        color={getIconColor()}
        style={style}
      />
    </TouchableOpacity>
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  onPress: PropTypes.func,
  shape: PropTypes.oneOf(['circle', 'rectangle']),
};

Index.defaultProps = {
  style: {},
  value: false,
  disabled: false,
  size: 24,
  onPress: () => {},
  shape: 'circle',
};

export default Index;
