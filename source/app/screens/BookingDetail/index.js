import React, {useContext, useEffect, useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
  Application,
  Button,
  Divider,
  ScreenContainer,
  SizedBox,
  Text,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {bookingActions} from '@actions';
import {ActivityIndicator, ScrollView, View} from 'react-native';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const dispatch = useDispatch();
  const [detail, setDetail] = useState();

  useEffect(() => {
    dispatch(
      bookingActions.onLoadDetail(route.params?.item, ({data, success}) => {
        if (success) {
          setDetail(data);
        }
      }),
    );
  }, [dispatch, route.params]);

  /**
   * on cancel booking
   */
  const onCancel = () => {
    dispatch(
      bookingActions.onCancel(route.params?.item, ({success, data}) => {
        if (success) {
          setDetail(data);
        }
      }),
    );
  };

  /**
   * render content
   * @returns {JSX.Element}
   */
  const renderContent = () => {
    if (detail?.id) {
      return (
        <ScrollView
          style={Styles.flex}
          contentContainerStyle={[
            Styles.padding16,
            {backgroundColor: theme.colors.card},
          ]}>
          <View style={Styles.row}>
            <Text typography="title" weight="bold">
              {t('booking_id').toUpperCase()}
            </Text>
            <SizedBox width={8} />
            <Text typography="title" type="secondary">
              {detail.id}
            </Text>
          </View>
          <SizedBox height={16} />
          <View style={Styles.row}>
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('payment')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title">{t(detail.payment)}</Text>
            </View>
            <SizedBox width={8} />
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('payment_method')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title">{detail.paymentName}</Text>
            </View>
          </View>
          <SizedBox height={16} />
          <View style={Styles.row}>
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('transaction_id')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title">{detail.transactionID}</Text>
            </View>
            <SizedBox width={8} />
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('create_on')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title">
                {detail.createdOn?.format?.('YYYY-MM-DD hh:mm')}
              </Text>
            </View>
          </View>
          <SizedBox height={16} />
          <View style={Styles.row}>
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('payment_total')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title" color="primary">
                {detail.totalDisplay}
              </Text>
            </View>
            <SizedBox width={8} />
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('paid_on')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title">
                {detail.paidOn?.format?.('YYYY-MM-DD hh:mm')}
              </Text>
            </View>
          </View>
          <SizedBox height={16} />
          <View style={Styles.row}>
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('status')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title" style={{color: detail.statusColor}}>
                {t(detail.status)}
              </Text>
            </View>
            <SizedBox width={8} />
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('create_via')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title">{t(detail.createdVia)}</Text>
            </View>
          </View>
          <SizedBox height={16} />
          <Divider />
          <SizedBox height={24} />
          <View style={Styles.rowCenter}>
            <QRCode
              value={`listar://qrcode?type=booking&action=view&id=${detail.id}`}
              size={120}
            />
          </View>
          <SizedBox height={24} />
          {detail.resource?.map(item => {
            return (
              <View key={item.id}>
                <Text typography="title">{item.name}</Text>
                <SizedBox height={8} />
                <View style={Styles.rowSpace}>
                  <Text typography="title">{t('res_length')}</Text>
                  <Text typography="title">x {item.quantity}</Text>
                </View>
                <SizedBox height={8} />
                <View style={Styles.rowSpace}>
                  <Text typography="title">{t('price')}</Text>
                  <Text typography="title">{item.total}</Text>
                </View>
              </View>
            );
          })}
          <SizedBox height={16} />
          <Divider />
          <SizedBox height={16} />
          <Text typography="title" weight="bold">
            {t('billing').toUpperCase()}
          </Text>
          <SizedBox height={16} />
          <View style={Styles.row}>
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('first_name')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title">{t(detail.billFirstName)}</Text>
            </View>
            <SizedBox width={8} />
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('last_name')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title">{t(detail.billLastName)}</Text>
            </View>
          </View>
          <SizedBox height={16} />
          <View style={Styles.row}>
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('phone')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title">{t(detail.billPhone)}</Text>
            </View>
            <SizedBox width={8} />
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('email')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title">{t(detail.billEmail)}</Text>
            </View>
          </View>
          <SizedBox height={16} />
          <View style={Styles.row}>
            <View style={Styles.flex}>
              <Text typography="subtitle" type="secondary">
                {t('address')}
              </Text>
              <SizedBox height={8} />
              <Text typography="title">{t(detail.billAddress)}</Text>
            </View>
            <SizedBox width={8} />
            <View style={Styles.flex} />
          </View>
        </ScrollView>
      );
    }

    return (
      <View style={Styles.flexCenter}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  };

  return (
    <ScreenContainer navigation={navigation}>
      {renderContent()}
      {detail?.allowCancel && (
        <View style={Styles.buttonContent}>
          <Button onPress={onCancel}>{t('cancel')}</Button>
        </View>
      )}
    </ScreenContainer>
  );
}
