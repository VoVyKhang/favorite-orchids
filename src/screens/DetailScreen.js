import {View, Text, Pressable} from 'react-native'
import React from 'react'
import {Icon} from 'react-native-elements'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'

const DetailScreen = () => {
  const {top} = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View style={{marginTop: top}} className="flex-1">
      <View className="flex-row justify-between mx-6">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" />
        </Pressable>
        <Icon name="favorite-border" />
      </View>

      <View className="items-center -mt-24 h-3/5">
        <Image
          resizeMode="contain"
          source={require('../../assets/product1.png')}
          className="w-64"
        />
      </View>

      <View className="mt-10 px-6">
        <Text className="text-2xl font-medium tracking-widest">Aloevera</Text>
        <View className="flex-row items-center space-x-2 mt-2">
          <Icon name="star" color="#d9c430" size={20} />
          <Text className="text-base font-medium text-yellow-600">4.9</Text>
        </View>
        <Text className="font-bold text-xl mt-2">$40.50</Text>
        <View className="mt-4 flex-row space-x-20">
          <View className="flex-row items-center space-x-4">
            <Icon name="wb-sunny" size={28} />
            <View className="space-y-1">
              <Text className="text-gray-600">Sunlight</Text>
              <Text className="font-bold text-base">27-35%</Text>
            </View>
          </View>
          <View className="flex-row items-center space-x-4">
            <Icon name="opacity" size={28} />
            <View className="space-y-1">
              <Text className="text-gray-600">Sunlight</Text>
              <Text className="font-bold text-base">27-35%</Text>
            </View>
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-2xl font-semibold">About</Text>
          <Text className="mt-2 text-gray-600">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
            industries for previewing layouts and visual mockups.
          </Text>
        </View>
      </View>
    </View>
  )
}

export default DetailScreen
