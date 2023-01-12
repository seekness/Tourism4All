import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Application, Icon, OTPInput, Text} from '@components';
import {Colors, Styles} from '@configs';
import Navigator from '@navigator';
import styles from './styles';

const Index = props => {
  const {theme} = useContext(Application);
  const otpRef = useRef();

  const [error, setError] = useState();
  const [time, setTime] = useState(props.time);

  const {title, length, onOTPCheck, onClose} = props;

  useEffect(() => {
    setTimeout(() => {
      focusOTP();
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  /**
   * focus OTP
   */
  const focusOTP = () => {
    setError(null);
    otpRef.current.focus();
  };

  /**
   * on change otp
   * @param {*} value
   */
  const handleChange = useCallback(
    async value => {
      if (value.length === length) {
        const issue = await onOTPCheck(value);
        if (issue) {
          setError(issue);
        } else {
          Navigator.pop();
        }
      }
    },
    [length, onOTPCheck],
  );

  /**
   * resend otp
   */
  const onResendOTP = () => {
    props.onResendOTP();
    setTime(props.time);
  };

  /**
   * render resend otp
   * @return {*}
   */
  const renderSendOTP = () => {
    if (time > 0) {
      return (
        <Text typography="title" type="secondary">
          Gửi lại OTP sau ({time})
        </Text>
      );
    }
    return (
      <TouchableOpacity onPress={onResendOTP}>
        <Text typography="title" color="secondary">
          Gửi lại OTP
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
        },
      ]}>
      <View style={Styles.padding24}>
        <Text typography="h4" weight="bold">
          {title}
        </Text>
        <View style={styles.otpContainer}>
          <OTPInput
            ref={otpRef}
            handleChange={handleChange}
            numberOfInputs={length}
            selectTextOnFocus={true}
            error={error}
          />
        </View>
        <View style={Styles.rowCenter}>{renderSendOTP()}</View>
      </View>
      <TouchableOpacity
        style={styles.iconContent}
        onPress={() => {
          Navigator.pop();
          onClose();
        }}>
        <View style={styles.closeIcon}>
          <Icon name="close-circle" color={Colors.black} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

Index.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number,
  length: PropTypes.number,
  onOTPCheck: PropTypes.func,
  onResendOTP: PropTypes.func,
  onClose: PropTypes.func,
};

Index.defaultProps = {
  title: 'Tiêu đề',
  time: 60,
  length: 4,
  onOTPCheck: () => false,
  onResendOTP: () => {},
  onClose: () => {},
};

export default Index;
