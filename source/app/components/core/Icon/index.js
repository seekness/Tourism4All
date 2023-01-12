import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {Application} from '@components';
import styles from './styles';

const Index = props => {
  const {theme} = useContext(Application);
  const {style, type} = props;
  let Icon;
  switch (type) {
    case 'AntDesign':
      Icon = AntDesign;
      break;
    case 'Entypo':
      Icon = Entypo;
      break;
    case 'EvilIcons':
      Icon = EvilIcons;
      break;
    case 'Feather':
      Icon = Feather;
      break;
    case 'FontAwesome':
      Icon = FontAwesome;
      break;
    case 'FontAwesome5':
      Icon = FontAwesome5;
      break;
    case 'Fontisto':
      Icon = Fontisto;
      break;
    case 'Foundation':
      Icon = Foundation;
      break;
    case 'Ionicons':
      Icon = Ionicons;
      break;
    case 'MaterialCommunityIcons':
      Icon = MaterialCommunityIcons;
      break;
    case 'MaterialIcons':
      Icon = MaterialIcons;
      break;
    case 'Octicons':
      Icon = Octicons;
      break;
    default:
      Icon = MaterialCommunityIcons;
      break;
  }
  return (
    <Icon
      color={theme.colors.text}
      {...props}
      style={[styles.styleRTL, style]}
    />
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.oneOf([
    'AntDesign',
    'Entypo',
    'EvilIcons',
    'Feather',
    'FontAwesome',
    'FontAwesome5',
    'Fontisto',
    'Foundation',
    'Ionicons',
    'MaterialCommunityIcons',
    'MaterialIcons',
    'Octicons',
  ]),
};

Index.defaultProps = {
  style: {},
  name: 'help-circle-outline',
  size: 24,
  type: 'MaterialCommunityIcons',
};

export default Index;
