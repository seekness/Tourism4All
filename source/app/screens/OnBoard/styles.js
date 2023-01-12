import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  buttonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  textSubtitle: {
    textAlign: 'center',
    marginTop: 8,
  },
  textTitle: {
    textAlign: 'center',
  },
  languageButton: {position: 'absolute', top: 16, right: 16},
  backButton: {position: 'absolute', top: 16, left: 16},
});
