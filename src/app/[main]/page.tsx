import React from 'react'
import { Box, Heading, Text, VStack, Divider } from "@chakra-ui/react";

function OurStory() {
  return (
    <Box className="min-h-[100vh] p-8 ">
      <Heading as="h1" size="2xl" className="mb-8 text-center">
        Our Story
      </Heading>

      <VStack spacing={8} align="start">
        <Box>
          <Heading as="h2" size="lg" className="text-amber-500 mb-2">
            About Inklink
          </Heading>
          <Text fontSize="md">
            Welcome to Chatter, the ultimate platform for readers and writers! Chatter is where stories come to life, ideas are shared, and creativity knows no bounds. Whether you&quots;re here to discover new content, share your thoughts, or connect with your favorite writers, Chatter provides the perfect space for literary exploration.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" className="text-amber-500 mb-2">
            Our Mission
          </Heading>
          <Text fontSize="md">
            At Chatter, our mission is to create a dynamic community where readers and writers can connect, inspire, and grow together. We believe in the power of words to change the world, and our goal is to provide a platform that nurtures creativity, fosters engagement, and celebrates the art of writing.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" className="text-amber-500 mb-4">
            Key Features
          </Heading>
          <VStack align="start" spacing={3}>
            <Text fontSize="md" className="font-bold">Read and Explore</Text>
            <Text fontSize="md">
              Dive into a diverse world of content created by writers from around the globe. Whether it&quots;s fiction, non-fiction, poetry, or essays, Chatter has something for every reader.
            </Text>

            <Text fontSize="md" className="font-bold">Write and Share</Text>
            <Text fontSize="md">
              Have a story to tell? Chatter offers a user-friendly writing platform where you can craft your content and share it with a wide audience.
            </Text>

            <Text fontSize="md" className="font-bold">Like and Comment</Text>
            <Text fontSize="md">
              Engage with the community by liking and commenting on your favorite pieces. Share your thoughts and connect with other readers and writers.
            </Text>

            <Text fontSize="md" className="font-bold">Bookmark</Text>
            <Text fontSize="md">
              Never lose track of a great story again. Bookmark your favorite pieces and come back to them whenever you like.
            </Text>

            <Text fontSize="md" className="font-bold">Follow Writers</Text>
            <Text fontSize="md">
              Stay updated with the latest from your favorite writers. Follow them to get notified whenever they publish new content.
            </Text>

            <Text fontSize="md" className="font-bold">Personalized Feed</Text>
            <Text fontSize="md">
              Get a personalized feed tailored to your reading interests, making it easy to discover content that resonates with you.
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="lg" className="text-amber-500 mb-2">
            Why Choose Inklink
          </Heading>
          <Text fontSize="md">
            Chatter is designed for those who love to read and write. Our platform is not just about content consumption; it&quots;s about building a community of like-minded individuals who appreciate the written word. With Chatter, you can easily engage with content, discover new writers, and become part of a thriving literary community.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" className="text-amber-500 mb-2">
            Our Story
          </Heading>
          <Text fontSize="md">
            Chatter was created by a group of passionate readers and writers who wanted to build a space where creativity and community could flourish. We recognized the need for a platform that goes beyond basic content sharing, offering tools that allow users to interact meaningfully with both the content and each other. Since its launch, Chatter has become a go-to destination for anyone who loves storytelling and the exchange of ideas.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" className="text-amber-500 mb-2">
            Join the Community
          </Heading>
          <Text fontSize="md">
            Chatter is more than just an app; it&quots;s a community of storytellers and readers. We invite you to join us and be part of a platform that values creativity, engagement, and the love of reading and writing. Whether you&quots;re here to read, write, or simply connect, there&quots;s a place for you in the Chatter community.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" className="text-amber-500 mb-2">
            Get in Touch
          </Heading>
          <Text fontSize="md">
            We’d love to hear from you! If you have any questions, feedback, or ideas, feel free to reach out to us at support@inklink.com. Follow us on social media to stay updated on the latest news and features from Chatter.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}

export default OurStory;