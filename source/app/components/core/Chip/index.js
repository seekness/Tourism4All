import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Application, Icon, SizedBox, Text} from '@components';
import styles from './styles';
import {Opacity, Styles} from '@configs';

const Index = props => {
  const {theme} = useContext(Application);
  const {style, textStyle, leading, children, selected, type} = props;

  const getStyle = () => {
    switch (type) {
      default:
        return {
          backgroundColor: selected
            ? theme.colors.primary + Opacity[30]
            : theme.colors.card,
          borderColor: theme.colors.border,
        };
    }
  };

  const renderLeading = () => {
    if (leading) {
      return leading;
    }
    if (selected) {
      return <Icon name="check" size={16} />;
    }
  };

  return (
    <TouchableOpacity
      {...props}
      style={[Styles.card, styles.container, getStyle(), style]}>
      <SizedBox width={8} />
      {renderLeading()}
      <SizedBox width={8} />
      <Text typography="subtitle" weight="bold" style={textStyle}>
        {children}
      </Text>
      <SizedBox width={16} />
    </TouchableOpacity>
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selected: PropTypes.bool,
  leading: PropTypes.element,
  type: PropTypes.oneOf(['filter']),
};

Index.defaultProps = {
  style: {},
  textStyle: {},
  selected: false,
  leading: null,
  type: 'filter',
};

export default Index;
