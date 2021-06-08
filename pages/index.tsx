import { Box, Heading, Text } from "@chakra-ui/react"
import { PrismaClient } from "@prisma/client"
import { GetStaticProps } from "next"
import Link from "next/link"
import * as React from "react"
import { IPost } from "../types"
import Image from 'next/image'

// import { useAmp } from 'next/amp'
// import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { readFile } from "fs/promises"
// import path from 'path'
// import { promisify } from 'util'

// export const config = { amp: 'hybrid' }

const prisma = new PrismaClient()

// Run in server-side to generate posts at build-time
export const getStaticProps: GetStaticProps = async () => {
  // Select all posts if we dont specify any condition
  // prisma.post.findMany({ take: 10 }) => get first 10 items
  // prisma.post.findMany({ title: true }) => get only title
  const posts = await prisma.post.findMany()

  // const projectDir = __dirname.split('.next')[0]
  // const customStyles = await readFile(
  //   path.join(projectDir, 'styles.css'),
  //   'utf-8'
  // )

  return {
    props: {
      posts, // shorthand of  { posts: posts } in ES6
    },
    revalidate: 1
  }
}

interface HomeProps {
  posts: IPost[]
}

// Setup for AMP (typescript only)
// declare namespace JSX {
//   interface IntrinsicElements {
//     [elemName: string]: any
//   }
// }

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'amp-img': any
//     }
//   }
// }

// Another way
// declare namespace JSX {
//   interface AmpImg {
//     alt?: string
//     src?: string
//     width?: string
//     height?: string
//     layout?: string
//   }
//   interface IntrinsicElements {
//     'amp-img': AmpImg
//   }
// }

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  const coverBaseUrl = "https://picsum.photos/id"

  // Define whether to use AMP mode or not
  // const isAMP = useAmp()

  return (
    <Box
      padding="4"
      w="100%"
      maxW="1200"
      h="100vh"
      mx="auto"
      sx={{ columnCount: [1, 2, 4], columnGap: "10px" }}
    >
      {/* Currently not support well for amp-custom */}
      {props.posts.map((post, index) => (
        <>
          {/* { isAMP ?
              <amp-img
                width="300"
                height="300"
                src={`${coverBaseUrl}/${index * 10}/300/300`}
                alt={`cover blog ${index}`} /> :
              <Image
                w="100%"
                borderRadius="xl"
                mb="2"
                d="inline-block"
                src={`${coverBaseUrl}/${index * 10}/300/300`}
                alt={`cover blog ${index}`}
              />
          } */}
          {/* <Image // Chakra Image component
            w="100%"
            borderRadius="xl"
            mb="2"
            d="inline-block"
            src={`${coverBaseUrl}/${index * 10}/300/300`}
            alt={`cover blog ${index}`} /> */}
          <Image
            src={`${coverBaseUrl}/${index * 10}/300/300`}
            width="300"
            height="300"
            layout="intrinsic"
            alt="blog cover image" />
          <Link key={index} href={`post/${index}`}>
            <Heading as="h4">{post.title}</Heading>
          </Link>
          <Text noOfLines={[1, 2, 3]}>
            {post.excerpt}
          </Text>
        </>
  ))
}
    </Box >
  );
};

export default Home
