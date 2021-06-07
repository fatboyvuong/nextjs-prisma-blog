import { GetStaticPaths, GetStaticProps } from "next";
import HEAD from "next/head";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { IPost } from "../types";
import * as React from "react";
import Post from "../components/Post";
import { Container, Box, Flex, Text, Heading, Image } from "@chakra-ui/react";

const prisma = new PrismaClient();

// Run in server-side to generate posts at build-time
export const getStaticProps: GetStaticProps = async () => {
  // Select all posts if we dont specify any condition
  // prisma.post.findMany({ take: 10 }) => get first 10 items
  // prisma.post.findMany({ title: true }) => get only title
  const posts = await prisma.post.findMany()

  return {
    props: {
      posts, // shorthand of  { posts: posts } in ES6
    },
    revalidate: 1
  };
};

interface HomeProps {
  posts: IPost[];
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  const coverBaseUrl = "https://picsum.photos/id";
  return (
    <Box
      padding="4"
      w="100%"
      maxW="1200"
      h="100vh"
      mx="auto"
      sx={{ columnCount: [1, 2, 4], columnGap: "10px" }}
    >
      {props.posts.map((post, index) => (
        <>
          <Image
            w="100%"
            borderRadius="xl"
            mb="2"
            d="inline-block"
            src={`${coverBaseUrl}/${Math.floor(Math.random() * 500)}/300/300`}
          />
          <Link key={index} href={`post/${index}`}>
            <Heading as="h4">{post.title}</Heading>
          </Link>
          <Text color="blackAlpha.900" noOfLines={[1, 2, 3]}>
            {post.excerpt}
          </Text>
        </>
      ))}
    </Box>
  );
};

export default Home;
