import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Currency from 'react-currency-formatter'
import { ArrowRightIcon, MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithID } from '../features/basketSlice'

const DishRow = ({ id, name, description, price, image }) => {

  const [isPressed, setIsPressed] = useState(false)
  const items = useSelector(state => selectBasketItemsWithID(state, id))
  const dispatch = useDispatch()

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }))
  }

  const removeItemFromBasket = () => {
    if (!items.length > 0) {
      return;
    }
    dispatch(removeFromBasket({ id }))
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${isPressed && 'border-b-0'
          }`}
      >
        <View className='flex-row'>
          <View className='flex-1 pr-2'>
            <View>
              <Text className='text-lg mb-1'>{name}</Text>
              <Text className='text-gray-400'>{description}</Text>
              <Text className='text-gray-400 mt-2'>
                <Currency quantity={price} currency='VND' />
              </Text>
            </View>
          </View>

          <View>
            <Image
              style={{ borderWidth: 1, borderColor: '#F3F3F4' }}
              source={{
                uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Freturntofreedom.org%2Fstore%2Fdefault-placeholder%2F&psig=AOvVaw3BMgN2nXI7y_SnTv00Y7IB&ust=1683025802172000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCODP1-r90_4CFQAAAAAdAAAAABAE'
              }}
              className='h-20 w-20 bg-gray-300 p-4'
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Adjust quantity */}
      {isPressed && (
        <View className='bg-white px-4'>
          <View className='flex-row items-center space-x-2 pb-3'>
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon
                color={items.length > 0 ? '#00CCBB' : 'gray'}
                size={40}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon
                size={40}
                color='#00CCBB'
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default DishRow