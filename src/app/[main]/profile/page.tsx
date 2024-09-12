'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/app/firebase";
import { Box, Text, Button, VStack, Flex, Spinner, Center, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input, useDisclosure, Tag, TagLabel, TagCloseButton, Wrap, WrapItem, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Profile: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [profile, setProfile] = useState({
    username: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    tags: [] as string[]
  });
  const [inputTag, setInputTag] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(firestore, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as any);
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleAddTag = () => {
    if (inputTag && !profile.tags.includes(inputTag)) {
      setProfile(prev => ({
        ...prev,
        tags: [...prev.tags, inputTag]
      }));
      setInputTag('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleBioSubmit = async () => {
    if (user) {
      try {
        const docRef = doc(firestore, 'profiles', user.uid);
        await setDoc(docRef, profile, { merge: true });
        toast({
          title: "Profile Updated.",
          description: "Your bio has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        // Fetch updated profile data to ensure the UI reflects changes
        const updatedDocSnap = await getDoc(docRef);
        if (updatedDocSnap.exists()) {
          setProfile(updatedDocSnap.data() as any);
        }
      } catch (error) {
        toast({
          title: "Update Failed.",
          description: "There was an error updating your profile. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="orange" />
      </Center>
    );
  }

  if (error) {
    return <Text color="red.500">Error: {error.message}</Text>;
  }

  return (
    <Box className="container px-4 py-20 max-w-4xl mx-auto" borderRadius="md" shadow="md">
      {user && (
        <VStack spacing={6} align="center">
          <Image
            src={user.photoURL || '/images/default-profile.png'}
            alt="User Profile"
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
            borderWidth={3}
            borderColor="amber.500"
            mb={4}
          />
          <Text fontSize="4xl" fontWeight="bold" color="amber.600">
            Hello, {user.displayName || user.email}
          </Text>
          <Text fontSize="lg" textAlign="center" mt={2}>
            Welcome to your dashboard. Here, you can manage your profile, view your activities, and access various features.
          </Text>
          <Text fontSize="md" textAlign="center" mt={2}>
            If you need any help, feel free to reach out to our support team.
          </Text>
          <Box textAlign="center" mt={6}>
            <Text fontSize="lg" fontWeight="semibold" color="amber.600">Username:</Text>
            <Text fontSize="md">{profile.username || 'Not set'}</Text>
            <Text fontSize="lg" fontWeight="semibold" color="amber.600" mt={4}>Twitter:</Text>
            <Text fontSize="md">{profile.twitter || 'Not set'}</Text>
            <Text fontSize="lg" fontWeight="semibold" color="amber.600" mt={4}>Facebook:</Text>
            <Text fontSize="md">{profile.facebook || 'Not set'}</Text>
            <Text fontSize="lg" fontWeight="semibold" color="amber.600" mt={4}>LinkedIn:</Text>
            <Text fontSize="md">{profile.linkedin || 'Not set'}</Text>
            <Text fontSize="lg" fontWeight="semibold" color="amber.600" mt={4}>Tags You Follow:</Text>
            <Wrap spacing={4} mt={2} justify="center">
              {profile.tags.map(tag => (
                <WrapItem key={tag}>
                  <Tag size="md" variant="solid" colorScheme="amber">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => handleTagRemove(tag)} />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
          <Flex direction="column" align="center" mt={6}>
            <Button onClick={onOpen} colorScheme="orange" mb={4} size="lg">
              Edit Bio
            </Button>
            <Flex wrap="wrap" justify="center" gap={4}>
              <Link href='/main/read'>
                <Button colorScheme="orange" size="lg" mr={4} mb={4}>
                  Continue Reading
                </Button>
              </Link>
              <Link href='/main/get-started'>
                <Button colorScheme="orange" size="lg">
                  Start Writing
                </Button>
              </Link>
            </Flex>
          </Flex>
        </VStack>
      )}

      {/* Modal for Editing Bio */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='black' color='white'>
          <ModalHeader>Edit Your Bio</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={profile.username}
                onChange={handleBioChange}
                placeholder="Enter your username"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Twitter Handle</FormLabel>
              <Input
                name="twitter"
                value={profile.twitter}
                onChange={handleBioChange}
                placeholder="Enter your Twitter handle"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Facebook Handle</FormLabel>
              <Input
                name="facebook"
                value={profile.facebook}
                onChange={handleBioChange}
                placeholder="Enter your Facebook handle"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>LinkedIn Handle</FormLabel>
              <Input
                name="linkedin"
                value={profile.linkedin}
                onChange={handleBioChange}
                placeholder="Enter your LinkedIn handle"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Tags</FormLabel>
              <Flex>
                <Input
                  value={inputTag}
                  onChange={(e) => setInputTag(e.target.value)}
                  placeholder="Add a tag"
                  mr={2}
                />
                <Button onClick={handleAddTag} colorScheme="amber">
                  Add Tag
                </Button>
              </Flex>
              <Wrap spacing={4} mt={2}>
                {profile.tags.map(tag => (
                  <WrapItem key={tag}>
                    <Tag size="md" variant="solid" colorScheme="orange">
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => handleTagRemove(tag)} />
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={handleBioSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Profile;







