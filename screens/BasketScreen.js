import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useMemo, useState, useEffect } from 'react'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'
import Currency from 'react-currency-formatter'

const BasketScreen = () => {

  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
  const [groupedItemInBasket, setGroupItemInBasket] = useState([])
  const dispatch = useDispatch()
  const basketTotal = useSelector(selectBasketTotal)

  // Group the same items to one specific group 
  useEffect(() => {
    const groupedItems = items.reduce((results, item)=> {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupItemInBasket(groupedItems)
  }, [items])

  return (    
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-gray-100 '>
        <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>{restaurant.title}</Text>
          </View>
          
          <TouchableOpacity
            onPress={navigation.goBack}
            className='rounded-full bg-gray-100 absolute top-3 right-5'
          >
            <XCircleIcon size={50} color='#00CCBB' />
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center space-x-4 p-4 py-3 bg-white my-5'>
          <Image 
            className='h-7 w-9 bg-gray-400 p-4 rounded-full'
            source={{
              uri: 'http://links.papareact.com/wru',
            }} 
          />
          <Text>Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className='text-[#00CCBB]'>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className='divide-y divide-gray-100'>
          {Object.entries(groupedItemInBasket).map(([key, items])=> (
            <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'> 
              <Text>{items.length} x</Text>
              {/* <Image 
                className='h-12 w-12 rounded-full'
                source={{uri: urlFor(items[0].image.toString())  
              }}
              /> */}
              <Text className='flex-1'>{ items[0]?.name }</Text>

              <Text className='text-gray-500'>
                <Currency quantity={items[0]?.price} currency='VND' />
              </Text>

              <TouchableOpacity>
                <Text 
                  className='text-[#00CCBB] text-xs'
                  onPress={()=> dispatch(removeFromBasket( { id: key } ))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>
              <Currency quantity={basketTotal} currency='VND' />
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery fee</Text>
            <Text className='text-gray-400'>
              <Currency quantity={19000} currency='VND' />
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className=''>Order total</Text>
            <Text className='font-extrabold'>
              <Currency quantity={basketTotal + 19000} currency='VND' />
            </Text>
          </View>

          <TouchableOpacity onPress={()=> navigation.navigate('PreparingOrder')} className='rounded-lg bg-[#00CCBB] p-4'>
            <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen