import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    flex: 1,
  },
  image: {borderRadius: 12, overflow: 'hidden'},
  titleCard: {
    position: 'absolute',
    left: 8,
    bottom: 8,
  },
  fullContainer: {
    height: 120,
    width: '100%',
  },
  iconFullContainer: {
    position: 'absolute',
    left: 8,
    top: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconFull: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: '100%',
    padding: 4,
    borderRadius: 12,
  },
});
