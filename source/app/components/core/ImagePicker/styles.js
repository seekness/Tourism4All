import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: 'dotted',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  uploadCircle: {position: 'absolute'},
  uploadSquare: {position: 'absolute', bottom: 0},
  badge: {
    position: 'absolute',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  iconAdd: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
