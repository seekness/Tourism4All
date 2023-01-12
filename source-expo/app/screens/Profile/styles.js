import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  userImage: {width: 80, height: 80, borderRadius: 40},
  rateContent: {alignItems: 'flex-start'},
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingRight: 0,
  },
  item: {flexDirection: 'row', marginBottom: 16, alignItems: 'center'},
  bottomSheetContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  userImageShare: {width: 40, height: 40, borderRadius: 20},
  tabView: {
    shadowOffset: {height: 0, width: 0},
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  reviewItem: {
    marginBottom: 16,
    borderWidth: 1,
  },
});
