import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    borderRadius: 8,
  },
  contentButton: {
    borderTopWidth: 0.5,
    flexDirection: 'row',
  },
  contentIcon: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  message: {marginTop: 8, textAlign: 'center'},
});
