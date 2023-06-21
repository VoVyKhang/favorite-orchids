import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Text, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import DetailScreen from './src/screens/DetailScreen'
import {Icon} from 'react-native-elements'
import FavoriteScreen from './src/screens/FavoriteScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => <Icon name="home" type="font-awesome" color={color} />,
          }}
        />

        <Tab.Screen
          name="Favorites"
          component={FavoriteScreen}
          options={{
            // headerShown: false,
            tabBarLabel: 'Favorites',
            tabBarIcon: ({color}) => <Icon name="heart" type="font-awesome" color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
