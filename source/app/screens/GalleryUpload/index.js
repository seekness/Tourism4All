import React, {useContext, useState} from 'react';
import {
  Application,
  Button,
  Icon,
  ImagePicker,
  ScreenContainer,
  UploadImage,
} from '@components';
import {useTranslation} from 'react-i18next';
import {
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {Styles} from '@configs';
import Navigator from '@navigator';
import styles from './styles';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const {width: widthDevice} = useWindowDimensions();

  const [list, setList] = useState([...(route.params?.item ?? [])]);

  /**
   * on add one item
   */
  const onMore = () => {
    setList([...list, ...[null]]);
  };

  /**
   * on apply gallery
   */
  const onApply = () => {
    route.params?.onResult(list);
    navigation.goBack();
  };

  /**
   * on remove item
   * @param index
   */
  const onRemove = index => {
    list.splice(index, 1);
    setList([...list]);
  };

  const itemStyle = {
    width: (widthDevice - 80) / 4,
    height: (widthDevice - 80) / 4,
  };

  return (
    <ScreenContainer
      navigation={navigation}
      options={{
        headerRight: () => {
          return (
            <View style={Styles.nativeRightButton}>
              <Button
                onPress={onApply}
                type="text"
                size="small"
                full={false}
                textStyle={{color: theme.colors.primary}}>
                {t('apply')}
              </Button>
            </View>
          );
        },
      }}>
      <ScrollView
        style={Styles.flex}
        contentContainerStyle={[Styles.flex, Styles.padding8]}>
        <View style={Styles.rowWrap}>
          {list.map((item, index) => {
            return (
              <UploadImage
                onCompleted={data => {
                  list[index] = data;
                  Navigator.showLoading({loading: false});
                }}
                key={`${item?.id ?? index}`}>
                {({percent, uri, processing, upload}) => {
                  return (
                    <>
                      <ImagePicker
                        image={{uri: uri ?? item?.thumb}}
                        percent={percent}
                        processing={processing}
                        indicator="line"
                        onResult={result => {
                          Navigator.showLoading({loading: true});
                          upload(result);
                        }}
                        style={[styles.galleryImage, itemStyle]}
                      />
                      <TouchableOpacity
                        onPress={() => onRemove(index)}
                        style={[
                          styles.removeIcon,
                          {
                            backgroundColor: theme.colors.primary,
                            borderColor: theme.colors.border,
                          },
                        ]}>
                        <Icon name="close" size={14} color="white" />
                      </TouchableOpacity>
                    </>
                  );
                }}
              </UploadImage>
            );
          })}
          <TouchableOpacity
            onPress={onMore}
            style={[
              styles.addButton,
              itemStyle,
              {backgroundColor: theme.colors.border},
            ]}>
            <Icon name="plus" size={28} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
