import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Restaurant name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of restaurant',
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude of the restaurant',
    },
    {
      name: 'long',
      type: 'number',
      title: 'Longtitude of the restaurant',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address of restaurant'
    },
    {
      name: 'rating',
      type: 'number',
      title: '(1-5) stars',
      validation: (Rule) => 
      Rule.required()
        .min(1)
        .max(5)
        .error('Please enter 1 to 5')
    },
    {
      name: 'type',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      title: 'Category',
      to: [{ type: 'category' }]
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{ type: 'reference', to: [{ type:'dish' }] }]
    },
  ],

})
