import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, padding: 16},
  featureImage: {
    height: 180,
    width: '100%',
  },
  galleryImageContainer: {
    height: 100,
    width: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dotted',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryImage: {
    height: 96,
    width: 96,
    borderRadius: 12,
  },
  iconAdd: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    position: 'absolute',
    right: -6,
    top: -6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
    minHeight: 20,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 2,
  },
  iconColor: {width: 24, height: 24, borderRadius: 4},
  rowPrice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
