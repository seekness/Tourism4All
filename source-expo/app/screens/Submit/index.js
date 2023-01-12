import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Application,
  BottomSheetPicker,
  BottomSheetView,
  Button,
  Divider,
  Icon,
  Image,
  ImagePicker,
  InputPicker,
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
  Toast,
  UploadImage,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {categoryActions, listingActions} from '@actions';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {convertIcon, validate} from '@utils';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import moment from 'moment/moment';
import {settingSelect} from '@selectors';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const dispatch = useDispatch();
  const settingListing = useSelector(settingSelect);
  const titleRef = useRef();
  const contentRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const addressRef = useRef();
  const zipcodeRef = useRef();
  const phoneRef = useRef();
  const faxRef = useRef();
  const emailRef = useRef();
  const websiteRef = useRef();
  const statusRef = useRef();
  const datePickerRef = useRef();
  const bookingStyleRef = useRef();
  const priceRef = useRef();
  const priceMinRef = useRef();
  const priceMaxRef = useRef();

  const [featureImage, setFeatureImage] = useState();
  const [galleryImages, setGalleryImages] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState();
  const [facilities, setFacilities] = useState();
  const [tags, setTags] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [stateList, setStateList] = useState([]);
  const [city, setCity] = useState();
  const [cityList, setCityList] = useState([]);
  const [location, setLocation] = useState();
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');
  const [fax, setFax] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [color, setColor] = useState(theme.colors.primary);
  const [icon, setIcon] = useState();
  const [status, setStatus] = useState('');
  const [dateEstablish, setDateEstablish] = useState();
  const [dateEstablishTemp, setDateEstablishTemp] = useState();
  const [bookingStyle, setBookingStyle] = useState();
  const [price, setPrice] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [openTime, setOpenTime] = useState();
  const [social, setSocial] = useState();

  const [settingForm, setSettingForm] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    dispatch(
      listingActions.initSubmit(
        route.params?.item,
        ({success, setting, product}) => {
          if (success) {
            setSettingForm(setting);
            setFeatureImage(product.image);
            setGalleryImages(product.galleries);
            setTitle(product.title);
            setContent(product.description);
            setCategories([product.category]);
            setFacilities(product.features);
            setTags(product.tags.map(item => item.title));
            setCountry(product.country);
            setState(product.state);
            setCity(product.city);
            setLocation(product.location);
            setAddress(product.address);
            setZipcode(product.zipCode);
            setPhone(product.phone);
            setFax(product.fax);
            setEmail(product.email);
            setWebsite(product.website);
            setColor(product.color);
            setIcon(product.icon);
            setStatus(product.status);
            setDateEstablish(moment(product.dateEstablish));
            setPrice(product.price);
            setPriceMin(product.priceMin?.replace(/[^0-9]/g, ''));
            setPriceMax(product.priceMax?.replace(/[^0-9]/g, ''));
            setOpenTime(product.openHours);
            setSocial(product.socials);
            setBookingStyle({
              title: t(product.bookingStyle),
              value: product.bookingStyle,
            });
          }
        },
      ),
    );
  }, [dispatch, route.params, t]);

  /**
   * on submit add/edit
   */
  const onSubmit = () => {
    const valid = onValidateForm();
    if (valid) {
      dispatch(
        listingActions.onSubmit(
          {
            id: route.params?.item?.id,
            featureImage,
            galleryImages,
            title,
            content,
            categories,
            facilities,
            tags,
            country,
            state,
            city,
            location,
            address,
            zipcode,
            phone,
            fax,
            email,
            website,
            color,
            icon,
            status,
            dateEstablish,
            price,
            priceMin,
            priceMax,
            openTime,
            social,
            bookingStyle,
          },
          ({success}) => {
            if (success) {
              navigation.replace('SubmitResult');
            }
          },
        ),
      );
    }
  };

  /**
   * on validate form
   */
  const onValidateForm = () => {
    const validInput = {
      title: validate(title, {empty: false}),
      content: validate(content, {empty: false}),
      address: validate(address, {empty: false}),
      zipcode: validate(zipcode, {empty: false, number: true}),
      phone: validate(phone, {empty: false, number: true}),
      fax: validate(fax, {empty: false, number: true}),
      email: validate(email, {empty: false, email: true}),
      website: validate(website, {empty: false}),
      status: validate(status, {empty: false}),
      price: validate(price, {empty: false, number: true}),
      priceMin: validate(priceMin, {empty: false, number: true}),
      priceMax: validate(priceMax, {empty: false, number: true}),
    };
    setError(validInput);
    const inputSuccess = Object.values(validInput).some(
      item => typeof item !== undefined,
    );
    if (!inputSuccess) {
      return false;
    }
    if (!featureImage) {
      Toast.show(t('feature_image_require'));
      return false;
    }
    if (categories?.length === 0) {
      Toast.show(t('category_require'));
      return false;
    }
    if (facilities?.length === 0) {
      Toast.show(t('facilities_require'));
      return false;
    }
    if (!country) {
      Toast.show(t('country_require'));
      return false;
    }

    return true;
  };

  /**
   * on gallery upload
   */
  const onGalleryUpload = () => {
    navigation.navigate('GalleryUpload', {
      item: galleryImages,
      onResult: setGalleryImages,
    });
  };

  /**
   * on select category
   */
  const onSelectCategory = () => {
    navigation.navigate('Picker', {
      title: t('select_category'),
      item: categories,
      data: settingForm?.categories,
      multiple: true,
      onResult: setCategories,
    });
  };

  /**
   * on select facilities
   */
  const onSelectFacilities = () => {
    navigation.navigate('Picker', {
      title: t('select_facilities'),
      item: facilities,
      data: settingForm?.features,
      multiple: true,
      onResult: setFacilities,
    });
  };

  /**
   * on select tags
   */
  const onSelectTags = () => {
    navigation.navigate('PickerTags', {
      title: t('select_tags'),
      item: tags,
      onResult: setTags,
    });
  };

  /**
   * on select country
   */
  const onSelectCountry = item => {
    setState(null);
    setStateList(null);
    setCity(null);
    setCityList(null);
    dispatch(
      categoryActions.onLoadLocation(item, ({data, success}) => {
        if (success) {
          setStateList(data);
        }
      }),
    );
  };

  /**
   * on select state
   */
  const onSelectState = item => {
    setCity(null);
    setCityList(null);
    dispatch(
      categoryActions.onLoadLocation(item, ({data, success}) => {
        if (success) {
          setCityList(data);
        }
      }),
    );
  };

  /**
   * on change gps location
   */
  const onChangeLocation = () => {
    navigation.navigate('PickerLocation', {
      editable: true,
      item: location,
      onResult: setLocation,
    });
  };

  /**
   * on change color
   */
  const onChangeColor = () => {
    navigation.navigate('PickerColor', {
      item: color,
      onResult: setColor,
    });
  };

  /**
   * on change color
   */
  const onChangeIcon = () => {
    navigation.navigate('PickerIcon', {
      item: icon,
      onResult: setIcon,
    });
  };

  /**
   * on change open time
   */
  const onChangeOpenTime = () => {
    navigation.navigate('OpenTime', {
      item: openTime,
      onResult: setOpenTime,
    });
  };

  /**
   * on change social
   */
  const onChangeSocial = () => {
    navigation.navigate('Social', {
      item: social,
      onResult: setSocial,
    });
  };

  /**
   * render gallery
   * @returns {JSX.Element}
   */
  const renderGallery = () => {
    const uri = galleryImages?.[0]?.thumb;
    let image = (
      <View style={[styles.iconAdd, {backgroundColor: theme.colors.primary}]}>
        <Icon name="plus" color="white" />
      </View>
    );
    if (uri) {
      image = <Image source={{uri}} style={styles.galleryImage} />;
    }
    return (
      <TouchableOpacity
        image={{uri: galleryImages?.[0]?.thumb}}
        onPress={onGalleryUpload}
        style={[
          styles.galleryImageContainer,
          {borderColor: theme.colors.primary},
        ]}>
        {image}
        {galleryImages?.length > 1 && (
          <View
            style={[
              styles.badgeIcon,
              {
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.border,
              },
            ]}>
            <Text typography="caption" weight="bold" color="white">
              {galleryImages?.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  /**
   * render select country
   * @returns {JSX.Element}
   */
  const renderSelectCountry = () => {
    let selected;
    if (country) {
      selected = {
        title: country?.title,
        value: country?.id,
      };
    }
    return (
      <BottomSheetPicker
        ref={countryRef}
        title={t('select_country')}
        onSelect={item => {
          setCountry(item.data);
          onSelectCountry(item.data);
        }}
        selected={selected}
        data={settingForm?.countries?.map(item => {
          return {title: item.title, value: item.id, data: item};
        })}
      />
    );
  };

  /**
   * render select state
   * @returns {JSX.Element}
   */
  const renderSelectState = () => {
    let selected;
    if (state) {
      selected = {
        title: state?.title,
        value: state?.id,
      };
    }
    return (
      <BottomSheetPicker
        ref={stateRef}
        title={t('select_state')}
        onSelect={item => {
          setState(item.data);
          onSelectState(item.data);
        }}
        selected={selected}
        data={stateList?.map(item => {
          return {title: item.title, value: item.id, data: item};
        })}
      />
    );
  };

  /**
   * render select city
   * @returns {JSX.Element}
   */
  const renderSelectCity = () => {
    let selected;
    if (city) {
      selected = {
        title: city?.title,
        value: city?.id,
      };
    }
    return (
      <BottomSheetPicker
        ref={cityRef}
        title={t('select_city')}
        onSelect={item => {
          setCity(item.data);
        }}
        selected={selected}
        data={cityList?.map(item => {
          return {title: item.title, value: item.id, data: item};
        })}
      />
    );
  };

  /**
   * render bottom sheet select date
   * @returns {JSX.Element}
   */
  const renderSelectDate = () => {
    return (
      <BottomSheetView ref={datePickerRef}>
        <View style={Styles.padding8}>
          <View style={Styles.rowSpace}>
            <SizedBox />
            <Button
              onPress={() => {
                datePickerRef.current?.dismiss();
                setDateEstablish(dateEstablishTemp);
              }}
              type="text"
              full={false}
              size="small"
              textStyle={{color: theme.colors.primary}}>
              {t('apply')}
            </Button>
          </View>
          <DateTimePicker
            mode="date"
            display="spinner"
            value={dateEstablishTemp?.toDate() ?? new Date()}
            onChange={(event, date) => {
              setDateEstablishTemp(moment(date));
            }}
          />
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render select booking style
   * @returns {JSX.Element}
   */
  const renderSelectBookingStyle = () => {
    return (
      <BottomSheetPicker
        ref={bookingStyleRef}
        title={t('select_booking_style')}
        onSelect={item => setBookingStyle(item)}
        selected={bookingStyle}
        data={[
          {title: t('daily'), value: 'daily'},
          {title: t('hourly'), value: 'hourly'},
          {title: t('slot'), value: 'slot'},
          {title: t('standard'), value: 'standard'},
          {title: t('table'), value: 'table'},
        ]}
      />
    );
  };

  return (
    <ScreenContainer
      navigation={navigation}
      enableKeyboardAvoidingView={true}
      options={{
        headerRight: () => {
          return (
            <View style={Styles.nativeRightButton}>
              <Button
                type="text"
                size="small"
                full={false}
                onPress={onSubmit}
                textStyle={{color: theme.colors.primary}}>
                {route.params?.item ? t('update') : t('add')}
              </Button>
            </View>
          );
        },
      }}>
      {renderSelectCountry()}
      {renderSelectState()}
      {renderSelectCity()}
      {renderSelectDate()}
      {renderSelectBookingStyle()}
      <ScrollView
        style={Styles.flex}
        contentContainerStyle={[
          Styles.padding16,
          {backgroundColor: theme.colors.card},
        ]}>
        <UploadImage onCompleted={setFeatureImage}>
          {({percent, uri, processing, upload}) => {
            return (
              <ImagePicker
                image={{uri: uri ?? featureImage?.full}}
                percent={percent}
                processing={processing}
                indicator="line"
                onResult={upload}
                style={styles.featureImage}
              />
            );
          }}
        </UploadImage>
        <SizedBox height={16} />
        {renderGallery()}
        <SizedBox height={20} />
        <TextInput
          ref={titleRef}
          defaultValue={title}
          label={t('title')}
          placeholder={t('input_title')}
          onChangeText={value => {
            const valid = validate(value, {empty: false});
            setTitle(value);
            setError({...error, title: valid});
          }}
          onFocus={() => {
            setError({...error, title: null});
          }}
          onSubmitEditing={() => contentRef.current?.focus()}
          error={t(error?.title)}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={contentRef}
          defaultValue={content}
          label={t('content')}
          placeholder={t('input_content')}
          numberOfLines={5}
          onChangeText={value => {
            const valid = validate(value, {empty: false});
            setContent(value);
            setError({...error, content: valid});
          }}
          onFocus={() => {
            setError({...error, content: null});
          }}
          error={t(error?.content)}
          size="small"
        />
        <SizedBox height={16} />
        <InputPicker
          label={t('category')}
          value={categories?.map?.(item => item.title).join(', ')}
          placeholder={t('select_category')}
          onPress={onSelectCategory}
        />
        <SizedBox height={16} />
        <InputPicker
          label={t('facilities')}
          value={facilities?.map?.(item => item.title).join(', ')}
          placeholder={t('select_facilities')}
          onPress={onSelectFacilities}
        />
        <SizedBox height={16} />
        <InputPicker
          label={t('tags')}
          value={tags?.join(', ')}
          placeholder={t('select_tags')}
          onPress={onSelectTags}
        />
        <SizedBox height={20} />
        <Divider />
        <SizedBox height={20} />
        <InputPicker
          label={t('country')}
          value={country?.title}
          placeholder={t('select_country')}
          onPress={() => countryRef.current?.present()}
        />
        <SizedBox height={16} />
        <View style={Styles.row}>
          <InputPicker
            label={t('state')}
            value={state?.title}
            placeholder={t('select_state')}
            style={Styles.flex}
            trailing={
              stateList == null ? (
                <ActivityIndicator size={14} color={theme.colors.primary} />
              ) : null
            }
            onPress={() => {
              if (stateList?.length > 0) {
                stateRef.current?.present();
              }
            }}
          />
          <SizedBox width={16} />
          <InputPicker
            label={t('city')}
            value={city?.title}
            placeholder={t('select_city')}
            style={Styles.flex}
            trailing={
              stateList == null ? (
                <ActivityIndicator size={14} color={theme.colors.primary} />
              ) : null
            }
            onPress={() => {
              if (cityList?.length > 0) {
                cityRef.current?.present();
              }
            }}
          />
        </View>
        <SizedBox height={20} />
        <Divider />
        <SizedBox height={20} />
        <InputPicker
          label={t('gps_location')}
          value={location?.view}
          placeholder={t('choose_gps_location')}
          onPress={onChangeLocation}
        />
        <SizedBox height={16} />
        <TextInput
          ref={addressRef}
          defaultValue={address}
          label={t('address')}
          placeholder={t('input_address')}
          onChangeText={value => {
            const valid = validate(value, {empty: false});
            setAddress(value);
            setError({...error, address: valid});
          }}
          onFocus={() => {
            setError({...error, address: null});
          }}
          onSubmitEditing={() => zipcodeRef.current?.focus()}
          error={t(error?.address)}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={zipcodeRef}
          defaultValue={zipcode}
          label={t('zipcode')}
          placeholder={t('input_zipcode')}
          onChangeText={value => {
            const valid = validate(value, {empty: false, number: true});
            setZipcode(value);
            setError({...error, zipcode: valid});
          }}
          onFocus={() => {
            setError({...error, zipcode: null});
          }}
          onSubmitEditing={() => phoneRef.current?.focus()}
          error={t(error?.zipcode)}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={phoneRef}
          defaultValue={phone}
          label={t('phone')}
          placeholder={t('input_phone')}
          onChangeText={value => {
            const valid = validate(value, {empty: false, number: true});
            setPhone(value);
            setError({...error, phone: valid});
          }}
          onFocus={() => {
            setError({...error, phone: null});
          }}
          onSubmitEditing={() => faxRef.current?.focus()}
          error={t(error?.phone)}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={faxRef}
          defaultValue={fax}
          label={t('fax')}
          placeholder={t('input_fax')}
          onChangeText={value => {
            const valid = validate(value, {empty: false, number: true});
            setFax(value);
            setError({...error, fax: valid});
          }}
          onFocus={() => {
            setError({...error, fax: null});
          }}
          onSubmitEditing={() => emailRef.current?.focus()}
          error={t(error?.fax)}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={emailRef}
          defaultValue={email}
          label={t('email')}
          placeholder={t('input_email')}
          onChangeText={value => {
            const valid = validate(value, {empty: false, email: true});
            setEmail(value);
            setError({...error, email: valid});
          }}
          onFocus={() => {
            setError({...error, email: null});
          }}
          onSubmitEditing={() => websiteRef.current?.focus()}
          error={t(error?.email)}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={websiteRef}
          defaultValue={website}
          label={t('website')}
          placeholder={t('input_website')}
          onChangeText={value => {
            const valid = validate(value, {empty: false});
            setWebsite(value);
            setError({...error, website: valid});
          }}
          onFocus={() => {
            setError({...error, website: null});
          }}
          error={t(error?.website)}
          size="small"
        />
        <SizedBox height={20} />
        <Divider />
        <SizedBox height={20} />
        <View style={Styles.row}>
          <InputPicker
            label={t('color')}
            value={color}
            leading={
              <View style={[styles.iconColor, {backgroundColor: color}]} />
            }
            placeholder={t('select_color')}
            style={Styles.flex}
            onPress={onChangeColor}
          />
          <SizedBox width={16} />
          <InputPicker
            leading={
              icon && (
                <Icon {...convertIcon(icon)} size={16} type="FontAwesome5" />
              )
            }
            label={t('icon')}
            value={icon}
            placeholder={t('select_icon')}
            onPress={onChangeIcon}
            style={Styles.flex}
          />
        </View>
        <SizedBox height={16} />
        <TextInput
          ref={statusRef}
          defaultValue={status}
          label={t('status')}
          placeholder={t('input_status')}
          onChangeText={value => {
            const valid = validate(value, {empty: false});
            setStatus(value);
            setError({...error, status: valid});
          }}
          onFocus={() => {
            setError({...error, status: null});
          }}
          error={t(error?.status)}
          size="small"
        />
        <SizedBox height={16} />
        <InputPicker
          label={t('date')}
          value={dateEstablish?.format('YYYY-MM-DD')}
          leading={<Icon name="calendar-outline" size={24} />}
          placeholder={t('select_date')}
          onPress={() => {
            if (Platform.OS === 'android') {
              DateTimePickerAndroid.open({
                mode: 'date',
                value: dateEstablishTemp?.toDate() ?? new Date(),
                onChange: (event, date) => {
                  if (event.type === 'set') {
                    setDateEstablish(moment(date));
                  }
                },
              });
            } else {
              setDateEstablishTemp(dateEstablish);
              datePickerRef.current?.present();
            }
          }}
        />
        <SizedBox height={16} />
        <View style={styles.rowPrice}>
          <TextInput
            ref={priceMinRef}
            defaultValue={priceMin}
            label={t('price_min')}
            placeholder={t('min')}
            onChangeText={value => {
              const valid = validate(value, {empty: false, number: true});
              setPriceMin(value);
              setError({...error, priceMin: valid});
            }}
            onFocus={() => {
              setError({...error, priceMin: null});
            }}
            trailing={<Text typography="subtitle">{settingListing.unit}</Text>}
            error={t(error?.priceMin)}
            size="small"
            style={Styles.flex}
          />
          <SizedBox width={16} />
          <TextInput
            ref={priceMaxRef}
            defaultValue={priceMax}
            label={t('price_max')}
            placeholder={t('max')}
            onChangeText={value => {
              const valid = validate(value, {empty: false, number: true});
              setPriceMax(value);
              setError({...error, priceMax: valid});
            }}
            onFocus={() => {
              setError({...error, priceMax: null});
            }}
            trailing={<Text typography="subtitle">{settingListing.unit}</Text>}
            error={t(error?.priceMax)}
            size="small"
            style={Styles.flex}
          />
        </View>
        <SizedBox height={16} />
        <View style={Styles.row}>
          <InputPicker
            label={t('booking_style')}
            value={bookingStyle?.title}
            placeholder={t('select_booking_style')}
            style={Styles.flex}
            onPress={() => {
              bookingStyleRef.current?.present();
            }}
          />
          <SizedBox width={16} />
          <TextInput
            ref={priceRef}
            defaultValue={price}
            label={t('price')}
            placeholder={t('input_price')}
            onChangeText={value => {
              const valid = validate(value, {empty: false, number: true});
              setPrice(value);
              setError({...error, price: valid});
            }}
            onFocus={() => {
              setError({...error, price: null});
            }}
            trailing={<Text typography="subtitle">{settingListing.unit}</Text>}
            error={t(error?.price)}
            size="small"
            style={Styles.flex}
          />
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowSpace}>
          <Text typography="title" weight="bold">
            {t('open_time')}
          </Text>
          <Button
            type="text"
            full={false}
            size="small"
            onPress={onChangeOpenTime}
            textStyle={{color: theme.colors.secondary}}>
            {t('add')}
          </Button>
        </View>
        <SizedBox height={16} />
        <View style={Styles.rowSpace}>
          <Text typography="title" weight="bold">
            {t('social_network')}
          </Text>
          <Button
            type="text"
            full={false}
            size="small"
            onPress={onChangeSocial}
            textStyle={{color: theme.colors.secondary}}>
            {t('add')}
          </Button>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
