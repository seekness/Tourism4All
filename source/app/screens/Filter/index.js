import React, {useContext, useEffect, useRef, useState} from 'react';
import moment from 'moment';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import {
  Application,
  BottomSheetPicker,
  BottomSheetView,
  Button,
  Chip,
  Divider,
  Icon,
  ScreenContainer,
  SizedBox,
  Slider,
  Text,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {settingSelect} from '@selectors';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {categoryActions} from '@actions';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const setting = useSelector(settingSelect);
  const countryRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const startTimePickerRef = useRef();
  const endTimePickerRef = useRef();
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([
    ...route.params?.filter?.categories,
  ]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [features, setFeatures] = useState([...route.params?.filter?.features]);
  const [country, setCountry] = useState(route.params?.filter?.country);
  const [cityData, setCityData] = useState(null);
  const [city, setCity] = useState(route.params?.filter?.city);
  const [stateData, setStateData] = useState(null);
  const [state, setState] = useState(route.params?.filter?.state);
  const [distance, setDistance] = useState(route.params?.filter?.distance ?? 0);
  const [minPrice, setMinPrice] = useState(route.params?.filter?.minPrice ?? 0);
  const [maxPrice, setMaxPrice] = useState(route.params?.filter?.maxPrice ?? 0);
  const [color, setColor] = useState(route.params?.filter?.color);
  const [startHour, setStartHour] = useState(
    route.params?.filter?.startHour ?? '08:00',
  );
  const [endHour, setEndHour] = useState(
    route.params?.filter?.endHour ?? '18:00',
  );
  const [tempHour, setTempHour] = useState('00:00');

  useEffect(() => {
    if (route.params?.filter?.country) {
      dispatch(
        categoryActions.onLoadLocation(
          route.params?.filter?.country,
          ({data, success}) => {
            if (success) {
              setCityData(data);
            }
          },
        ),
      );
    }
  }, [dispatch, route.params]);

  /**
   * on apply filter
   */
  const onApply = () => {
    route.params?.filter?.update?.({
      categories,
      features,
      country,
      city,
      state,
      distance,
      minPrice,
      maxPrice,
      color,
      startHour,
      endHour,
    });
    route.params?.onApply();
    navigation.goBack();
  };

  /**
   * on click category
   * @param item
   */
  const onSelectCategory = item => {
    if (categories.some(i => i.id === item.id)) {
      const result = categories.filter(i => {
        return i.id !== item.id;
      });
      setCategories(result);
    } else {
      categories.push(item);
      setCategories([...categories]);
    }
  };

  /**
   * on click facilities
   * @param item
   */
  const onSelectFacilities = item => {
    if (features.some(i => i.id === item.id)) {
      const result = features.filter(i => {
        return i.id !== item.id;
      });
      setFeatures(result);
    } else {
      features.push(item);
      setFeatures([...features]);
    }
  };

  /**
   * on change country
   * @param item
   */
  const onChangeCountry = item => {
    setCountry(item);
    setCityData(null);
    setCity(null);
    setStateData(null);
    setState(null);
    dispatch(
      categoryActions.onLoadLocation(item, ({data, success}) => {
        if (success) {
          setCityData(data);
        }
      }),
    );
  };

  /**
   * on change city
   * @param item
   */
  const onChangeCity = item => {
    setCity(item);
    setStateData(null);
    setState(null);
    dispatch(
      categoryActions.onLoadLocation(item, ({data, success}) => {
        if (success) {
          setStateData(data);
        }
      }),
    );
  };

  /**
   * on change state
   * @param item
   */
  const onChangeState = item => {
    setState(item);
  };

  /**
   * render bottom sheet select country
   * @returns {JSX.Element}
   */
  const renderSelectCountry = () => {
    return (
      <BottomSheetPicker
        ref={countryRef}
        title={t('country')}
        onSelect={onChangeCountry}
        selected={country}
        data={setting.locations?.map?.(item => {
          return {...item, value: item.id};
        })}
      />
    );
  };

  /**
   * render bottom sheet select city
   * @returns {JSX.Element}
   */
  const renderSelectCity = () => {
    return (
      <BottomSheetPicker
        ref={cityRef}
        title={t('city')}
        onSelect={onChangeCity}
        selected={city}
        data={cityData?.map?.(item => {
          return {...item, value: item.id};
        })}
      />
    );
  };

  /**
   * render bottom sheet select state
   * @returns {JSX.Element}
   */
  const renderSelectState = () => {
    return (
      <BottomSheetPicker
        ref={stateRef}
        title={t('state')}
        onSelect={onChangeState}
        selected={state}
        data={stateData?.map?.(item => {
          return {...item, value: item.id};
        })}
      />
    );
  };

  /**
   * render bottom sheet select time
   * @returns {JSX.Element}
   */
  const renderSelectStartTime = () => {
    return (
      <BottomSheetView ref={startTimePickerRef}>
        <View style={Styles.padding8}>
          <View style={Styles.rowSpace}>
            <SizedBox />
            <Button
              onPress={() => {
                startTimePickerRef.current?.dismiss();
                setStartHour(tempHour);
              }}
              type="text"
              full={false}
              size="small"
              textStyle={{color: theme.colors.primary}}>
              {t('apply')}
            </Button>
          </View>
          <DateTimePicker
            mode="time"
            value={moment(tempHour, 'HH:mm').toDate()}
            display="spinner"
            onChange={(event, date) => {
              setTempHour(moment(date).format('HH:mm'));
            }}
          />
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render bottom sheet select time
   * @returns {JSX.Element}
   */
  const renderSelectEndTime = () => {
    return (
      <BottomSheetView ref={endTimePickerRef}>
        <View style={Styles.padding8}>
          <View style={Styles.rowSpace}>
            <SizedBox />
            <Button
              onPress={() => {
                endTimePickerRef.current?.dismiss();
                setEndHour(tempHour);
              }}
              type="text"
              full={false}
              size="small"
              textStyle={{color: theme.colors.primary}}>
              {t('apply')}
            </Button>
          </View>
          <DateTimePicker
            mode="time"
            value={moment(tempHour, 'HH:mm').toDate()}
            display="spinner"
            onChange={(event, date) => {
              setTempHour(moment(date).format('HH:mm'));
            }}
          />
        </View>
      </BottomSheetView>
    );
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
      {renderSelectCountry()}
      {renderSelectCity()}
      {renderSelectState()}
      {renderSelectStartTime()}
      {renderSelectEndTime()}
      <ScrollView
        style={Styles.flex}
        scrollEnabled={scrollEnabled}
        contentContainerStyle={Styles.paddingVertical16}>
        <Text typography="h4" weight="bold" style={Styles.paddingHorizontal16}>
          {t('category')}
        </Text>
        <View style={styles.selectionContent}>
          {setting.categories.map?.((item, index) => {
            return (
              <View style={Styles.padding4} key={item.id}>
                <Chip
                  selected={categories.some(i => i.id === item.id)}
                  onPress={() => onSelectCategory(item, index)}>
                  {item.title}
                </Chip>
              </View>
            );
          })}
        </View>
        <SizedBox height={8} />
        <Text typography="h4" weight="bold" style={Styles.paddingHorizontal16}>
          {t('facilities')}
        </Text>
        <View style={styles.selectionContent}>
          {setting.features.map?.(item => {
            return (
              <View style={Styles.padding4} key={item.id}>
                <Chip
                  selected={features.some(i => i.id === item.id)}
                  onPress={() => onSelectFacilities(item)}>
                  {item.title}
                </Chip>
              </View>
            );
          })}
        </View>
        <SizedBox height={8} />
        <TouchableOpacity
          style={styles.locationContent}
          onPress={() => countryRef.current?.present?.()}>
          <View>
            <Text typography="h4" weight="bold">
              {t('country')}
            </Text>
            <SizedBox height={4} />
            <Text
              typography="subtitle"
              type="secondary"
              color={country?.title && 'primary'}>
              {country?.title ?? t('select_country')}
            </Text>
          </View>
          <Icon name="chevron-right" />
        </TouchableOpacity>
        {country && (
          <>
            <SizedBox height={12} />
            <TouchableOpacity
              style={styles.locationContent}
              onPress={() => cityRef.current?.present?.()}>
              <View>
                <Text typography="h4" weight="bold">
                  {t('city')}
                </Text>
                <SizedBox height={4} />
                <Text
                  typography="subtitle"
                  type="secondary"
                  color={city?.title && 'primary'}>
                  {city?.title ?? t('select_city')}
                </Text>
              </View>
              {cityData ? (
                <Icon name="chevron-right" />
              ) : (
                <ActivityIndicator size="small" color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          </>
        )}
        {city && (
          <>
            <SizedBox height={12} />
            <TouchableOpacity
              style={styles.locationContent}
              onPress={() => stateRef.current?.present?.()}>
              <View>
                <Text typography="h4" weight="bold">
                  {t('state')}
                </Text>
                <SizedBox height={4} />
                <Text
                  typography="subtitle"
                  type="secondary"
                  color={state?.title && 'primary'}>
                  {state?.title ?? t('select_state')}
                </Text>
              </View>
              {stateData ? (
                <Icon name="chevron-right" />
              ) : (
                <ActivityIndicator size="small" color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          </>
        )}
        <SizedBox height={16} />
        <View style={Styles.paddingHorizontal16}>
          <Text typography="h4" weight="bold">
            {t('distance')}
          </Text>
          <SizedBox height={4} />
          <View style={Styles.rowSpace}>
            <Text typography="subtitle" type="secondary">
              0 km
            </Text>
            <Text typography="subtitle" type="secondary">
              100 km
            </Text>
          </View>
        </View>
        <View style={styles.sliderContent}>
          <Slider
            min={0}
            max={100}
            low={distance}
            color={theme.colors.border}
            selectionColor={theme.colors.primary}
            disableRange={true}
            onTouchStart={() => setScrollEnabled(false)}
            onTouchEnd={() => setScrollEnabled(true)}
            onValueChanged={low => {
              setDistance(low);
            }}
            style={styles.slider}
          />
        </View>
        <SizedBox height={12} />
        <View style={Styles.paddingHorizontal16}>
          <Text typography="h4" weight="bold">
            {t('avg_price')}
          </Text>
          <SizedBox height={4} />
          <View style={Styles.rowSpace}>
            <Text typography="subtitle" type="secondary">
              0 {setting.unit}
            </Text>
            <Text typography="subtitle" type="secondary">
              100 {setting.unit}
            </Text>
          </View>
        </View>
        <View style={styles.sliderContent}>
          <Slider
            min={0}
            max={100}
            low={minPrice}
            high={maxPrice}
            color={theme.colors.border}
            selectionColor={theme.colors.primary}
            onTouchStart={() => setScrollEnabled(false)}
            onTouchEnd={() => setScrollEnabled(true)}
            onValueChanged={(low, high) => {
              setMinPrice(low);
              setMaxPrice(high);
            }}
            style={styles.slider}
          />
        </View>
        <View style={[Styles.paddingHorizontal16, Styles.paddingVertical8]}>
          <Text typography="h4" weight="bold">
            {t('business_color')}
          </Text>
          <SizedBox height={8} />
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={setting.color ?? []}
            renderItem={({item}) => {
              let children;
              if (item === color) {
                children = <Icon name="check" color="white" />;
              }
              return (
                <TouchableOpacity
                  style={[styles.colorItem, {backgroundColor: item}]}
                  onPress={() => setColor(item)}>
                  {children}
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item}
          />
          <SizedBox height={12} />
          <Text typography="h4" weight="bold">
            {t('open_time')}
          </Text>
          <SizedBox height={8} />
          <View
            style={[
              styles.timeContent,
              {
                backgroundColor: theme.colors.border,
              },
            ]}>
            <TouchableOpacity
              style={Styles.flex}
              onPress={() => {
                if (Platform.OS === 'android') {
                  DateTimePickerAndroid.open({
                    mode: 'time',
                    value: moment(startHour, 'HH:mm').toDate(),
                    onChange: (event, date) => {
                      if (event.type === 'set') {
                        setStartHour(moment(date).format('HH:mm'));
                      }
                    },
                  });
                } else {
                  setTempHour(startHour);
                  startTimePickerRef.current?.present();
                }
              }}>
              <Text typography="title">{t('start_time')}</Text>
              <SizedBox height={4} />
              <Text typography="subtitle">{startHour}</Text>
            </TouchableOpacity>
            <Divider direction="vertical" color={theme.colors.textSecondary} />
            <SizedBox width={16} />
            <TouchableOpacity
              style={Styles.flex}
              onPress={() => {
                if (Platform.OS === 'android') {
                  DateTimePickerAndroid.open({
                    mode: 'time',
                    value: moment(endHour, 'HH:mm').toDate(),
                    onChange: (event, date) => {
                      if (event.type === 'set') {
                        setEndHour(moment(date).format('HH:mm'));
                      }
                    },
                  });
                } else {
                  setTempHour(endHour);
                  endTimePickerRef.current?.present();
                }
              }}>
              <Text typography="title">{t('end_time')}</Text>
              <SizedBox height={4} />
              <Text typography="subtitle">{endHour}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
