import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Icon} from 'react-native-elements'
import Swiper from 'react-native-swiper'
import favoritesHandler from '../helpers/favoritesHandler'

const orchids = [
  {
    id: 1,
    name: 'Aloevera',
    category: 'Indoor',
    image: require('../../assets/product1.png'),
    ratings: 4.9,
    price: '40.50',
    sunlight: '27-35',
    humidity: 65,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 2,
    name: 'Marigold ',
    category: 'Indoor',
    image: require('../../assets/product2.png'),
    ratings: 4.9,
    price: '40.50',
    sunlight: '27-35',
    humidity: 65,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 3,
    name: 'Jasmine',
    category: 'Indoor',
    image: require('../../assets/product3.png'),
    ratings: 4.9,
    price: '40.50',
    sunlight: '27-35',
    humidity: 65,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 5,
    name: 'Lavender',
    category: 'Indoor',
    image: require('../../assets/product5.png'),
    ratings: 4.9,
    price: '40.50',
    sunlight: '27-35',
    humidity: 65,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 6,
    name: 'Carnation',
    category: 'Indoor',
    image: require('../../assets/product6.png'),
    ratings: 4.9,
    price: '40.50',
    sunlight: '27-35',
    humidity: 65,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 7,
    name: 'Hydrangea',
    category: 'Indoor',
    image: require('../../assets/product7.png'),
    ratings: 4.9,
    price: '40.50',
    sunlight: '27-35',
    humidity: 65,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 8,
    name: 'Gerbera ',
    category: 'Indoor',
    image: require('../../assets/product8.png'),
    ratings: 4.9,
    price: '40.50',
    sunlight: '27-35',
    humidity: 65,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 9,
    name: 'Magnolia',
    category: 'Indoor',
    image: require('../../assets/product9.png'),
    ratings: 4.9,
    price: '40.50',
    sunlight: '27-35',
    humidity: 65,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 10,
    name: 'Violet',
    category: 'Indoor',
    image: require('../../assets/product10.png'),
    ratings: 4.9,
    price: '40.50',
    sunlight: '27-35',
    humidity: 65,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 11,
    name: 'Daffodil',
    category: 'Indoor',
    image: require('../../assets/product11.png'),
    ratings: 4.9,
    price: '40.50',
    sunlight: '27-35',
    humidity: 65,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 12,
    name: 'Pansy',
    category: 'Indoor',
    image: require('../../assets/product12.png'),
    ratings: 4.9,
    price: '40.50',
    sunlight: '27-35',
    humidity: 65,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },

  // Add more orchids as needed
]

const HomeScreen = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const {addToFavoritesList, favoritesList, setfavoritesList} = favoritesHandler(isFocused)

  useEffect(() => {
    const loadFavoritesList = async () => {
      try {
        const list = await AsyncStorage.getItem('favoritesList')

        list && setfavoritesList(JSON.parse(list))
      } catch (error) {
        console.log('Error loading favorites list: ', error)
      }
    }

    isFocused && loadFavoritesList()
  }, [isFocused])

  const goToDetailScreen = (orchid) => {
    navigation.navigate('Detail', {orchid})
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => goToDetailScreen(item)}
      className="mb-4 mt-2 
      mx-2 w-44 h-44 justify-center items-center align-middle shadow-2xl
       bg-[#fafafa]"
    >
      <Image source={item.image} className="w-24 h-24 mt-4 rounded-full " />
      <View className="flex-row mt-4">
        <View className="mr-14 ml-2 mb-2">
          <Text className="text-[16px] text-[#797878] mb-1">{item.name}</Text>
          <Text className="text-[18px] font-bold text-[#878787]">${item.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() => addToFavoritesList(item)}
          className={`p-2 w-10 h-10 rounded-lg mt-2 ${
            favoritesList.find((favorite) => favorite.id === item.id)
              ? 'bg-red-500'
              : 'bg-[#05b379]'
          }`}
        >
          <Icon
            name={favoritesList.find((favorite) => favorite.id === item.id) ? 'heart' : 'heart-o'}
            size={20}
            color="white"
            type="font-awesome"
            className="text-white"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <View className="flex-1">
      {/* Drawer */}
      <View className="h-16 pt-10 left-0 justify-center">
        <TouchableOpacity className="-ml-80">
          <Icon name="list" size={30} />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View className="pt-4 pl-6">
        <Text className="text-[28px] font-bold tracking-widest text-[#545454]">Find your</Text>
        <Text className="text-[28px] font-bold tracking-widest text-[#545454]">Favorite plant</Text>
      </View>

      {/* Banner */}

      <View className="z-50 w-[364] h-[160] mt-6 ml-4 mr-4 rounded-xl">
        <Swiper autoplay loop>
          <Image
            source={require('../../assets/banner1.jpg')}
            style={{height: 160}}
            className="rounded-xl w-[364]"
          />
          <Image
            source={require('../../assets/banner2.jpg')}
            style={{height: 160}}
            className="rounded-xl w-[364]"
          />
        </Swiper>
      </View>

      <View className="flex-1 w-full mt-4 ml-1">
        <FlatList
          data={orchids}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  )
}

export default HomeScreen
