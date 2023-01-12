import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import {CircleSnail} from 'react-native-progress';
import {View, BackHandler} from 'react-native';
import {Colors} from '@configs';
import styles from './styles';

export default forwardRef((props, ref) => {
  const timeout = useRef();
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    showLoading,
  }));

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return visible;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, [visible]);

  /**
   * show/hidden loading
   * @param loading
   * @param options
   * @param callback
   */
  const showLoading = ({
    loading = false,
    options = {duration: 30000},
    callback = () => {},
  }) => {
    setVisible(loading);
    if (loading) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setVisible(false);
      }, options?.duration);
    }
    callback?.();
  };

  if (visible) {
    return (
      <View style={styles.container}>
        <CircleSnail
          spinDuration={2000}
          indeterminate
          color={Colors.white}
          size={64}
        />
      </View>
    );
  }

  return null;
});
