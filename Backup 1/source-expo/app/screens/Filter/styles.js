import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  contentRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 10,
  },
  contentResultRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  contentList: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  circleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    elevation: 0.4,
  },
  btnClearSearch: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: '100%',
  },
  locationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});
