import { PrismaClient } from '@prisma/client'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import * as React from 'react'
import { IPost } from '../../types'
import { ParsedUrlQuery } from 'querystring'
import Post from '../../components/Post'
import { Box, Center, Heading, Text } from '@chakra-ui/layout'

const prisma = new PrismaClient()

type PostDetail = {
    post: IPost
}

//
interface IParams extends ParsedUrlQuery {
    id: string
}

// Also run at build-time with dynamic routes
// get all posts and map id of each post to every path.
export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await prisma.post.findMany()

    const paths = posts.map((post) => ({
        params: { id: String(post.id) }
    }))

    return {
        paths,
        fallback: false, // no fallback if route not found
    }
}

// Run at build-time
// We cannot use getStaticProps only at build time because it need all paths generated, so must use both
// This params include all post ids generated from getStaticPath at build-time
// Then it will use it to pass to Prisma query to get blog post at build-time
export const getStaticProps: GetStaticProps = async (context) => {
    const post = await prisma.post.findUnique({ // old version uses findOne()
        where: {
            id: Number(context.params.id)
        }
    })

    return {
        props: {
            post
        },
        revalidate: 1 // NextJS will attempt to re-generate the page when: a request come in/ almost every 1 second
    }
}

const PostDetail: React.FC<PostDetail> = (props) => {
    const { post } = props

    return (
        <Center>
            <Box w="100vh" mb="4">
                <Heading as="h1" color="salmon" mt="4">{post.title}</Heading>
                <Text fontSize="xl" py="4">{post.excerpt}</Text>
            </Box>
        </Center>
    )
}

// This will run at server at request time
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const matchedPost = await prisma.post.findUnique({
//         where: {
//             id: Number(params.id)
//         }
//     })

//     return {
//         props: {
//             post: matchedPost
//         }
//     }
// }

export default PostDetail
