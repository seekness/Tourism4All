import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  termContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    alignItems: 'center',
  },
  successContainer: {paddingTop: 24, alignItems: 'center'},
  iconSuccess: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageSuccess: {textAlign: 'center'},
});
