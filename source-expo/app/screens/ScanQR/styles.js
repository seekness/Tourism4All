import {StyleSheet} from 'react-native';
import {Colors} from '@configs';

export default StyleSheet.create({
  modal: {flex: 1, backgroundColor: Colors.modal},
  bottomCenter: {
    flex: 1,
    backgroundColor: Colors.modal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeft: {width: 32, height: 32, borderTopWidth: 4, borderLeftWidth: 4},
  topRight: {width: 32, height: 32, borderTopWidth: 4, borderRightWidth: 4},
  bottomLeft: {width: 32, height: 32, borderBottomWidth: 4, borderLeftWidth: 4},
  bottomRight: {
    width: 32,
    height: 32,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  qrContent: {width: 200, height: 200, borderRadius: 16},
});
