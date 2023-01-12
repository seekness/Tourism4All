import React, {useContext} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Application, Button, Image, SizedBox, Text} from '@components';
import {Styles} from '@configs';
import Navigator from '@navigator';
import styles from './styles';

const Index = props => {
  const {theme} = useContext(Application);
  const {
    image,
    title,
    message,
    primaryButton,
    secondaryButton,
    imageType,
    buttonType,
  } = props;

  /**
   * onPress primary button
   */
  const onPressPrimaryAction = () => {
    Navigator.pop();
    primaryButton.onPress?.();
  };

  /**
   * onPress secondary button
   */
  const onPressSecondaryAction = () => {
    Navigator.pop();
    secondaryButton.onPress?.();
  };

  /**
   * render banner image
   *
   * @return {*}
   */
  const renderImage = () => {
    if (imageType === 'icon') {
      return (
        <View style={[Styles.flexCenter, Styles.padding16]}>
          <Image source={image} style={styles.iconImage} />
        </View>
      );
    }
    return <Image source={image} style={styles.fullImage} />;
  };

  /**
   * render secondary button
   * @return {*}
   */
  const renderSecondaryButton = () => {
    if (secondaryButton) {
      if (buttonType === 'text') {
        return (
          <>
            <Button
              type="text"
              full={false}
              onPress={onPressSecondaryAction}
              style={styles.textAction}>
              {secondaryButton.title}
            </Button>
            <SizedBox width={24} />
          </>
        );
      }
      return (
        <>
          <Button
            style={Styles.flex}
            type="secondary"
            onPress={onPressSecondaryAction}>
            {secondaryButton.title}
          </Button>
          <SizedBox width={16} />
        </>
      );
    }
  };

  /**
   * render action button
   * @return {*}
   */
  const renderAction = () => {
    if (buttonType === 'text') {
      return (
        <View style={styles.rowActionText}>
          {renderSecondaryButton()}
          <Button
            onPress={onPressPrimaryAction}
            type="text"
            full={false}
            style={styles.textAction}
            textStyle={{color: theme.colors.primary}}>
            {primaryButton.title}
          </Button>
        </View>
      );
    }
    return (
      <View style={Styles.rowCenter}>
        {renderSecondaryButton()}
        <Button style={Styles.flex} onPress={onPressPrimaryAction}>
          {primaryButton.title}
        </Button>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
        },
        imageType === 'full' && styles.hiddenOverflow,
      ]}>
      {image && renderImage()}
      <View style={Styles.padding24}>
        <Text typography="h4" weight="bold">
          {title}
        </Text>
        <Text typography="h4" style={Styles.paddingVertical24}>
          {message}
        </Text>
        {renderAction()}
      </View>
    </View>
  );
};

Index.propTypes = {
  image: PropTypes.any,
  title: PropTypes.string,
  message: PropTypes.node,
  primaryButton: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  }).isRequired,
  secondaryButton: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  }),
  imageType: PropTypes.oneOf(['full', 'icon']),
  buttonType: PropTypes.oneOf(['primary', 'text']),
};

Index.defaultProps = {
  image: null,
  title: 'Tiêu đề',
  message: 'Đây là nội dung cho văn bản, bạn có thể thay đổi nhiều thông điệp',
  primaryButton: {
    title: 'Button ',
    onPress: () => {},
  },
  secondaryButton: null,
  imageType: 'full',
  buttonType: 'primary',
};

export default Index;
