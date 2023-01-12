import React, {useContext, useRef, useState} from 'react';
import {ActivityIndicator, Pressable, View} from 'react-native';
import PropTypes from 'prop-types';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Application, Icon, Image} from '@components';
import styles from './styles';
import {Images, Styles} from '@configs';
import {Bar, Circle} from 'react-native-progress';

const Index = props => {
  const {theme} = useContext(Application);
  const {style, percent, image, type, indicator, processing, onResult} = props;
  const widthRef = useRef(0);

  const [asset, setAsset] = useState();

  /**
   * on picker image
   */
  const onPicker = async () => {
    const options = {
      selectionLimit: 1,
    };
    let result;
    if (type === 'photo') {
      result = await launchImageLibrary(options);
    } else {
      result = await launchCamera(options);
    }
    const picked = result?.assets?.[0];
    if (picked) {
      setAsset(picked);
      onResult(picked);
    }
  };

  /**
   * render loading content
   */
  const renderLoading = () => {
    const size = typeof style.width === 'number' ? style.width : null;
    if (percent > 0 && percent < 100) {
      if (indicator === 'line') {
        const width = widthRef.current - 16;
        return (
          <View style={[styles.uploadSquare, Styles.padding4]}>
            <Bar
              progress={percent / 100}
              color={theme.colors.primary}
              width={width - 16 > 0 ? width : null}
            />
          </View>
        );
      }
      return (
        <View style={styles.uploadCircle}>
          <Circle
            progress={percent / 100}
            color={theme.colors.primary}
            size={size}
          />
        </View>
      );
    }

    if (processing) {
      return (
        <View style={styles.uploadCircle}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      );
    }
  };

  /**
   * render for content
   */
  const renderContent = () => {
    let width = '100%';
    let height = '100%';
    const source = asset ?? image;
    const borderRadius = style.borderRadius ?? 12;
    if (typeof style.width === 'number') {
      width = style.width - 4;
    }
    if (typeof style.height === 'number') {
      height = style.height - 4;
    }
    return (
      <View
        onLayout={event => {
          const {width: widthView} = event.nativeEvent.layout;
          widthRef.current = widthView;
        }}
        style={[
          styles.container,
          {
            borderColor: theme.colors.primary,
            borderRadius,
          },
          style,
        ]}>
        {source?.uri ? (
          <Image
            source={source}
            style={{
              width,
              height,
              borderRadius,
            }}
          />
        ) : (
          <View
            style={[
              styles.iconAdd,
              {
                backgroundColor: theme.colors.primary,
              },
            ]}>
            <Icon name="plus" color="white" />
          </View>
        )}
        {renderLoading()}
      </View>
    );
  };

  return <Pressable onPress={onPicker}>{renderContent()}</Pressable>;
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.any,
  type: PropTypes.oneOf(['photo', 'camera']),
  indicator: PropTypes.oneOf(['line', 'circle']),
  percent: PropTypes.number,
  processing: PropTypes.bool,
  onResult: PropTypes.func,
};

Index.defaultProps = {
  style: {width: 100, height: 100},
  image: Images.empty,
  type: 'photo',
  indicator: 'circle',
  percent: 0,
  processing: false,
  onResult: () => {},
};

export default Index;
