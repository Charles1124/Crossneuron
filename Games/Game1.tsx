import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Game1ScreenNavigationProp= NativeStackNavigationProp<RootStackParamList, 'Game1'>;

type Props={
    navigation: Game1ScreenNavigationProp
}

export function Game1Screen({ navigation }: Props){
    
}