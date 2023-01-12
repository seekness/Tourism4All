import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  bottomSheetContainer: {
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  tabView: {
    shadowOffset: {height: 0, width: 0},
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
});
