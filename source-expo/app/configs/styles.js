import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  columnSpace: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //padding
  padding4: {
    padding: 4,
  },
  padding8: {
    padding: 8,
  },
  padding16: {
    padding: 16,
  },
  padding24: {
    padding: 24,
  },
  padding32: {
    padding: 32,
  },
  //margin
  margin4: {
    margin: 4,
  },
  margin8: {
    margin: 8,
  },
  margin16: {
    margin: 16,
  },
  margin24: {
    margin: 24,
  },
  margin32: {
    margin: 32,
  },
  //paddingHorizontal
  paddingHorizontal4: {
    paddingHorizontal: 4,
  },
  paddingHorizontal8: {
    paddingHorizontal: 8,
  },
  paddingHorizontal16: {
    paddingHorizontal: 16,
  },
  paddingHorizontal24: {
    paddingHorizontal: 24,
  },
  //paddingVertical
  paddingVertical4: {
    paddingVertical: 4,
  },
  paddingVertical8: {
    paddingVertical: 8,
  },
  paddingVertical16: {
    paddingVertical: 16,
  },
  paddingVertical24: {
    paddingVertical: 24,
  },
  //button
  buttonContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  //back button native stack & bottom
  nativeLeftButton: {
    marginLeft: -12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  nativeRightButton: {
    marginRight: -12,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButton: {
    marginRight: 4,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //text
  textCenter: {textAlign: 'center'},
  //card
  card: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
