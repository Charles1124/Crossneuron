import { Home, Gamepad2, Book, User } from 'lucide-react-native'

import { Login } from "./screens/Login"
import { Register } from "./screens/Register"; 
import { ForgotPassword } from "./screens/ForgotPassword";
import { HomeScreen } from "./screens/Home";
import { GamesScreen } from "./screens/Games"
import { ShapesGameScreen } from './Games/ShapesGame'; 
import { ColorsGameScreen } from './Games/ColorsGame';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";  
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export type RootStackParamList = {
  Login: undefined,
  Register: undefined,
  Home: undefined,
  ForgotPassword: undefined, 
  ShapesGame: undefined, 
  ColorsGame: undefined,
};

export type HomeTabParamList= {
  Home: undefined, 
  Games: undefined, 
  Exercises: undefined, 
  Profile: undefined, 
};

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const Tab= createBottomTabNavigator <HomeTabParamList>(); 

function MainTabs(){
  return (
        <Tab.Navigator
            id="HomeTabs"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'hsl(221, 83%, 53%)',
                tabBarInactiveTintColor: 'hsl(215, 16%, 47%)',
                tabBarStyle: {
                  paddingBottom: 5, 
                  paddingTop: 5, 
                  height: 60,
                },
            }}>
            <Tab.Screen
                name="Home" 
                component={HomeScreen}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (<Home color={color} size={size} />)
                }} />

            <Tab.Screen
                name="Games"
                component={GamesScreen}
                options={{
                    title: 'Juegos',
                    tabBarIcon: ({ color, size }) => (
                        <Gamepad2 color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Exercises"
                component={Book}
                options={{
                    title: 'Ejercicios',
                    tabBarIcon: ({ color, size }) => (
                        <Book color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={User}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <User color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>

    );
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        id="Root"
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} /> 
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/> 
        <Stack.Screen name="Home" component={MainTabs}/> 
        <Stack.Screen name="ShapesGame" component={ShapesGameScreen}/> 
        <Stack.Screen name="ColorsGame" component={ColorsGameScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
