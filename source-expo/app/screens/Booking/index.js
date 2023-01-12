import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Application,
  Button,
  CheckBox,
  Icon,
  ScreenContainer,
  SizedBox,
  Stepper,
  Text,
  TextInput,
  Toast,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {bookingActions} from '@actions';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Standard from './components/standard';
import Daily from './components/daily';
import Hourly from './components/hourly';
import Slot from './components/slot';
import Table from './components/table';
import Payment from './components/payment';
import {validate} from '@utils';
import styles from './styles';
import {WebPageModel} from '@models';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const dispatch = useDispatch();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const contentRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState();
  const [agree, setAgree] = useState(false);
  const [step, setStep] = useState(0);
  const [bookingPayment, setBookingPayment] = useState();
  const [bookingStyle, setBookingStyle] = useState();

  useEffect(() => {
    dispatch(
      bookingActions.init(route.params?.item, ({payment, style, success}) => {
        if (success) {
          setBookingStyle(style);
          setBookingPayment(payment);
        }
      }),
    );
  }, [dispatch, route.params]);

  /**
   * booking order
   */
  const order = () => {
    const params = {
      resource_id: route.params?.item.id,
      payment_method: bookingPayment?.method?.id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address: address,
      memo: content,
      ...bookingStyle?.params,
    };
    dispatch(
      bookingActions.order(params, ({url, success}) => {
        if (success && url) {
          const item = new WebPageModel({
            title: t('payment'),
            url,
            handleUrl: ['v1/booking/return', 'v1/booking/cancel'],
            callback: data => {
              if (data !== 'v1/booking/return') {
                Toast.show(t('you_are_cancel_payment'));
              }
              setStep(step + 1);
            },
          });
          navigation.navigate('Web', {item});
        } else {
          setStep(step + 1);
        }
      }),
    );
  };

  /**
   * next step process
   */
  const onNextStep = () => {
    let errorMessage;
    switch (step) {
      case 0:
        errorMessage = bookingStyle?.validate();
        if (errorMessage) {
          Toast.show(t(errorMessage));
          return;
        }
        setStep(step + 1);
        break;
      case 1:
        errorMessage = validateContact();
        if (errorMessage) {
          Toast.show(t(errorMessage));
          return;
        }
        if (bookingPayment?.use) {
          setStep(step + 1);
        } else {
          order();
        }
        break;
      case 2:
        errorMessage = bookingPayment?.validate();
        if (errorMessage) {
          Toast.show(t(errorMessage));
          return;
        }
        if (!agree) {
          Toast.show(t('need_term_condition'));
          return;
        }
        order();
        break;
      default:
    }
  };

  /**
   * validate contact form
   */
  const validateContact = () => {
    const errorFistName = validate(firstName, {empty: false});
    const errorLastName = validate(lastName, {empty: false});
    const errorPhone = validate(phone, {empty: false, number: true});
    const errorEmail = validate(email, {empty: false, email: true});
    const errorAddress = validate(address, {empty: false});
    setError({
      firstName: errorFistName,
      lastName: errorLastName,
      phone: errorPhone,
      email: errorEmail,
      address: errorAddress,
    });
    return (
      errorFistName || errorLastName || errorPhone || errorEmail || errorAddress
    );
  };

  /**
   * update style & calc price
   * @param data
   */
  const onUpdateBookingStyle = data => {
    bookingStyle?.update(data);
    const errorMessage = bookingStyle?.validate();
    if (errorMessage) {
      Toast.show(t(errorMessage));
      setBookingStyle(bookingStyle?.clone());
      return;
    }
    dispatch(
      bookingActions.calcPrice(
        {resource_id: route.params?.item?.id, ...bookingStyle?.params},
        ({price, success, message}) => {
          if (success) {
            bookingStyle?.update({price});
          } else {
            Toast.show(message);
          }
          setBookingStyle(bookingStyle?.clone());
        },
      ),
    );
  };

  /**
   * on update payment
   */
  const onUpdateBookingPayment = data => {
    bookingPayment?.update(data);
    setBookingPayment(bookingPayment?.clone());
  };

  /**
   * term & condition view
   */
  const onTerm = () => {
    navigation.navigate('Web', {
      item: new WebPageModel({
        title: t('term_condition'),
        url: bookingPayment?.term,
      }),
    });
  };

  /**
   * render info
   * @returns {JSX.Element}
   */
  const renderInfo = () => {
    switch (bookingStyle?.style) {
      case 'daily':
        return (
          <Daily bookingStyle={bookingStyle} onUpdate={onUpdateBookingStyle} />
        );
      case 'hourly':
        return (
          <Hourly bookingStyle={bookingStyle} onUpdate={onUpdateBookingStyle} />
        );
      case 'slot':
        return (
          <Slot bookingStyle={bookingStyle} onUpdate={onUpdateBookingStyle} />
        );
      case 'table':
        return (
          <Table bookingStyle={bookingStyle} onUpdate={onUpdateBookingStyle} />
        );
      default:
        return (
          <Standard
            bookingStyle={bookingStyle}
            onUpdate={onUpdateBookingStyle}
          />
        );
    }
  };

  /**
   * render contact form
   */
  const renderContact = () => {
    return (
      <>
        <TextInput
          ref={firstNameRef}
          defaultValue={firstName}
          label={t('first_name')}
          placeholder={t('input_first_name')}
          onChangeText={value => {
            setFirstName(value);
            const valid = validate(value, {empty: false});
            setError({...error, firstName: valid});
          }}
          onFocus={() => {
            setError({...error, firstName: null});
          }}
          onSubmitEditing={() => lastNameRef.current?.focus()}
          error={t(error?.firstName)}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={lastNameRef}
          defaultValue={lastName}
          label={t('last_name')}
          placeholder={t('input_last_name')}
          onChangeText={value => {
            setLastName(value);
            const valid = validate(value, {empty: false});
            setError({...error, lastName: valid});
          }}
          onFocus={() => {
            setError({...error, lastName: null});
          }}
          onSubmitEditing={() => phoneRef.current?.focus()}
          error={t(error?.lastName)}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={phoneRef}
          defaultValue={phone}
          label={t('phone')}
          placeholder={t('input_phone')}
          onChangeText={value => {
            setPhone(value);
            const valid = validate(value, {empty: false, number: true});
            setError({...error, phone: valid});
          }}
          onFocus={() => {
            setError({...error, phone: null});
          }}
          onSubmitEditing={() => emailRef.current?.focus()}
          error={t(error?.phone)}
          keyboardType="phone-pad"
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={emailRef}
          defaultValue={email}
          label={t('email')}
          placeholder={t('input_email')}
          onChangeText={value => {
            setEmail(value);
            const valid = validate(value, {empty: false, email: true});
            setError({...error, email: valid});
          }}
          onFocus={() => {
            setError({...error, email: null});
          }}
          onSubmitEditing={() => addressRef.current?.focus()}
          error={t(error?.email)}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={addressRef}
          defaultValue={address}
          label={t('address')}
          placeholder={t('input_address')}
          onChangeText={value => {
            setAddress(value);
            const valid = validate(value, {empty: false});
            setError({...error, address: valid});
          }}
          onFocus={() => {
            setError({...error, address: null});
          }}
          onSubmitEditing={() => contentRef.current?.focus()}
          error={t(error?.address)}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          numberOfLines={5}
          ref={contentRef}
          defaultValue={content}
          label={t('content')}
          placeholder={t('input_content')}
          onChangeText={setContent}
          size="small"
        />
      </>
    );
  };

  /**
   * render payment form
   */
  const renderPayment = () => {
    return (
      <Payment
        bookingPayment={bookingPayment}
        onUpdate={onUpdateBookingPayment}
      />
    );
  };

  /**
   * render result
   */
  const renderResult = () => {
    return (
      <View style={styles.successContainer}>
        <View
          style={[
            styles.iconSuccess,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}>
          <Icon name="check" size={32} color="white" />
        </View>
        <SizedBox height={8} />
        <Text typography="h4" weight="bold">
          {t('booking_success_title')}
        </Text>
        <SizedBox height={8} />
        <Text typography="subtitle" style={styles.messageSuccess}>
          {t('booking_success_message')}
        </Text>
      </View>
    );
  };

  /**
   * render form with step
   * @returns {JSX.Element}
   */
  const renderForm = () => {
    switch (step) {
      case 0:
        return renderInfo();
      case 1:
        return renderContact();
      case 2:
        if (bookingPayment?.use) {
          return renderPayment();
        } else {
          return renderResult();
        }
      case 3:
        return renderResult();
      default:
        return <View />;
    }
  };

  /**
   * render for action
   * @returns {JSX.Element}
   */
  const renderAction = () => {
    switch (step) {
      case 0:
        return (
          <View style={Styles.buttonContent}>
            <Button onPress={onNextStep}>{t('next')}</Button>
          </View>
        );

      case 1:
        return (
          <View style={Styles.buttonContent}>
            <View style={Styles.flex}>
              <Button onPress={() => setStep(step - 1)}>{t('previous')}</Button>
            </View>
            <SizedBox width={16} />
            <View style={Styles.flex}>
              <Button onPress={onNextStep}>{t('next')}</Button>
            </View>
          </View>
        );

      case 2:
        if (bookingPayment?.use) {
          return (
            <>
              <View style={styles.termContainer}>
                <CheckBox
                  value={agree}
                  shape="rectangle"
                  onPress={() => setAgree(!agree)}
                />
                <SizedBox width={8} />
                <Text typography="subtitle">{t('agree_with')}</Text>
                <SizedBox width={4} />
                <TouchableOpacity onPress={onTerm}>
                  <Text typography="subtitle" color="secondary">
                    {t('term_condition')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={Styles.buttonContent}>
                <View style={Styles.flex}>
                  <Button onPress={() => setStep(step - 1)}>
                    {t('previous')}
                  </Button>
                </View>
                <SizedBox width={16} />
                <View style={Styles.flex}>
                  <Button onPress={onNextStep}>{t('next')}</Button>
                </View>
              </View>
            </>
          );
        } else {
          return (
            <View style={Styles.buttonContent}>
              <View style={Styles.flex}>
                <Button onPress={() => navigation.goBack()}>{t('back')}</Button>
              </View>
              <SizedBox width={16} />
              <View style={Styles.flex}>
                <Button onPress={() => navigation.replace('BookingManagement')}>
                  {t('bookings')}
                </Button>
              </View>
            </View>
          );
        }

      case 3:
        return (
          <View style={Styles.buttonContent}>
            <View style={Styles.flex}>
              <Button onPress={() => navigation.goBack()}>{t('back')}</Button>
            </View>
            <SizedBox width={16} />
            <View style={Styles.flex}>
              <Button onPress={() => navigation.replace('BookingManagement')}>
                {t('bookings')}
              </Button>
            </View>
          </View>
        );
      default:
        return <View />;
    }
  };

  /**
   * render container
   */
  const renderContainer = () => {
    if (bookingStyle && bookingPayment) {
      let steps = [
        {title: t('details'), icon: 'calendar'},
        {title: t('contact'), icon: 'account-box-outline'},
        {title: t('completed'), icon: 'check'},
      ];
      if (bookingPayment?.use) {
        steps = [
          {title: t('details'), icon: 'calendar'},
          {title: t('contact'), icon: 'account-box-outline'},
          {title: t('payment'), icon: 'credit-card-outline'},
          {title: t('completed'), icon: 'check'},
        ];
      }
      return (
        <>
          <SizedBox height={8} />
          <View style={Styles.padding8}>
            <Stepper steps={steps} step={step} />
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={Styles.flex}
            contentContainerStyle={Styles.padding16}>
            {renderForm()}
          </ScrollView>
          {renderAction()}
        </>
      );
    }
  };

  return (
    <ScreenContainer
      navigation={navigation}
      enableKeyboardAvoidingView={true}
      style={{backgroundColor: theme.colors.card}}>
      {renderContainer()}
    </ScreenContainer>
  );
}
