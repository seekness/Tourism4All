import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  selectionContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  locationContent: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderContent: {height: 32, marginHorizontal: 8},
  slider: {position: 'absolute', bottom: 0, width: '100%'},
  colorItem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContent: {
    padding: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSheetContent: {width: '100%'},
});
