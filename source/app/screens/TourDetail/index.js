import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  ProfileDescription,
  ProfilePerformance,
  Tag,
  Text,
  Card,
  TourDay,
  TourItem,
  Button,
  PackageItem,
  RateDetail,
  CommentItem,
} from '@components';
import {TabView, TabBar} from 'react-native-tab-view';
import styles from './styles';
import {UserData, ReviewData, TourData, PackageData} from '@data';
import {useTranslation} from 'react-i18next';

export default function TourDetail({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'information', title: t('information')},
    {key: 'tour', title: t('tours')},
    {key: 'package', title: t('packages')},
    {key: 'review', title: t('reviews')},
  ]);
  const [userData] = useState(UserData[0]);

  // When tab is activated, set what's index value
  const handleIndexChange = index => setIndex(index);

  // Customize UI tab bar
  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={[styles.indicator, {backgroundColor: colors.primary}]}
      style={[styles.tabbar, {backgroundColor: colors.background}]}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.text}
      renderLabel={({route, focused, color}) => (
        <View style={{flex: 1, width: 130, alignItems: 'center'}}>
          <Text headline semibold={focused} style={{color}}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  // Render correct screen container when tab is activated
  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'information':
        return <InformationTab jumpTo={jumpTo} navigation={navigation} />;
      case 'tour':
        return <TourTab jumpTo={jumpTo} navigation={navigation} />;
      case 'package':
        return <PackageTab jumpTo={jumpTo} navigation={navigation} />;
      case 'review':
        return <ReviewTab jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('travel_agency')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ProfileDescription
          image={userData.image}
          name={userData.name}
          subName={userData.major}
          description={userData.address}
          style={{marginTop: 25, paddingHorizontal: 20}}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Tag primary style={{width: 80}}>
            + {t('follow')}
          </Tag>
          <View style={{flex: 1, paddingLeft: 10, paddingVertical: 5}}>
            <ProfilePerformance data={userData.performance} type="small" />
          </View>
        </View>
        <View style={{flex: 1}}>
          <TabView
            lazy
            navigationState={{index, routes}}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={handleIndexChange}
          />
          <View
            style={[
              styles.contentButtonBottom,
              {borderTopColor: colors.border},
            ]}>
            <View>
              <Text caption1 semibold>
                16 {t('days')}
              </Text>
              <Text title3 primaryColor semibold>
                $2,199.00
              </Text>
              <Text caption1 semibold style={{marginTop: 5}}>
                3 {t('participants')}
              </Text>
            </View>
            <Button onPress={() => navigation.navigate('PreviewBooking')}>
              {t('book_now')}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

/**
 * @description Show when tab Information activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function InformationTab({navigation}) {
  const [tours] = useState(TourData);
  const [dayTour] = useState([
    {
      id: '1',
      image: Images.trip1,
      day: 'Day 1',
      title: 'London - Somme - Paris',
      description:
        'Other hygienic practices that the new hotel — which handles, among other guests, patients seeking medical treatment at the Texas Medical Center — include removing nonessential items like decorative pillows and magazines',
    },
    {
      id: '2',
      image: Images.trip2,
      day: 'Day 2',
      title: 'Paris - Burgundy - Swiss Alps',
      description:
        'Other hygienic practices that the new hotel — which handles, among other guests, patients seeking medical treatment at the Texas Medical Center — include removing nonessential items like decorative pillows and magazines',
    },
    {
      id: '3',
      image: Images.trip3,
      day: 'Day 3',
      title: 'Swiss Alps - Strasbourg',
      description:
        'Other hygienic practices that the new hotel — which handles, among other guests, patients seeking medical treatment at the Texas Medical Center — include removing nonessential items like decorative pillows and magazines',
    },
    {
      id: '4',
      image: Images.trip4,
      day: 'Day 4',
      title: 'Grand Ducal Palace',
      description:
        'Other hygienic practices that the new hotel — which handles, among other guests, patients seeking medical treatment at the Texas Medical Center — include removing nonessential items like decorative pillows and magazines',
    },
  ]);
  const [information] = useState([
    {title: 'Location', detail: 'Luxembourg'},
    {title: 'Duration', detail: '16 Days'},
    {title: 'Departure', detail: '08:00'},
    {title: 'Price per Participant', detail: '2,199.00 USD'},
    {title: 'Group size', detail: '3 - 20 people'},
    {title: 'Transportation', detail: 'Boat, Bicycle, Car'},
  ]);
  const {colors} = useTheme();
  return (
    <ScrollView>
      <View style={{paddingHorizontal: 20}}>
        {information.map((item, index) => {
          return (
            <View
              style={[
                styles.lineInformation,
                {borderBottomColor: colors.border},
              ]}
              key={'information' + index}>
              <Text body2 grayColor>
                {item.title}
              </Text>
              <Text body2 semibold accentColor>
                {item.detail}
              </Text>
            </View>
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text headline semibold>
            Gallery
          </Text>
          <TouchableOpacity>
            <Text footnote grayColor>
              Show more
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentImageGird}>
          <View style={{flex: 4, marginRight: 10}}>
            <Card image={Images.trip7}>
              <Text headline semibold whiteColor>
                Dallas
              </Text>
            </Card>
          </View>
          <View style={{flex: 6}}>
            <View style={{flex: 1}}>
              <Card image={Images.trip3}>
                <Text headline semibold whiteColor>
                  Warsaw
                </Text>
              </Card>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <View style={{flex: 6, marginRight: 10}}>
                <Card image={Images.trip4}>
                  <Text headline semibold whiteColor>
                    Yokohama
                  </Text>
                </Card>
              </View>
              <View style={{flex: 4}}>
                <Card image={Images.trip6}>
                  <Text headline semibold whiteColor>
                    10+
                  </Text>
                </Card>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text
          headline
          semibold
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            marginBottom: 10,
          }}>
          Tour Information
        </Text>
        <FlatList
          contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={dayTour}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => (
            <TourDay
              image={item.image}
              day={item.day}
              title={item.title}
              description={item.description}
              style={{marginLeft: 15}}
              onPress={() => {}}
            />
          )}
        />
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <Text headline semibold style={{marginBottom: 10}}>
          Includes
        </Text>
        <Text body2>
          - Donec sollicitudin molestie malesuada. Quisque velit nisi, pretium
          ut lacinia in, elementum id enim.
        </Text>
        <Text body2 style={{marginTop: 5}}>
          - Other hygienic practices that the new hotel — which handles, among
          other guests, patients seeking medical treatment at the Texas Medical
          Center — include removing nonessential items like decorative pillows
          and magazines
        </Text>
        <Text body2 style={{marginTop: 5}}>
          - Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec
          rutrum congue leo eget malesuada.
        </Text>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <Text headline semibold style={{marginBottom: 10}}>
          Excludes
        </Text>
        <Text body2>
          - Donec sollicitudin molestie malesuada. Quisque velit nisi, pretium
          ut lacinia in, elementum id enim.
        </Text>
        <Text body2 style={{marginTop: 5}}>
          - Other hygienic practices that the new hotel — which handles, among
          other guests, patients seeking medical treatment at the Texas Medical
          Center — include removing nonessential items like decorative pillows
          and magazines
        </Text>
        <Text body2 style={{marginTop: 5}}>
          - Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec
          rutrum congue leo eget malesuada.
        </Text>
      </View>
      <View>
        <Text
          headline
          semibold
          style={{
            marginLeft: 20,
            marginTop: 20,
          }}>
          Openning Tours
        </Text>
        <Text body2 style={{marginBottom: 10, marginLeft: 20}}>
          Let find out what most interesting things
        </Text>
        <FlatList
          contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={tours}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <TourItem
              grid
              style={[styles.tourItem, {marginLeft: 15}]}
              onPress={() => {
                navigation.navigate('TourDetail');
              }}
              image={item.image}
              name={item.name}
              location={item.location}
              travelTime={item.location}
              startTime={item.startTime}
              price={item.price}
              rate={item.rate}
              rateCount={item.rateCount}
              numReviews={item.numReviews}
              author={item.author}
              services={item.services}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}

/**
 * @description Show when tab Tour activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function TourTab({navigation}) {
  return (
    <ScrollView>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text headline semibold>
            Gallery
          </Text>
          <Text footnote grayColor>
            Show more
          </Text>
        </View>
        <View style={styles.contentImageGird}>
          <View style={{flex: 4, marginRight: 10}}>
            <Card image={Images.trip7}>
              <Text headline semibold whiteColor>
                Dallas
              </Text>
            </Card>
          </View>
          <View style={{flex: 6}}>
            <View style={{flex: 1}}>
              <Card image={Images.trip3}>
                <Text headline semibold whiteColor>
                  Warsaw
                </Text>
              </Card>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <View style={{flex: 6, marginRight: 10}}>
                <Card image={Images.trip4}>
                  <Text headline semibold whiteColor>
                    Yokohama
                  </Text>
                </Card>
              </View>
              <View style={{flex: 4}}>
                <Card image={Images.trip6}>
                  <Text headline semibold whiteColor>
                    10+
                  </Text>
                </Card>
              </View>
            </View>
          </View>
        </View>
        <Text headline semibold style={{marginTop: 20}}>
          Day 1: London - Somme - Paris
        </Text>
        <Image
          source={Images.room2}
          style={{height: 120, width: '100%', marginTop: 10}}
        />
        <Text body2 style={{marginTop: 10}}>
          Other hygienic practices that the new hotel — which handles, among
          other guests, patients seeking medical treatment at the Texas Medical
          Center — include removing nonessential items like decorative pillows
          and magazines
        </Text>
        <Text body2 style={{marginTop: 10}}>
          Other hygienic practices that the new hotel — which handles, among
          other guests, patients seeking medical treatment at the Texas Medical
          Center — include removing nonessential items like decorative pillows
          and magazines
        </Text>
        <Text body2 style={{marginTop: 10}}>
          Other hygienic practices that the new hotel — which handles, among
          other guests, patients seeking medical treatment at the Texas Medical
          Center — include removing nonessential items like decorative pillows
          and magazines
        </Text>
        <Text headline semibold style={{marginTop: 20}}>
          Day 2: Paris - Burgundy - Swiss Alps
        </Text>
        <Image
          source={Images.room3}
          style={{height: 120, width: '100%', marginTop: 10}}
        />
        <Text body2 style={{marginTop: 10}}>
          Other hygienic practices that the new hotel — which handles, among
          other guests, patients seeking medical treatment at the Texas Medical
          Center — include removing nonessential items like decorative pillows
          and magazines
        </Text>
        <Text body2 style={{marginTop: 10}}>
          Other hygienic practices that the new hotel — which handles, among
          other guests, patients seeking medical treatment at the Texas Medical
          Center — include removing nonessential items like decorative pillows
          and magazines
        </Text>
        <Text body2 style={{marginTop: 10}}>
          Other hygienic practices that the new hotel — which handles, among
          other guests, patients seeking medical treatment at the Texas Medical
          Center — include removing nonessential items like decorative pillows
          and magazines
        </Text>
        <Text headline semibold style={{marginTop: 20}}>
          Day 3: Swiss Alps - Strasbourg - Heidel…
        </Text>
        <Image
          source={Images.room4}
          style={{height: 120, width: '100%', marginTop: 10}}
        />
        <Text body2 style={{marginTop: 10}}>
          Other hygienic practices that the new hotel — which handles, among
          other guests, patients seeking medical treatment at the Texas Medical
          Center — include removing nonessential items like decorative pillows
          and magazines
        </Text>
        <Text body2 style={{marginTop: 10}}>
          Other hygienic practices that the new hotel — which handles, among
          other guests, patients seeking medical treatment at the Texas Medical
          Center — include removing nonessential items like decorative pillows
          and magazines
        </Text>
        <Text body2 style={{marginTop: 10}}>
          Other hygienic practices that the new hotel — which handles, among
          other guests, patients seeking medical treatment at the Texas Medical
          Center — include removing nonessential items like decorative pillows
          and magazines
        </Text>
      </View>
    </ScrollView>
  );
}

/**
 * @description Show when tab Package activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function PackageTab({navigation}) {
  const [packageItem] = useState(PackageData[0]);
  const [packageItem2] = useState(PackageData[2]);

  return (
    <ScrollView>
      <View style={{paddingHorizontal: 20}}>
        <Text body2 style={{marginTop: 20}}>
          Europe welcomes millions of travelers every year. With Expat Explore
          you can see all that Europe has to offer. Take the time to explore
          small villages and big cities. There's lots to choose from in over 50
          independent states. Our Europe multi-country tours are some of the
          best packages. We offer you great prices, quality and convenience. Get
          ready for the best European vacation! Europe has a list of possible
          adventures for everyone.{' '}
        </Text>
        <PackageItem
          packageName={packageItem.packageName}
          price={packageItem.price}
          type={packageItem.type}
          description={packageItem.description}
          services={packageItem.services}
          onPressIcon={() => {
            navigation.navigate('PricingTable');
          }}
          onPress={() => {
            navigation.navigate('PreviewBooking');
          }}
          style={{marginBottom: 10, marginTop: 20}}
        />
        <PackageItem
          detail
          packageName={packageItem2.packageName}
          price={packageItem2.price}
          type={packageItem2.type}
          description={packageItem2.description}
          services={packageItem2.services}
        />
      </View>
    </ScrollView>
  );
}

/**
 * @description Show when tab Review activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function ReviewTab({navigation}) {
  const [refreshing] = useState(false);
  const [rateDetail] = useState({
    point: 4.7,
    maxPoint: 5,
    totalRating: 25,
    data: ['80%', '10%', '10%', '0%', '0%'],
  });
  const [reviewList] = useState(ReviewData);
  const {colors} = useTheme();

  return (
    <FlatList
      contentContainerStyle={{padding: 20}}
      refreshControl={
        <RefreshControl
          colors={[colors.primary]}
          tintColor={colors.primary}
          refreshing={refreshing}
          onRefresh={() => {}}
        />
      }
      data={reviewList}
      keyExtractor={(item, index) => item.id}
      ListHeaderComponent={() => (
        <RateDetail
          point={rateDetail.point}
          maxPoint={rateDetail.maxPoint}
          totalRating={rateDetail.totalRating}
          data={rateDetail.data}
        />
      )}
      renderItem={({item}) => (
        <CommentItem
          style={{marginTop: 10}}
          image={item.source}
          name={item.name}
          rate={item.rate}
          date={item.date}
          title={item.title}
          comment={item.comment}
        />
      )}
    />
  );
}
