import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Application, Text} from '@components';
import {
  About,
  Button,
  CheckBox,
  Code,
  Divider,
  Home,
  Icon as IconScreen,
  IconButton as IconButtonScreen,
  Image,
  InputPicker,
  ListItem,
  Text as TextScreen,
  TextInput,
} from '../screens';

const RootStack = createNativeStackNavigator();

export default function App() {
  const {theme} = useContext(Application);
  const {t} = useTranslation();

  return (
    <NavigationContainer theme={theme} independent={true}>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: theme.colors.text,
          headerTitle: props => {
            return (
              <Text {...props} typography="h4" weight="bold">
                {t(props.children)}
              </Text>
            );
          },
          headerTitleAlign: 'center',
        }}>
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'developer',
          }}
        />
        <RootStack.Screen name="Text" component={TextScreen} />
        <RootStack.Screen name="TextInput" component={TextInput} />
        <RootStack.Screen name="About" component={About} />
        <RootStack.Screen name="Code" component={Code} />
        <RootStack.Screen name="InputPicker" component={InputPicker} />
        <RootStack.Screen name="Button" component={Button} />
        <RootStack.Screen name="CheckBox" component={CheckBox} />
        <RootStack.Screen name="Divider" component={Divider} />
        <RootStack.Screen name="Icon" component={IconScreen} />
        <RootStack.Screen name="Image" component={Image} />
        <RootStack.Screen name="IconButton" component={IconButtonScreen} />
        <RootStack.Screen name="ListItem" component={ListItem} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
