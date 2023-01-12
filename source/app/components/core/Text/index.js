import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '@configs';
import {Application} from '@components';
import styles from './styles';

const ProximaNova = {
  100: 'Thin',
  200: 'Thin',
  300: 'Thin',
  400: 'Regular',
  500: 'Regular',
  600: 'Regular',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
  normal: 'Regular',
  bold: 'Bold',
};

const Raleway = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
  normal: 'Regular',
  bold: 'Bold',
};

const SFProText = {
  100: 'Thin',
  200: 'Ultralight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semibold',
  700: 'Bold',
  800: 'Heavy',
  900: 'Black',
  normal: 'Regular',
  bold: 'Bold',
};

const FontWeight = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

const FontStyle = {
  normal: '',
  italic: 'Italic',
};

/**
 * export font fontFamily for font
 * @return {*}
 */
export const getFontFamily = ({
  fontFamily = 'SFProText',
  fontWeight = 'normal',
  fontStyle = 'normal',
}) => {
  let style = FontStyle[fontStyle];
  if (Raleway[fontWeight] === 'Regular') {
    style = '';
  }
  switch (fontFamily) {
    case 'ProximaNova':
      return `${fontFamily}-${ProximaNova[fontWeight]}${style}`;
    case 'Raleway':
      return `${fontFamily}-${Raleway[fontWeight]}${style}`;
    case 'SFProText':
      return `${fontFamily}-${SFProText[fontWeight]}${style}`;
    default:
      return `${fontFamily}-${SFProText[fontWeight]}${style}`;
  }
};
const Index = props => {
  const {theme, font} = useContext(Application);
  const {typography, weight, type, color, fontStyle, children, style} = props;

  /**
   * typography style
   * @return {*}
   */
  const getTypography = value => {
    switch (value) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'caption':
        return styles.caption;
      case 'overline':
        return styles.overline;
      default:
        return styles.title;
    }
  };

  /**
   * weight style
   * @return {*}
   */
  const getFontWeight = value => {
    switch (value) {
      case 'thin':
        return {fontWeight: FontWeight.thin};
      case 'ultraLight':
        return {fontWeight: FontWeight.ultraLight};
      case 'light':
        return {fontWeight: FontWeight.light};
      case 'regular':
        return {fontWeight: FontWeight.regular};
      case 'medium':
        return {fontWeight: FontWeight.medium};
      case 'semibold':
        return {fontWeight: FontWeight.semibold};
      case 'bold':
        return {fontWeight: FontWeight.bold};
      case 'heavy':
        return {fontWeight: FontWeight.heavy};
      case 'black':
        return {fontWeight: FontWeight.black};
      default:
        return {fontWeight: FontWeight.regular};
    }
  };

  /**
   * type style
   * @return {*}
   */
  const getType = value => {
    switch (value) {
      case 'primary':
        return {color: theme.colors.text};
      case 'secondary':
        return {color: theme.colors.textSecondary};
      default:
        return {color: theme.colors.text};
    }
  };

  /**
   * color style
   * @return {*}
   */
  const getColor = value => {
    switch (value) {
      case 'primary':
        return {color: theme.colors.primary};
      case 'secondary':
        return {color: theme.colors.secondary};
      case 'white':
        return {color: Colors.white};
      case 'error':
        return {color: theme.colors.error};
      default:
        return {};
    }
  };

  let textStyle = StyleSheet.flatten([
    {fontFamily: font},
    getType(type),
    getTypography(typography),
    getFontWeight(weight),
    getColor(color),
    style,
  ]);

  if (textStyle.fontFamily) {
    textStyle.fontFamily = getFontFamily({
      fontFamily: textStyle.fontFamily,
      fontWeight: textStyle.fontWeight,
      fontStyle,
    });
  }

  return (
    <Text {...props} style={textStyle}>
      {children ?? ' '}
    </Text>
  );
};

Index.propTypes = {
  typography: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'title',
    'subtitle',
    'caption',
    'overline',
  ]),
  weight: PropTypes.oneOf([
    'thin',
    'ultraLight',
    'light',
    'regular',
    'medium',
    'semibold',
    'bold',
    'heavy',
    'black',
  ]),
  type: PropTypes.oneOf(['primary', 'secondary']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'error']),
  children: PropTypes.node,
};

Index.defaultProps = {
  typography: 'title',
  weight: 'regular',
  type: 'primary',
  color: null,
  children: '',
};

export default Index;
