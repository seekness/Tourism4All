import React, {memo, useContext, useState} from 'react';
import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Application, Icon, Image, SizedBox, Text} from '@components';
import {Colors, Images, Styles} from '@configs';
import PropTypes from 'prop-types';
import styles from './styles';

function Index(props) {
  const {theme} = useContext(Application);
  const {width} = useWindowDimensions();
  const {data, onChange, onPress, style} = props;
  const [active, setActive] = useState(0);

  const renderItem = ({item, index}) => {
    return (
      <View style={Styles.flex}>
        <Image source={item.image} style={Styles.flex} resizeMode="cover" />
        <TouchableOpacity
          style={styles.actionContent}
          onPress={() => onPress(item)}>
          <View style={Styles.rowCenter}>
            <Text typography="caption" weight="bold" color="white">
              {item.titleAction}
            </Text>
            <SizedBox width={2} />
            <Icon name="chevron-right" size={12} color={Colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={width - 32}
        itemWidth={width - 32}
        loop={true}
        currentIndex={active}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={3000}
        onSnapToItem={index => {
          setActive(index);
          onChange(data[index]);
        }}
      />
      <View style={styles.paginationContent}>
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
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.array,
  onPress: PropTypes.func,
  onChange: PropTypes.func,
};

Index.defaultProps = {
  style: {},
  data: [
    {
      image: Images.homeBanner1,
      titleAction: 'Xem chi tiết',
    },
    {
      image: Images.homeBanner3,
      titleAction: 'Đặt ngay',
    },
  ],
  onPress: item => {},
  onChange: item => {},
};

export default memo(Index);
