import React, {useContext, useRef, useState} from 'react';
import {
  Application,
  Icon,
  IconButton,
  Image,
  ImageSlider,
  ScreenContainer,
  Text,
} from '@components';
import {Colors, Images, Styles} from '@configs';
import {FlatList, Pressable, View} from 'react-native';
import styles from './styles';

export default function Index({navigation, route}) {
  const {theme} = useContext(Application);
  const listRef = useRef();
  const galleryRef = useRef();

  const [indexSelected, setIndexSelected] = useState(0);

  const product = route.params?.item;

  /**
   * on press image
   * @param value
   */
  const onPressImage = value => {
    if (value === indexSelected) {
      return;
    }
    galleryRef.current?.snapToItem(value);
  };

  /**
   * on change index
   * @param value
   */
  const onChange = value => {
    setIndexSelected(value);
    listRef.current?.scrollToIndex({
      animated: true,
      index: value,
    });
  };

  /**
   * render image item
   * @param item
   * @param index
   * @returns {JSX.Element}
   */
  const renderItem = ({item, index}) => {
    return (
      <Pressable onPress={() => onPressImage(index)}>
        <Image
          style={[
            styles.imageItem,
            index === indexSelected && {borderColor: theme.colors.primary},
          ]}
          source={{uri: item.full}}
        />
      </Pressable>
    );
  };

  return (
    <ScreenContainer
      navigation={navigation}
      style={{backgroundColor: Colors.black}}
      options={{
        headerShadowVisible: false,
        headerStyle: {backgroundColor: Colors.black},
        headerTintColor: 'white',
      }}>
      <View style={Styles.flex}>
        <View style={Styles.flexCenter}>
          <ImageSlider
            ref={galleryRef}
            data={product?.galleries?.map(item => {
              return {
                image: item.full,
              };
            })}
            autoplay={false}
            resizeMode="contain"
            paginationStyle={styles.sliderDot}
            onChange={onChange}
          />
        </View>
        <View>
          <View style={[Styles.rowSpace, Styles.paddingHorizontal16]}>
            <Text typography="title" color="white">
              {product?.title}
            </Text>
            <Text typography="title" color="white">
              {indexSelected}/{product?.galleries?.length}
            </Text>
          </View>
          <FlatList
            ref={listRef}
            contentContainerStyle={Styles.padding8}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={product?.galleries ?? []}
            keyExtractor={(item, index) => `${item?.id}${index}`}
            renderItem={renderItem}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
