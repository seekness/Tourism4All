import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1},
  smallImage: {width: 84, height: 84, borderRadius: 12},
  smallContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rateContent: {
    alignItems: 'flex-start',
  },
  tagRate: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    minWidth: 28,
    alignItems: 'center',
  },
  //thumb
  thumbContainer: {
    borderRadius: 12,
    flex: 1,
  },
  thumbImage: {borderRadius: 12, overflow: 'hidden'},
  thumbTitle: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    flexDirection: 'row',
  },
  //thumb
  cardContainer: {
    borderRadius: 12,
    width: '100%',
    overflow: 'hidden',
    height: 200,
  },
  cardStatus: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 4,
  },
  rowCard: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardFavorite: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  //list
  listImage: {
    width: 120,
    height: 140,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  listContent: {
    flex: 1,
    paddingHorizontal: 8,
    height: '100%',
    justifyContent: 'center',
  },
  listFavorite: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  listStatus: {
    position: 'absolute',
    top: 4,
    left: 4,
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 4,
  },
  //grid
  gridContainer: {
    flexDirection: 'column',
  },
  gridImage: {
    height: 120,
    borderRadius: 8,
    width: '100%',
    overflow: 'hidden',
  },
  gridStatus: {
    position: 'absolute',
    top: 4,
    left: 4,
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 4,
  },
  gridFavorite: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
  //block
  blockContainer: {
    flexDirection: 'column',
  },
  blockImage: {
    height: 200,
  },
  blockContent: {
    paddingHorizontal: 16,
  },
  blockFavorite: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  blockStatus: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 4,
  },
  blockRate: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  rowPrice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
