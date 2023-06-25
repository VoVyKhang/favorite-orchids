import {View, Text, Pressable, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Icon} from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome'

import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ScrollView} from 'react-native'

const DetailScreen = ({route}) => {
  const {top} = useSafeAreaInsets()
  const navigation = useNavigation()
  const {orchid} = route.params
  const [isFavorite, setIsFavorite] = useState(false)

  const checkFavoriteItemIsExist = async () => {
    try {
      const favoritesListJSON = await AsyncStorage.getItem('favorites')
      if (favoritesListJSON) {
        const favoritesList = JSON.parse(favoritesListJSON)
        const isFavorite = favoritesList.some((item) => item.id === orchid.id)
        setIsFavorite(isFavorite)
      }
    } catch (error) {
      console.log('Error check favorite item exist: ', error)
    }
  }

  useEffect(() => {
    checkFavoriteItemIsExist()
  })

  const toggleFavoriteIcon = async () => {
    try {
      const favoritesList = await AsyncStorage.getItem('favorites')
      let newFavoritesList = []

      if (favoritesList) {
        newFavoritesList = JSON.parse(favoritesList)
      }

      if (isFavorite) {
        newFavoritesList = newFavoritesList.filter((item) => item.id !== orchid.id)
      } else {
        newFavoritesList.push(orchid)
      }

      const updatedFavoritesListJSON = JSON.stringify(newFavoritesList)
      await AsyncStorage.setItem('favorites', updatedFavoritesListJSON)
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.log('Error toggle favorite icon: ', error)
    }
  }

  const goBackHandler = () => {
    navigation.goBack()
  }

  return (
    <View style={{marginTop: top}} className="flex-1 z-50">
      <View className="flex-row justify-between mx-6">
        <TouchableOpacity onPress={goBackHandler}>
          <Icon name="arrow-back" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavoriteIcon}>
          <Icon
            name={isFavorite ? 'favorite' : 'favorite-outline'}
            size={30}
            color={isFavorite ? 'red' : 'green'}
          />
        </TouchableOpacity>
      </View>

      <View className="items-center mt-4 h-56">
        <Image resizeMode="contain" source={orchid.image} className="w-64 -mt-28" />
      </View>

      <View className="mt-24 px-6">
        <Text className="text-2xl font-medium tracking-widest">{orchid.name}</Text>
        <View className="flex-row items-center space-x-2 mt-2">
          <Icon name="star" color="#d9c430" size={20} />
          <Text className="text-base font-medium text-yellow-600">4.9</Text>
          <Text className="text-gray-500">(420 Reviews)</Text>
        </View>
        <Text className="font-bold text-xl mt-2">${orchid.price}</Text>
        <View className="mt-4 flex-row space-x-20">
          <View className="flex-row items-center space-x-4">
            <Icon name="wb-sunny" size={28} />
            <View className="space-y-1">
              <Text className="text-gray-600">Sunlight</Text>
              <Text className="font-bold text-base">{orchid.sunlight}%</Text>
            </View>
          </View>
          <View className="flex-row items-center space-x-4">
            <Icon name="opacity" size={28} />
            <View className="space-y-1">
              <Text className="text-gray-600">Humidity</Text>
              <Text className="font-bold text-base">{orchid.humidity}%</Text>
            </View>
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-2xl font-semibold">About</Text>
          <Text className="mt-2 text-gray-600">{orchid.about}</Text>
        </View>
      </View>
    </View>
  )
}

export default DetailScreen
