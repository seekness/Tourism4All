import React, {useContext} from 'react';
import {Application, CheckBox, Divider, SizedBox, Text} from '@components';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Styles} from '@configs';

export default function Index(props) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const {bookingPayment, onUpdate} = props;

  return (
    <View>
      {bookingPayment?.listMethod?.map((item, index) => {
        return (
          <View key={item.id}>
            <View style={styles.paymentItem}>
              <CheckBox
                value={item.id === bookingPayment.method?.id}
                onPress={() => onUpdate({method: item})}
              />
              <SizedBox width={8} />
              <View style={Styles.flex}>
                <Text typography="title">{item.title}</Text>
                <SizedBox height={2} />
                <Text typography="caption">{item.instruction}</Text>
              </View>
            </View>
            {index !== bookingPayment.listMethod.length - 1 && <Divider />}
          </View>
        );
      })}
      {bookingPayment?.method && (
        <View
          style={[
            styles.methodContainer,
            {
              backgroundColor: theme.colors.border,
            },
          ]}>
          <Text typography="h3" weight="bold">
            {bookingPayment.method.title}
          </Text>
          <SizedBox height={4} />
          <Text typography="caption" type="secondary">
            {bookingPayment.method.description}
          </Text>
          <SizedBox height={8} />
          <Text typography="title">{bookingPayment.method.instruction}</Text>
        </View>
      )}
      {bookingPayment?.method?.id === 'bank' &&
        bookingPayment?.listAccount?.map((item, index) => {
          return (
            <View key={item?.bankCode}>
              <View style={Styles.paddingVertical8}>
                <Text typography="title" weight="bold">
                  {item.bankName}
                </Text>
                <SizedBox height={8} />
                <View style={Styles.row}>
                  <View style={Styles.flex}>
                    <Text typography="caption" type="secondary">
                      {t('account_name')}
                    </Text>
                    <SizedBox height={4} />
                    <Text typography="subtitle">{item.name}</Text>
                  </View>
                  <View style={Styles.flex}>
                    <Text typography="caption" type="secondary">
                      {t('account_number')}
                    </Text>
                    <SizedBox height={4} />
                    <Text typography="subtitle">{item.number}</Text>
                  </View>
                </View>
                <SizedBox height={8} />
                <View style={Styles.row}>
                  <View style={Styles.flex}>
                    <Text typography="caption" type="secondary">
                      {t('iban_code')}
                    </Text>
                    <SizedBox height={4} />
                    <Text typography="subtitle">{item.bankIban}</Text>
                  </View>
                  <View style={Styles.flex}>
                    <Text typography="caption" type="secondary">
                      {t('swift_code')}
                    </Text>
                    <SizedBox height={4} />
                    <Text typography="subtitle">{item.bankSwift}</Text>
                  </View>
                </View>
              </View>
              {index !== bookingPayment.listAccount.length - 1 && <Divider />}
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  methodContainer: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
});

Index.propTypes = {
  bookingPayment: PropTypes.object,
  onUpdate: PropTypes.func,
};

Index.defaultProps = {
  bookingPayment: {},
  onUpdate: () => {},
};
