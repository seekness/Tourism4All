import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  listContainer: {flexGrow: 1, paddingVertical: 8},
  item: {marginBottom: 16},
  bottomSheetContainer: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  carouselContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  carouselItem: {
    padding: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  locationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
