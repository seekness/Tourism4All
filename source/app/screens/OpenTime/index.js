import React, {useContext, useRef, useState} from 'react';
import {
  Application,
  BottomSheetView,
  Button,
  Icon,
  IconButton,
  InputPicker,
  ScreenContainer,
  SizedBox,
  Text,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {Platform, ScrollView, View} from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import moment from 'moment/moment';
import {OpenTimeModel, ScheduleModel} from '@models';

const DEFAULT_OPEN_TIME = [
  new OpenTimeModel({
    key: 'mon',
    dayOfWeek: 1,
    schedule: [
      new ScheduleModel({
        view: '',
        start: '08:00',
        end: '18:00',
      }),
    ],
  }),
  new OpenTimeModel({
    key: 'tue',
    dayOfWeek: 2,
    schedule: [
      new ScheduleModel({
        view: '',
        start: '08:00',
        end: '18:00',
      }),
    ],
  }),
  new OpenTimeModel({
    key: 'wed',
    dayOfWeek: 3,
    schedule: [
      new ScheduleModel({
        view: '',
        start: '08:00',
        end: '18:00',
      }),
    ],
  }),
  new OpenTimeModel({
    key: 'thu',
    dayOfWeek: 4,
    schedule: [
      new ScheduleModel({
        view: '',
        start: '08:00',
        end: '18:00',
      }),
    ],
  }),
  new OpenTimeModel({
    key: 'fri',
    dayOfWeek: 5,
    schedule: [
      new ScheduleModel({
        view: '',
        start: '08:00',
        end: '18:00',
      }),
    ],
  }),
  new OpenTimeModel({
    key: 'sat',
    dayOfWeek: 6,
    schedule: [
      new ScheduleModel({
        view: '',
        start: '08:00',
        end: '18:00',
      }),
    ],
  }),
  new OpenTimeModel({
    key: 'sun',
    dayOfWeek: 0,
    schedule: [
      new ScheduleModel({
        view: '',
        start: '08:00',
        end: '18:00',
      }),
    ],
  }),
];

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const {onResult} = route.params;

  const timePickerRef = useRef();
  const callbackRef = useRef();
  const [openTime, setOpenTime] = useState([
    ...(route.params?.item ?? DEFAULT_OPEN_TIME),
  ]);
  const [time, setTime] = useState('00:00');

  /**
   * on apply open time
   */
  const onApply = () => {
    onResult?.(openTime);
    navigation.goBack();
  };

  /**
   * render bottom sheet select time
   * @returns {JSX.Element}
   */
  const renderSelectTime = () => {
    return (
      <BottomSheetView ref={timePickerRef}>
        <View style={Styles.padding8}>
          <View style={Styles.rowSpace}>
            <SizedBox />
            <Button
              onPress={() => {
                callbackRef.current(time);
                timePickerRef.current?.dismiss();
                setOpenTime([...openTime]);
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
            display="spinner"
            value={moment(time, 'HH:mm').toDate()}
            onChange={(event, date) => {
              setTime(moment(date).format('HH:mm'));
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
      {renderSelectTime()}
      <ScrollView
        style={Styles.flex}
        contentContainerStyle={[
          Styles.paddingHorizontal16,
          Styles.paddingVertical8,
          {backgroundColor: theme.colors.card},
        ]}>
        {openTime?.map(item => {
          return (
            <View key={item.key} style={Styles.paddingVertical4}>
              <Text typography="title" weight="bold">
                {t(item.key)}
              </Text>
              <SizedBox height={8} />
              {item.schedule?.map((i, index) => {
                const canAdd = index === 0;
                return (
                  <View
                    style={[Styles.row, Styles.paddingVertical4]}
                    key={`${i.title}${index}`}>
                    <InputPicker
                      label={t('start_time')}
                      value={i.start}
                      placeholder={t('select_hour')}
                      onPress={() => {
                        callbackRef.current = value => {
                          i.start = value;
                        };
                        setTime(i.start);
                        if (Platform.OS === 'android') {
                          DateTimePickerAndroid.open({
                            mode: 'time',
                            value: moment(i.start, 'HH:mm').toDate(),
                            onChange: (event, date) => {
                              if (event.type === 'set') {
                                const timeSelected =
                                  moment(date).format('HH:mm');
                                callbackRef.current(timeSelected);
                                setOpenTime([...openTime]);
                                setTime(timeSelected);
                              }
                            },
                          });
                        } else {
                          timePickerRef.current?.present();
                        }
                      }}
                      style={Styles.flex}
                    />
                    <SizedBox width={16} />
                    <InputPicker
                      label={t('end_time')}
                      value={i.end}
                      placeholder={t('select_hour')}
                      onPress={() => {
                        callbackRef.current = value => {
                          i.end = value;
                        };
                        setTime(i.end);
                        if (Platform.OS === 'android') {
                          DateTimePickerAndroid.open({
                            mode: 'time',
                            value: moment(i.end, 'HH:mm').toDate(),
                            onChange: (event, date) => {
                              if (event.type === 'set') {
                                const timeSelected =
                                  moment(date).format('HH:mm');
                                callbackRef.current(timeSelected);
                                setOpenTime([...openTime]);
                                setTime(timeSelected);
                              }
                            },
                          });
                        } else {
                          timePickerRef.current?.present();
                        }
                      }}
                      style={Styles.flex}
                    />
                    <SizedBox width={16} />
                    <IconButton
                      type="primary"
                      size="small"
                      onPress={() => {
                        if (canAdd) {
                          item.schedule.push(
                            new ScheduleModel({
                              view: '',
                              start: '08:00',
                              end: '18:00',
                            }),
                          );
                          setOpenTime([...openTime]);
                        } else {
                          item.schedule.splice(index, 1);
                          setOpenTime([...openTime]);
                        }
                      }}>
                      <Icon name={canAdd ? 'plus' : 'minus'} color="white" />
                    </IconButton>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
}
