import sanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

export default sanityClient({
    projectId: 'tudenb47',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2021-10-21',
})


const builder = imageUrlBuilder(sanityClient);


export const urlFor = (src) => builder.image(src);
