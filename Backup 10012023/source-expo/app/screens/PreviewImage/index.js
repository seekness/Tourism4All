import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import Swiper from 'react-native-swiper';
import {Image, Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';

export default function PreviewImage({navigation, route}) {
  const {colors} = useTheme();

  let flatListRef = null;
  let swiperRef = null;

  const images = route.params?.gallery ?? [];
  const [indexSelected, setIndexSelected] = useState(0);

  /**
   * call when select image
   *
   * @param {*} value
   */
  const onSelect = value => {
    setIndexSelected(value);
    flatListRef.scrollToIndex({
      animated: true,
      index: value,
    });
  };

  /**
   * @description Called when image item is selected or activated
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {*} touched
   * @returns
   */
  const onTouchImage = touched => {
    if (touched === indexSelected) {
      return;
    }
    swiperRef?.scrollBy(touched - indexSelected, false);
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {backgroundColor: 'black'}]}
      edges={['right', 'left']}>
      <Header
        style={{backgroundColor: 'black'}}
        title=""
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.whiteColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        barStyle="light-content"
      />
      <Swiper
        ref={ref => {
          swiperRef = ref;
        }}
        dotStyle={{
          backgroundColor: BaseColor.dividerColor,
        }}
        paginationStyle={{bottom: 0}}
        loop={false}
        activeDotColor={colors.primary}
        removeClippedSubviews={false}
        onIndexChanged={index => onSelect(index)}>
        {images.map((item, key) => {
          return (
            <Image
              key={`image${key}`}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
              source={{uri: item.full}}
            />
          );
        })}
      </Swiper>
      <View
        style={{
          paddingVertical: 10,
        }}>
        <View style={styles.lineText}>
          <Text body2 whiteColor>
            Standard Double Room
          </Text>
          <Text body2 whiteColor>
            {indexSelected + 1}/{images.length}
          </Text>
        </View>
        <FlatList
          ref={ref => {
            flatListRef = ref;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={images}
          keyExtractor={(item, index) => item.full}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                onTouchImage(index);
              }}
              activeOpacity={0.9}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  marginLeft: 20,
                  borderRadius: 8,
                  borderColor:
                    index == indexSelected
                      ? colors.primaryLight
                      : BaseColor.grayColor,
                  borderWidth: 1,
                }}
                source={{uri: item.full}}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
