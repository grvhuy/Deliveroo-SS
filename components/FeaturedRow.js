import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import { useState } from 'react'

import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'

const FeaturedRow = ({ id, title, description }) => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        sanityClient
            .fetch(`
            *[_type == "featured" && _id==$id] {
                ...,
                restaurant[] -> {
                    ...,
                    dishes[]->,
                    type-> {
                    name
                    }
                },
            } [0]
                
            `,
                { id })
            .then(data => setRestaurants(data?.restaurant))
    }, [])

    return (
        <View>
            <View className='flex-row mt-4 items-center justify-between px-4'>
                <Text className='font-bold text-lg'>{title}</Text>
                <ArrowRightIcon color='#00CCBB' />
            </View>
            <Text className='text-xs text-gray-400 px-4'>{description}</Text>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                className='pt-4'
            >
                {/* RestaurantCards */}
                {restaurants?.map( (restaurant)=>(
                    <RestaurantCard 
                    key={restaurant._id}
                    id={restaurant._id}
                    imgUrl={restaurant.image}
                    title={restaurant.name}
                    rating={restaurant.rating}
                    short_description={restaurant.short_description}
                    address={restaurant.address}
                    genre={restaurant.type?.name}
                    dishes={restaurant.dishes}
                    long={restaurant.long}
                    lat={restaurant.lat}
                    />
                ) )}
            </ScrollView>
        </View>
    )
}

export default FeaturedRow