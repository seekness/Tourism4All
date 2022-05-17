import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  btnClearSearch: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: '100%',
  },
  loadMoreContent: {
    flexDirection: 'row',
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemHistory: {
    marginTop: 5,
    padding: 5,
    marginRight: 10,
  },
  loadingContent: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
