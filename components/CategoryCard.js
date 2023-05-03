import { View, Text, Image ,TouchableOpacity} from 'react-native'
import React from 'react'

import sanityClient from '../sanity'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)

const urlFor = (src) => builder.image(src)

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className='relative mr-2'>
        <Image 
          source={{
            uri: urlFor(imgUrl).width(200).toString(),
          }}
          className='h-20 w-20 rounded' 
        />
        <Text className='absolute bottom-1 left-1 text-white font-bold'>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard