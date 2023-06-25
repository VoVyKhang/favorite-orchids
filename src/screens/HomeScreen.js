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
import {orchids, categoryList} from '../../assets/data/orchids'

const HomeScreen = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const {addToFavoritesList, favoritesList, setfavoritesList} = favoritesHandler(isFocused)
  const [category, setCategory] = useState('All')
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [orchidList, setOrchidList] = useState(orchids)

  useEffect(() => {
    const loadFavoritesList = async () => {
      try {
        const list = await AsyncStorage.getItem('favorites')

        list && setfavoritesList(JSON.parse(list))
      } catch (error) {
        console.log('Error loading favorites list: ', error)
      }
    }

    isFocused && loadFavoritesList()
  }, [isFocused])

  useEffect(() => {
    if (category === 'All') {
      setOrchidList(orchids)
    } else {
      const newOrchidList = orchids.filter((item) => item.category === category)
      setOrchidList(newOrchidList)
    }
  }, [category])

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

      {/* Category */}
      <View className="flex-row w-full mx-6 mt-6 space-x-1">
        {categoryList.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => {
              setCategoryIndex(index)
              setCategory(category.name)
            }}
            className="mr-2 py-1.5 px-4 rounded-md"
            style={{
              backgroundColor: categoryIndex === index ? '#00885c' : '#fff',
              borderColor: categoryIndex === index ? '#fff' : '#ccc',
              borderWidth: 1.5,
            }}
          >
            <Text
              className="text-[15px] font-semibold"
              style={{
                color: categoryIndex === index ? '#fff' : '#ccc',
              }}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-1 w-full mt-4 ml-1">
        <FlatList
          data={orchidList}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  )
}

export default HomeScreen
