import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import favoritesHandler from '../helpers/favoritesHandler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import Loading from '../components/Loading'
import { NativeBaseProvider } from 'native-base'
import { AlertDialog, Button } from 'native-base'

const FavoriteScreen = () => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const {
    favoritesList,
    loading,
    removeFavoriteItem,
    removeAllFavoritesList,
    setfavoritesList,
  } = favoritesHandler(isFocused)
  const { top } = useSafeAreaInsets()
  const [isOpen, setIsOpen] = useState(false)

  const goBackFavorite = () => {
    navigation.navigate('Favorites')
  }

  const goToDetailScreen = (orchid) => {
    navigation.navigate('Detail', { orchid, goBackFavorite })
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => goToDetailScreen(item)}
      className="mb-4 mt-10 
        mx-6 w-[350] h-24 flex-row rounded-xl justify-around items-start align-middle shadow-2xl
         bg-[#f7f5f5]"
    >
      <Image source={item.image} className="w-28 h-24 -mt-5 rounded-full" />
      <View className="flex-row mt-2 justify-between">
        <View className="mr-16 ml-2 mb-2">
          <Text className="text-[18px] text-black font-medium tracking-widest">
            {item.name}
          </Text>
          <Text className="text-[16px] text-[#7b7979] italic font-medium tracking-widest mb-1">
            {item.category}
          </Text>
          <Text className="text-[18px] font-bold text-[#3a3939]">
            ${item.price}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              `Unlike ${item.name} ?`,
              `Are you sure to unlike this plant?`,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                { text: 'OK', onPress: () => removeFavoriteItem(item) },
              ],
              { cancelable: false }
            )
          }
          className={'p-2 w-10 h-10 rounded-lg mt-4 bg-red-500'}
        >
          <Icon
            name={
              favoritesList.find((favorite) => favorite.id === item.id)
                ? 'heart'
                : 'heart-o'
            }
            size={20}
            color="white"
            type="font-awesome"
            className="text-white"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  const ButtonAlert = () => {
    const onClose = () => {
      setIsOpen(false)
    }

    const handleRemoveAllFavorites = () => {
      removeAllFavoritesList()
      setIsOpen(false)
    }

    const cancelRef = useRef(null)

    return (
      <View className="w-full rounded-lg items-end h-20">
        <Button
          shadow={2}
          className="w-24 h-10 mr-6 mt-4"
          colorScheme="danger"
          onPress={() => setIsOpen(!isOpen)}
        >
          Remove all
        </Button>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Remove all</AlertDialog.Header>
            <AlertDialog.Body>
              Are you sure to remove all of favorites list?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={handleRemoveAllFavorites}>
                  Yes
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </View>
    )
  }

  return (
    <View style={{ marginTop: top }} className="flex-1 bg-white">
      {/* Header */}

      {/* Drawer */}
      <View className="h-16 justify-between items-center flex-row">
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          className="ml-4 mt-2"
        >
          <Icon name="list" size={30} />
        </TouchableOpacity>
        <Text className="text-2xl mt-2 font-medium text-center tracking-widest">
          FavoriteScreen
        </Text>
        <Text></Text>
      </View>

      {favoritesList.length > 0 ? (
        <View className="mb-10">
          <NativeBaseProvider>
            <ButtonAlert />
          </NativeBaseProvider>
        </View>
      ) : (
        ''
      )}

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
              <Image
                source={require('../../assets/emptyBox.png')}
                className="w-56 h-56"
              />

              <Text className="ml-12 text-2xl font-bold tracking-widest">
                No Results
              </Text>
              <Text className="-ml-6 text-base mt-2">
                You don't have any favorite item here!
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  )
}

export default FavoriteScreen
