import AsyncStorage from '@react-native-async-storage/async-storage'
import {useEffect, useState} from 'react'

const favoritesHandler = (isFocused) => {
  const [loading, setLoading] = useState(true)
  const [favoritesList, setfavoritesList] = useState([])

  useEffect(() => {
    const loadFavoritesList = async () => {
      try {
        const favoritesJSON = await AsyncStorage.getItem('favorites')
        if (favoritesJSON) {
          setfavoritesList(JSON.parse(favoritesJSON))
        } else if (favoritesJSON === null) {
          setfavoritesList([])
        }
      } catch (error) {
        console.log('Error loading favorites: ', error)
      } finally {
        setLoading(false)
      }
    }
    if (isFocused) {
      setLoading(true)
      loadFavoritesList()
    }
  }, [isFocused])

  const addToFavoritesList = async (orchid) => {
    if (!favoritesList.find((item) => item.id === orchid.id)) {
      const newFavoritesList = [...favoritesList, orchid]
      setfavoritesList(newFavoritesList)
      try {
        const favoritesListJSON = JSON.stringify(newFavoritesList)
        await AsyncStorage.setItem('favorites', favoritesListJSON)
      } catch (error) {
        console.log('Error saving favorites list:', error)
      }
    } else {
      const newFavoritesList = favoritesList.filter((item) => item.id !== orchid.id)
      setfavoritesList(newFavoritesList)
      try {
        const favoritesListJSON = JSON.stringify(newFavoritesList)
        await AsyncStorage.setItem('favorites', favoritesListJSON)
      } catch (error) {
        console.log('Error saving favorites list:', error)
      }
    }
  }

  const removeFavoriteItem = async (orchid) => {
    const newFavoritesList = favoritesList.filter((item) => item.id !== orchid.id)
    setfavoritesList(newFavoritesList)
    try {
      const favoritesListJSON = JSON.stringify(newFavoritesList)
      await AsyncStorage.setItem('favorites', favoritesListJSON)
    } catch (error) {
      console.log('Error saving favorites list at remove:', error)
    }
  }

  const removeAllFavoritesList = async () => {
    try {
      await AsyncStorage.removeItem('favorites')
      setfavoritesList([])
    } catch (error) {
      console.log('Error removing favorites list at remove all:', error)
    }
  }

  return {
    favoritesList,
    loading,
    setfavoritesList,
    removeFavoriteItem,
    removeAllFavoritesList,
    addToFavoritesList,
  }
}

export default favoritesHandler
