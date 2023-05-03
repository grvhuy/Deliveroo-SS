import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/solid'

import sanityClient from '../sanity'
import imageUrlBuilder from '@sanity/image-url'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setRestaurant } from '../features/restaurantSlice'

const builder = imageUrlBuilder(sanityClient)
const urlFor = (src) => builder.image(src)


const RestaurantScreen = () => {

    const navigation = useNavigation()
    const { params: {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat
    } } = useRoute()

    const dispatch = useDispatch()
    useEffect( ()=> {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        }))
    } , [dispatch])

    return (
        <>
            <BasketIcon />

            <ScrollView>
                {/* Restaurant BG + go back arrow */}
                <View className='relative'>
                    <Image
                        source={{
                            uri: urlFor(imgUrl).toString(),
                        }}
                        className='w-full h-56 bg-gray-200 p-4'
                    />

                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }} className='absolute top-8 left-2 p-2 rounded-full bg-gray-100'>
                        <ArrowLeftIcon size={20} color='#00CCBB' />
                    </TouchableOpacity>
                </View>

                <View className='bg-white'>
                    <View className='px-4 pt-4'>
                        <Text className='text-3xl font-bold'>{title}</Text>
                        <View className='flex-row space-x-4 my-1'>
                            {/* Rating */}
                            <View className='flex-row items-center space-x-1'>
                                <StarIcon size={22} color='green' opacity={0.5} />
                                <Text className='text-xs text-gray-400'>
                                    <Text className='text-green-500'>{rating}</Text> - {genre}
                                </Text>
                            </View>
                            {/* Location */}
                            <View className='flex-row items-center space-x-1'>
                                <MapPinIcon size={22} color='gray' opacity={0.4} />
                                <Text className='text-xs text-gray-400'>
                                    Nearby - <Text className='text-gray-400'>{address}</Text>
                                </Text>
                            </View>
                        </View>

                        <Text className='text-gray-400 mt-2 pb-4' >{short_description}</Text>
                    </View>
                    <TouchableOpacity className='flex-row space-x-2 p-4 border-y border-gray-200' >
                        <QuestionMarkCircleIcon color='gray' size={22} opacity={0.6} />
                        <Text className='font-bold flex-1'>You allergy to food ?</Text>
                        <ChevronRightIcon color='#00CCBB' size={22} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text className='px-4 pt-6 font-bold text-xl'>Menu</Text>

                    {/* Dishrows */}
                    {dishes.map((dish) => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen