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
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Application} from '@components';
import styles from './styles';

const Index = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => bottomSheetRef.current);
  const {theme} = useContext(Application);
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const bottomSheetRef = useRef();
  const {bottom} = useSafeAreaInsets();

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const {header, children, onDismiss, enablePanDownToClose} = props;

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={{backgroundColor: theme.colors.card}}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
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
      <BottomSheetView
        onLayout={handleContentLayout}
        style={[{paddingBottom: bottom}]}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

Index.propTypes = {
  enablePanDownToClose: PropTypes.bool,
  onDismiss: PropTypes.func,
  header: PropTypes.element,
  children: PropTypes.node,
};

Index.defaultProps = {
  enablePanDownToClose: true,
  onDismiss: () => {},
  header: null,
  children: null,
};

export default Index;
