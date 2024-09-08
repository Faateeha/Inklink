'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { Box, Text, Button, VStack, Flex, Spinner, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Profile: React.FC = () =>{
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to home or login if the user is not authenticated
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="amber.500" />
      </Center>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return(
    <Box className="container  px-4 py-20 text-white bg-black">
      {user && (
        <VStack spacing={4} align="start">
          <Text fontSize="3xl" fontWeight="bold">
            Hello, {user.displayName || user.email}
          </Text>
          <Text fontSize="md"  className="text-center">
            Welcome to your dashboard. Here, you can manage your profile, view your activities, and access various features.
          </Text>
          <Text fontSize="md" >
            If you need any help, feel free to reach out to our support team.
          </Text>
          <Flex className="sm:block">
          <Link href='/main/read'>
          <button className="p-3 bg-amber-600 hover:bg-amber-400 rounded-xl ml-5 mt-3 text-xl">
            Continue Reading
          </button></Link>
          <Link href='/main/get-started'>
          <button className="p-3 bg-amber-600 hover:bg-amber-400 rounded-xl ml-10 mt-3 text-xl">
            Start Writing
          </button></Link>
            
          </Flex>
        </VStack>
      )}
    </Box>
  )
}

export default Profile;