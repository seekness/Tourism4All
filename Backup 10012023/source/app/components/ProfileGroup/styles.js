import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {paddingVertical: 10, flexDirection: 'row'},
  contentLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumb: {
    borderWidth: 1,
    borderColor: BaseColor.whiteColor,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contentRight: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
