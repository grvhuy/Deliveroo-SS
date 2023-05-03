import { StyleSheet, Text, View, SafeAreaView, Image, Button, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'
import {
    SparklesIcon,
    ChevronDownIcon,
    UserIcon,
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon
} from "react-native-heroicons/outline";

import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity'

const HomeScreen = () => {

    const [featuredCategories, setFeaturedCategories] = useState([])

    useEffect(()=>{
        sanityClient
        .fetch(
            `
                *[_type == "featured"] {
                    ...,
                    restaurants[] -> {
                        ...,
                        dishes[]->
                    }
                }
            `
        )
        .then ((data) => {
            setFeaturedCategories(data)
        } )
    }, [])

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <SafeAreaView style={{ marginTop: 25 }}>
            {/* Header */}
            <View className="flex-row pb-3 items-center space-x-2 mx-4 px-2">
                <Image
                    style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
                    source={{ uri: 'http://links.papareact.com/wru' }}
                />
                <View className='flex-1'>
                    <Text className='font-bold text-gray-400 text-xs'>Delivery now!</Text>
                    <Text className='font-bold text-xl'>Current Location
                        <ChevronDownIcon size={20} color='#00CCBB' />
                    </Text>
                </View>
                <UserIcon color='#00CCBB' />
            </View>

            {/* Search */}
            <View className='flex-row items-center px-4'>
                <View className='flex-row flex-1 space-x-2 p-2 bg-gray-200'>
                    <MagnifyingGlassIcon color='#00CCBB' />
                    <TextInput
                        placeholder='Search something'
                        keyboardType='default' />
                </View>

                <AdjustmentsHorizontalIcon color='#00CCBB' />
            </View>

            {/* Body */}
            <ScrollView
                className='bg-gray-100'
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                {/* Categories */}

                <Categories />
                {/* Rows */}
                {/* Featured */}

                {featuredCategories?.map((category)=>(
                    <FeaturedRow 
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>

    )
}

export default HomeScreen
