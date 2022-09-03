import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView, Text, Button, Image} from '@components';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {BaseColor, BaseStyle, Images, useTheme} from '@config';
import {useTranslation} from 'react-i18next';

export default function Walkthrough({navigation}) {
  const [slide] = useState([
    {key: 1, image: Images.trip2},
    {key: 2, image: Images.trip1},
    {key: 3, image: Images.trip3},
    {key: 4, image: Images.trip4},
  ]);
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
      <ScrollView
        style={BaseStyle.safeAreaView}
        contentContainerStyle={styles.contain}>
        <View style={styles.wrapper}>
          <Swiper
            dotStyle={{
              backgroundColor: BaseColor.dividerColor,
            }}
            activeDotColor={colors.primary}
            paginationStyle={styles.contentPage}
            removeClippedSubviews={false}>
            {slide.map((item, index) => {
              return (
                <View style={styles.slide} key={item.key}>
                  <Image source={item.image} style={styles.img} />
                  <Text body1 style={styles.textSlide}>
                    {t('pick_your_destication')}
                  </Text>
                </View>
              );
            })}
          </Swiper>
        </View>
        <Button
          full
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}>
          {t('sign_in')}
        </Button>
        <View style={styles.contentActionBottom}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text body1 grayColor>
              {t('not_have_account')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
