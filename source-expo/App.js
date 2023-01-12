import 'react-native-gesture-handler';
import {View} from "react-native";
import { useFonts } from 'expo-font';
import App from './app/index';
import {Setting} from "@configs";

export default function Index(){
    const [fontsLoaded] = useFonts(Setting.resourcesFont);
    if(fontsLoaded){
        return <App/>
    }
    return <View/>
};
