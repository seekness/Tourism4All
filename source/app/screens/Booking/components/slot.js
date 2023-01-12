import React, {useContext, useRef, useState} from 'react';
import {
  Application,
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
import {View} from 'react-native';
import PropTypes from 'prop-types';

export default function Index(props) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const adultRef = useRef();
  const childrenRef = useRef();
  const {bookingStyle, onUpdate} = props;

  const [adult, setAdult] = useState(bookingStyle?.adult);
  const [children, setChildren] = useState(bookingStyle?.children);

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

  return (
    <>
      {renderSelectAdult()}
      {renderSelectChildren()}
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
