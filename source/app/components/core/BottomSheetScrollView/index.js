import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Application} from '@components';
import styles from './styles';

const Index = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => bottomSheetRef.current);
  const {theme} = useContext(Application);
  const bottomSheetRef = useRef();
  const {bottom} = useSafeAreaInsets();
  const {header, initHeight, children, onDismiss, enablePanDownToClose} = props;
  const snapPoints = useMemo(() => [initHeight, '100%'], [initHeight]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={{backgroundColor: theme.colors.card}}
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="none"
      stackBehavior="push"
      android_keyboardInputMode="adjustResize"
      onDismiss={onDismiss}
      handleComponent={() => (
        <>
          <View style={styles.indicatorContainer}>
            <View
              style={[styles.indicator, {backgroundColor: theme.colors.card}]}
            />
          </View>
          {header}
        </>
      )}
      backdropComponent={backdropProps => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...backdropProps}
        />
      )}
      enablePanDownToClose={enablePanDownToClose}>
      <BottomSheetScrollView contentContainerStyle={{paddingBottom: bottom}}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

Index.propTypes = {
  initHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  enablePanDownToClose: PropTypes.bool,
  onDismiss: PropTypes.func,
  header: PropTypes.element,
  children: PropTypes.node,
};

Index.defaultProps = {
  initHeight: '50%',
  enablePanDownToClose: true,
  onDismiss: () => {},
  header: null,
  children: null,
};

export default Index;
