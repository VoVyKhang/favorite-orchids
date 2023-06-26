import { View, Text } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'

const ContactScreen = () => {
  return (
    <View className="flex-1 bg-[#00b378]">
      <View className="items-center">
        <Text className="text-2xl font-bold tracking-widest my-6 text-white">
          Say Hello!
        </Text>
      </View>
      <Text className="ml-10 mb-4 mt-2 text-2xl font-semibold tracking-widest text-white">
        Contact us:
      </Text>
      <View className="flex-row items-center justify-center space-x-4 mt-4">
        <Icon
          name="map-pin"
          size={20}
          color="white"
          type="feather"
          className="text-white bg-[#03ac74] w-12 h-12 items-center justify-center rounded-full"
        />
        <Text className="text-white text-base">
          <Text className="font-bold text-lg">Address: </Text>568/6 Le Van Viet,
          Thu Duc City
        </Text>
      </View>

      <View className="flex-row items-center justify-start space-x-4 mt-4 ml-4">
        <Icon
          name="phone"
          size={20}
          color="white"
          type="feather"
          className="text-white bg-[#03ac74] w-12 h-12 items-center justify-center rounded-full"
        />
        <Text className="text-white text-base">
          <Text className="font-bold text-lg">Phone: </Text> +1235 2355 98
        </Text>
      </View>

      <View className="flex-row items-center justify-start space-x-4 mt-4 ml-4">
        <Icon
          name="send"
          size={20}
          color="white"
          type="feather"
          className="text-white bg-[#03ac74] w-12 h-12 items-center justify-center rounded-full"
        />
        <Text className="text-white text-base">
          <Text className="font-bold text-lg">Email: </Text> infor@yoursite.com
        </Text>
      </View>

      <View className="flex-row items-center justify-start space-x-4 mt-4 ml-4">
        <Icon
          name="globe"
          size={20}
          color="white"
          type="feather"
          className="text-white bg-[#03ac74] w-12 h-12 items-center justify-center rounded-full"
        />
        <Text className="text-white text-base">
          <Text className="font-bold text-lg">Website: </Text> yoursite.com
        </Text>
      </View>
    </View>
  )
}

export default ContactScreen
