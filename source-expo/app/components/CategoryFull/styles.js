import {StyleSheet} from 'react-native';
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    height: Utils.scaleWithPixel(115),
    borderRadius: 8,
  },
  contentIcon: {
    position: 'absolute',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderContent: {width: '100%', height: '100%', borderRadius: 8},
  image: {flex: 1, borderRadius: 8},
  contentTitle: {paddingLeft: 10},
});
