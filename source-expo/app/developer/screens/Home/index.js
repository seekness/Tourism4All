import React, {useContext} from 'react';
import {FlatList, View} from 'react-native';
import Navigator from '@navigator';
import {
  Application,
  Divider,
  Icon,
  IconButton,
  ListItem,
  ScreenContainer,
  SizedBox,
} from '@components';
import {Styles} from '@configs';

const DATA = [
  {
    id: 'Text',
    title: 'Text',
    subtitle: 'The typography system',
    uri: 'https://github.com/wem2017/react_native_components/blob/master/Text/index.js',
    icon: (
      <View style={Styles.flexCenter}>
        <Icon name="format-color-text" />
      </View>
    ),
  },
  {
    id: 'TextInput',
    title: 'TextInput',
    subtitle: 'Text fields let users enter and edit text',
    uri: 'https://github.com/wem2017/react_native_components/blob/master/TextInput/index.js',
    icon: (
      <View style={Styles.flexCenter}>
        <Icon name="card-text-outline" />
      </View>
    ),
  },
  {
    id: 'InputPicker',
    title: 'InputPicker',
    subtitle: 'InputPicker allow users to choose a specific value.',
    uri: 'https://github.com/wem2017/react_native_components/blob/master/InputPicker/index.js',
    icon: (
      <View style={Styles.flexCenter}>
        <Icon name="arrow-down-drop-circle-outline" />
      </View>
    ),
  },
  {
    id: 'Button',
    title: 'Button',
    subtitle: 'Button component that should render nicely on any platform.',
    uri: 'https://github.com/wem2017/react_native_components/blob/master/Button/index.js',
    icon: (
      <View style={Styles.flexCenter}>
        <Icon name="gesture-tap-button" />
      </View>
    ),
  },
  {
    id: 'CheckBox',
    title: 'CheckBox',
    subtitle: 'CheckBox allow the user to select one or more items from a set.',
    uri: 'https://github.com/wem2017/react_native_components/blob/master/CheckBox/index.js',
    icon: (
      <View style={Styles.flexCenter}>
        <Icon name="checkbox-marked-outline" />
      </View>
    ),
  },
  {
    id: 'Divider',
    title: 'Divider',
    subtitle:
      'A divider is a thin line that groups content in lists and layouts.',
    uri: 'https://github.com/wem2017/react_native_components/blob/master/Divider/index.js',
    icon: (
      <View style={Styles.flexCenter}>
        <Icon name="view-headline" />
      </View>
    ),
  },
  {
    id: 'Icon',
    title: 'Icon',
    subtitle:
      'System icons symbolize common actions, files, devices, and directories.',
    uri: 'https://github.com/wem2017/react_native_components/blob/master/Icon/index.js',
    icon: (
      <View style={Styles.flexCenter}>
        <Icon name="shape-outline" />
      </View>
    ),
  },
  {
    id: 'IconButton',
    title: 'IconButton',
    subtitle:
      'Icon buttons allow users to take actions, and make choices, with a single tap.',
    uri: 'https://github.com/wem2017/react_native_components/blob/master/IconButton/index.js',
    icon: (
      <View style={Styles.flexCenter}>
        <Icon name="gesture-tap-button" />
      </View>
    ),
  },
  {
    id: 'Image',
    title: 'Image',
    subtitle:
      'Imagery communicates and differentiates a product through visuals.',
    uri: 'https://github.com/wem2017/react_native_components/blob/master/Image/index.js',
    icon: (
      <View style={Styles.flexCenter}>
        <Icon name="image-outline" />
      </View>
    ),
  },
  {
    id: 'ListItem',
    title: 'ListItem',
    subtitle:
      'ListItem lets you preview the list component, its variations, and configuration options.',
    uri: 'https://github.com/wem2017/react_native_components/blob/master/Image/index.js',
    icon: (
      <View style={Styles.flexCenter}>
        <Icon name="format-list-bulleted-type" />
      </View>
    ),
  },
];

export default function Home({navigation}) {
  const {theme} = useContext(Application);
  /**
   * onPress component
   * @param {*} item
   */
  const onPress = item => {
    navigation.push(item.id, {...item});
  };

  /**
   * render item list view
   * @param {*} {item}
   */
  const renderItem = ({item}) => (
    <ListItem
      size={32}
      title={item.title}
      subtitle={item.subtitle}
      leading={item.icon}
      onPress={() => onPress(item)}
    />
  );

  return (
    <ScreenContainer
      navigation={navigation}
      enableKeyboardAvoidingView={true}
      options={{
        headerLeft: () => {
          return (
            <View style={Styles.nativeLeftButton}>
              <IconButton onPress={() => Navigator.pop()} size="small">
                <Icon name="arrow-back-ios" type="MaterialIcons" />
              </IconButton>
            </View>
          );
        },
        headerRight: () => {
          return (
            <View style={Styles.nativeRightButton}>
              <IconButton
                onPress={() => {
                  navigation.push('About');
                }}
                size="small">
                <Icon name="dots-horizontal" />
              </IconButton>
            </View>
          );
        },
      }}>
      <FlatList
        style={Styles.flex}
        contentContainerStyle={[
          Styles.paddingHorizontal16,
          Styles.paddingVertical8,
          {backgroundColor: theme.colors.card},
        ]}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item?.id}${index}`}
        ItemSeparatorComponent={() => <Divider />}
      />
    </ScreenContainer>
  );
}
