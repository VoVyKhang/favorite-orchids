import {View, Text, Pressable, FlatList, TouchableOpacity, Image} from 'react-native'
import React, {useEffect} from 'react'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import favoritesHandler from '../helpers/favoritesHandler'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Icon} from 'react-native-elements'
import Loading from '../components/Loading'

const FavoriteScreen = () => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const {favoritesList, loading, removeFavoriteItem, removeAllFavoritesList, setfavoritesList} =
    favoritesHandler(isFocused)
  const {top} = useSafeAreaInsets()

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => goToDetailScreen(item)}
      className="mb-4 mt-10 
        mx-6 w-[350] h-24 flex-row rounded-xl justify-start items-start align-middle shadow-2xl
         bg-[#f7f5f5]"
    >
      <Image source={item.image} className="w-28 h-24 -mt-5 rounded-full" />
      <View className="flex-row mt-2">
        <View className="mr-14 ml-2 mb-2">
          <Text className="text-[18px] text-black font-medium tracking-widest">{item.name}</Text>
          <Text className="text-[16px] text-[#7b7979] italic font-medium tracking-widest mb-1">
            {item.category}
          </Text>
          <Text className="text-[18px] font-bold text-[#3a3939]">${item.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() => removeFavoriteItem(item)}
          className={`p-2 w-10 h-10 rounded-lg mt-4 ml-6 ${
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
    <View style={{marginTop: top}} className="flex-1 bg-white">
      {/* Header */}

      <Text className="text-2xl mt-2 font-medium text-center tracking-widest">FavoriteScreen</Text>

      {/* Favorites List */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {favoritesList.length > 0 ? (
            <FlatList
              renderItem={renderItem}
              data={favoritesList}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <View className="flex ml-24 mt-10">
              <Image source={require('../../assets/emptyBox.png')} className="w-56 h-56" />

              <Text className="ml-12 text-2xl font-bold tracking-widest">No Results</Text>
              <Text className="-ml-6 text-base mt-2">You don't have any favorite item here!</Text>
            </View>
          )}
        </>
      )}
    </View>
  )
}

export default FavoriteScreen
