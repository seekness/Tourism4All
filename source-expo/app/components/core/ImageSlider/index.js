import React, {
  forwardRef,
  memo,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Pressable, useWindowDimensions, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Application, ContentLoader, Image} from '@components';
import {Colors, Styles} from '@configs';
import PropTypes from 'prop-types';
import styles from './styles';

const Index = forwardRef((props, ref) => {
  const {theme} = useContext(Application);
  const {width} = useWindowDimensions();
  const carouselRef = useRef();

  const {
    data,
    resizeMode,
    onChange,
    onPress,
    autoplay,
    style,
    paginationStyle,
  } = props;
  const [active, setActive] = useState(0);

  useImperativeHandle(ref, () => carouselRef.current);

  /**
   * render item image
   * @param item
   * @returns {JSX.Element}
   */
  const renderItem = ({item}) => {
    return (
      <Pressable style={Styles.flex} onPress={() => onPress(item)}>
        <Image
          source={{uri: item.image}}
          style={Styles.flex}
          resizeMode={resizeMode}
        />
      </Pressable>
    );
  };

  const renderContent = () => {
    if (data?.length > 0) {
      return (
        <>
          <Carousel
            ref={carouselRef}
            data={data}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            loop={true}
            currentIndex={active}
            autoplay={autoplay}
            autoplayDelay={500}
            autoplayInterval={3000}
            inactiveSlideScale={1}
            onSnapToItem={index => {
              setActive(index);
              onChange(index);
            }}
          />
          <View style={[styles.paginationContent, paginationStyle]}>
            <Pagination
              dotsLength={data.length}
              activeDotIndex={active}
              containerStyle={styles.dotContent}
              dotStyle={[
                styles.dotActiveStyle,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              inactiveDotStyle={{
                backgroundColor: Colors.white,
              }}
              inactiveDotOpacity={1}
              inactiveDotScale={0.6}
            />
          </View>
        </>
      );
    }
    return <ContentLoader />;
  };

  return <View style={[styles.container, style]}>{renderContent()}</View>;
});

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  paginationStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.array,
  resizeMode: PropTypes.string,
  autoplay: PropTypes.bool,
  onPress: PropTypes.func,
  onChange: PropTypes.func,
};

Index.defaultProps = {
  style: {},
  paginationStyle: {},
  data: [],
  resizeMode: 'cover',
  autoplay: true,
  onPress: () => {},
  onChange: () => {},
};

export default memo(Index);
