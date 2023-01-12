import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Image, SizedBox, Text} from '@components';
import styles from './styles';
import {Images} from '@configs';

const Index = props => {
  const {style, image, title, message, button} = props;
  /**
   * render for button
   * @returns {JSX.Element}
   */
  const renderButton = () => {
    if (button) {
      return (
        <>
          <SizedBox height={16} />
          <Button
            size="medium"
            onPress={button.onPress}
            full={false}
            type="outline">
            {button.title}
          </Button>
        </>
      );
    }
  };

  /**
   * render for content
   */
  const renderContent = () => {
    return (
      <>
        <Image style={styles.image} source={image} />
        <Text typography="h4" weight="bold">
          {title}
        </Text>
        <SizedBox height={4} />
        <Text typography="subtitle" type="secondary">
          {message}
        </Text>
        {renderButton()}
      </>
    );
  };

  return <View style={[styles.container, style]}>{renderContent()}</View>;
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.any,
  title: PropTypes.string,
  message: PropTypes.string,
  button: PropTypes.shape({
    title: PropTypes.string,
    onPress: PropTypes.func,
  }),
};

Index.defaultProps = {
  style: {},
  image: Images.empty,
  title: 'No matching results',
  message: 'Please check keywords or try again with another keyword',
};

export default Index;
