import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  location: {
    flexDirection: 'row',
    marginTop: 10,
  },
  contentTag: {
    marginLeft: 20,
    marginTop: 10,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabbar: {
    height: 40,
  },
  tab: {
    width: 130,
  },
  indicator: {
    height: 1,
  },
  label: {
    fontWeight: '400',
  },
  contentImageGird: {
    flexDirection: 'row',
    height: Utils.scaleWithPixel(160),
    marginTop: 10,
  },
  tourItem: {
    width: 160,
  },
  contentButtonBottom: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
