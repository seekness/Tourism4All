import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
  hueOpacityPreviewContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  panel: {
    height: 200,
  },
  previewStyle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginEnd: 16,
  },
});
