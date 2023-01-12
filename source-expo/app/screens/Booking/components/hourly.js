import React, {useContext, useRef, useState} from 'react';
import {
  Application,
  BottomSheetPicker,
  BottomSheetView,
  Button,
  Divider,
  Icon,
  IconButton,
  InputPicker,
  SizedBox,
  Text,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {Platform, View} from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function Index(props) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const adultRef = useRef();
  const childrenRef = useRef();
  const startDatePickerRef = useRef();
  const hoursPickerRef = useRef();
  const {bookingStyle, onUpdate} = props;

  const [adult, setAdult] = useState(bookingStyle?.adult);
  const [children, setChildren] = useState(bookingStyle?.children);
  const [startDate, setStartDate] = useState(bookingStyle?.startDate);

  /**
   * render bottom sheet select date
   * @returns {JSX.Element}
   */
  const renderSelectStartDate = () => {
    return (
      <BottomSheetView ref={startDatePickerRef}>
        <View style={Styles.padding8}>
          <View style={Styles.rowSpace}>
            <SizedBox />
            <Button
              onPress={() => {
                startDatePickerRef.current?.dismiss();
                onUpdate({startDate});
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
            value={startDate?.toDate() ?? new Date()}
            onChange={(event, date) => {
              setStartDate(moment(date));
            }}
          />
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render select adult
   * @returns {JSX.Element}
   */
  const renderSelectAdult = () => {
    return (
      <BottomSheetView ref={adultRef}>
        <View style={Styles.padding8}>
          <View style={Styles.rowSpace}>
            <SizedBox />
            <Button
              onPress={() => {
                adultRef.current?.dismiss();
                onUpdate({adult});
              }}
              type="text"
              full={false}
              size="small"
              textStyle={{color: theme.colors.primary}}>
              {t('apply')}
            </Button>
          </View>
          <View style={Styles.rowCenter}>
            <IconButton onPress={() => setAdult(adult > 0 ? adult - 1 : 0)}>
              <Icon name="minus-circle-outline" />
            </IconButton>
            <Text typography="h3" weight="bold">
              {adult}
            </Text>
            <IconButton onPress={() => setAdult(adult + 1)}>
              <Icon name="plus-circle-outline" color={theme.colors.primary} />
            </IconButton>
          </View>
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render select children
   * @returns {JSX.Element}
   */
  const renderSelectChildren = () => {
    return (
      <BottomSheetView ref={childrenRef}>
        <View style={Styles.padding8}>
          <View style={Styles.rowSpace}>
            <SizedBox />
            <Button
              onPress={() => {
                childrenRef.current?.dismiss();
                onUpdate({children});
              }}
              type="text"
              full={false}
              size="small"
              textStyle={{color: theme.colors.primary}}>
              {t('apply')}
            </Button>
          </View>
          <View style={Styles.rowCenter}>
            <IconButton
              onPress={() => setChildren(children > 0 ? children - 1 : 0)}>
              <Icon name="minus-circle-outline" />
            </IconButton>
            <Text typography="h3" weight="bold">
              {children}
            </Text>
            <IconButton onPress={() => setChildren(children + 1)}>
              <Icon name="plus-circle-outline" color={theme.colors.primary} />
            </IconButton>
          </View>
        </View>
      </BottomSheetView>
    );
  };

  /**
   * render select hours
   * @returns {JSX.Element}
   */
  const renderSelectHours = () => {
    let selected;
    if (bookingStyle?.schedule) {
      selected = {
        title: bookingStyle?.schedule?.title,
        value: bookingStyle?.schedule?.title,
      };
    }
    return (
      <BottomSheetPicker
        ref={hoursPickerRef}
        title={t('select_hours')}
        onSelect={item => {
          onUpdate({schedule: item.data});
        }}
        selected={selected}
        data={bookingStyle.scheduleOptions.map(item => {
          return {value: item.view, title: item.view, data: item};
        })}
      />
    );
  };
  return (
    <>
      {renderSelectAdult()}
      {renderSelectChildren()}
      {renderSelectStartDate()}
      {renderSelectHours()}
      <View style={Styles.row}>
        <InputPicker
          label={t('adult')}
          value={bookingStyle?.adult?.toString()}
          placeholder={t('select_adult')}
          leading={<Icon name="account-outline" size={24} />}
          onPress={() => {
            setAdult(bookingStyle?.adult);
            adultRef.current?.present();
          }}
          style={Styles.flex}
        />
        <SizedBox width={16} />
        <InputPicker
          label={t('children')}
          value={bookingStyle?.children?.toString()}
          leading={<Icon name="baby-face-outline" size={24} />}
          placeholder={t('select_children')}
          onPress={() => {
            setChildren(bookingStyle?.children);
            childrenRef.current?.present();
          }}
          style={Styles.flex}
        />
      </View>
      <SizedBox height={16} />
      <InputPicker
        label={t('date')}
        value={bookingStyle?.startDate?.format('YYYY-MM-DD')}
        leading={<Icon name="calendar-outline" size={24} />}
        placeholder={t('select_date')}
        onPress={() => {
          if (Platform.OS === 'android') {
            DateTimePickerAndroid.open({
              mode: 'date',
              value: bookingStyle?.startDate?.toDate() ?? new Date(),
              onChange: (event, date) => {
                if (event.type === 'set') {
                  onUpdate({startDate: moment(date)});
                }
              },
            });
          } else {
            setStartDate(bookingStyle.startDate);
            startDatePickerRef.current?.present();
          }
        }}
      />
      <SizedBox height={16} />
      <InputPicker
        label={t('hours')}
        value={bookingStyle?.schedule?.title}
        leading={<Icon name="clock-outline" size={24} />}
        placeholder={t('select_hours')}
        onPress={() => {
          hoursPickerRef.current?.present();
        }}
      />
      <SizedBox height={16} />
      <Divider />
      <SizedBox height={16} />
      <View style={Styles.rowSpace}>
        <Text typography="title" weight="bold">
          {t('total')}
        </Text>
        <Text typography="title" weight="bold">
          {bookingStyle?.price}
        </Text>
      </View>
    </>
  );
}

Index.propTypes = {
  bookingStyle: PropTypes.object,
  onUpdate: PropTypes.func,
};

Index.defaultProps = {
  bookingStyle: {},
  onUpdate: () => {},
};
