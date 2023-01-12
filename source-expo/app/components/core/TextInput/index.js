import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Application, getFontFamily, Icon, SizedBox, Text} from '@components';
import styles from './styles';
import {Opacity} from '@configs';

const Index = forwardRef((props, ref) => {
  const {theme, font} = useContext(Application);
  const {
    style,
    size,
    label,
    info,
    onPressInfo,
    onChangeText,
    error,
    trailing,
    numberOfLines,
  } = props;

  const inputRef = useRef();
  const [focus, setFocus] = useState(false);

  useImperativeHandle(ref, () => inputRef.current);

  /**
   * get border color
   */
  const getBorderColor = () => {
    if (error) {
      return theme.colors.error;
    }
    if (focus) {
      return theme.colors.primary;
    }
    return theme.colors.border;
  };

  /**
   * get size style
   */
  const getSizeStyle = () => {
    if (numberOfLines > 1) {
      return [styles.small, {height: numberOfLines * 24}];
    }
    switch (size) {
      case 'large':
        return styles.large;
      case 'small':
        return styles.small;

      default:
        return styles.large;
    }
  };

  /**
   * get text style
   */
  const getTextStyle = () => {
    let textStyle;
    switch (size) {
      case 'large':
        textStyle = styles.textLarge;
        break;
      case 'small':
        textStyle = styles.textSmall;
        break;
      default:
        textStyle = styles.textLarge;
        break;
    }

    return {
      ...textStyle,
      fontFamily: getFontFamily({
        fontFamily: font,
        fontWeight: textStyle.fontWeight,
      }),
    };
  };

  /**
   * on clear text
   */
  const onClear = () => {
    inputRef?.current?.clear?.();
    onChangeText?.('');
  };

  /**
   * on blur
   */
  const onBlur = () => {
    setFocus(false);
    props.onBlur?.();
  };

  /**
   * on forcus
   */
  const onFocus = () => {
    setFocus(true);
    props.onFocus?.();
  };

  /**
   * render info icon button
   */
  const renderInfo = () => {
    if (info) {
      return (
        <TouchableOpacity style={styles.rowInfo} onPress={onPressInfo}>
          <Icon
            name="information-outline"
            color={theme.colors.secondary}
            size={16}
          />
        </TouchableOpacity>
      );
    }
  };

  /**
   * render clear action
   */
  const renderClear = () => {
    if (focus) {
      return (
        <TouchableOpacity onPress={onClear}>
          <Icon name="close-circle" />
        </TouchableOpacity>
      );
    }
  };

  /**
   * render trailing
   */
  const renderTrailing = () => {
    if (trailing) {
      return <View style={styles.trailingContent}>{trailing}</View>;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[getSizeStyle(), {borderColor: getBorderColor()}]}>
        <View style={styles.rowContent}>
          <TextInput
            {...props}
            ref={inputRef}
            multiline={numberOfLines > 1}
            textAlignVertical={numberOfLines > 1 ? 'top' : 'center'}
            style={[
              styles.inputContent,
              {color: theme.colors.text},
              numberOfLines > 1 && styles.multilineContent,
              getTextStyle(),
            ]}
            placeholderTextColor={theme.colors.textSecondary + Opacity['40']}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          {renderClear()}
          {renderTrailing()}
          <View
            style={[styles.infoContent, {backgroundColor: theme.colors.card}]}>
            <Text typography="subtitle" type="secondary">
              {label}
            </Text>
            {renderInfo()}
          </View>
        </View>
      </View>
      {error && (
        <>
          <SizedBox height={4} />
          <Text typography="subtitle" color="error">
            {error}
          </Text>
        </>
      )}
    </View>
  );
});

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  size: PropTypes.oneOf(['large', 'small']),
  label: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.bool,
  onPressInfo: PropTypes.func,
  trailing: PropTypes.element,
};

Index.defaultProps = {
  style: {},
  size: 'large',
  label: 'Label',
  error: null,
  info: false,
  onPressInfo: () => {},
  trailing: null,
};

export default Index;
