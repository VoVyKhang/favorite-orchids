import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from 'react-native-elements'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ButtonCustom } from './src/components/ButtonCustom'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'

import DetailScreen from './src/screens/DetailScreen'
import HomeScreen from './src/screens/HomeScreen'
import FavoriteScreen from './src/screens/FavoriteScreen'
import ContactScreen from './src/screens/ContactScreen'

enableScreens()

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
)

const FavoritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favorites"
      component={FavoriteScreen}
      options={({ navigation }) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen name="FavoriteDetail" component={DetailScreen} />
  </Stack.Navigator>
)

const BottomTabNavigate = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'green',
    }}
  >
    <Tab.Screen
      name="HomeRoot"
      component={HomeStack}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Icon name="home" type="font-awesome" color={color} />
        ),
        tabBarButton: (props) => (
          <ButtonCustom {...props} navigateName="HomeRoot" screen="Home" />
        ),
      }}
    />
    <Tab.Screen
      name="FavoritesRoot"
      component={FavoritesStack}
      options={{
        headerShown: false,
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ color }) => (
          <Icon name="heart" type="font-awesome" color={color} />
        ),
        tabBarButton: (props) => (
          <ButtonCustom
            {...props}
            navigateName="FavoritesRoot"
            screen="Favorites"
          />
        ),
      }}
    />
  </Tab.Navigator>
)

const DrawerNavigate = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerActiveTintColor: 'green',
    }}
  >
    <Drawer.Screen
      name="Home"
      options={{ headerShown: false }}
      component={BottomTabNavigate}
    />
    <Drawer.Screen name="Contact" component={ContactScreen} />
  </Drawer.Navigator>
)

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DrawerNavigate />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
