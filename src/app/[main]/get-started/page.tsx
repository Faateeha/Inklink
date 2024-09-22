'use client';

import React, { useState } from 'react';
import { db, storage } from "@/app/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Box, Button, Input, FormControl, FormLabel, Textarea, Spinner, Tag, TagLabel, Flex, TagCloseButton,
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // Initialize useRouter

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  // Handle tag input change
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  // Add a tag to the list
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // Remove a tag from the list
  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  // Submit the form
  const handleSubmit = async () => {
    if (typeof window === 'undefined') {
      // Skip if this is being run in a server environment
      return;
    }
  
    // Basic validation
    if (!title || !content || !image) {
      setError('Please fill all fields.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      // Step 1: Upload Image to Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
  
      // Step 2: Save Content to Firebase Firestore
      await addDoc(collection(db, 'stories'), {
        title,
        content,
        imageUrl,
        tags,
        createdAt: serverTimestamp(),
      });
  
      alert('Content submitted successfully!');
      router.push('/main/read'); // Redirect to the Read page
    } catch (error) {
      console.error('Error adding document:', error);
      setError('Error submitting content. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box className="container mx-auto px-4 py-10">
      <FormControl id="title" mb={4} isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your story title"
        />
      </FormControl>

      <FormControl id="content" mb={4} isRequired>
        <FormLabel>Content</FormLabel>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your story..."
        />
      </FormControl>

      <FormControl id="image" mb={4} isRequired>
        <FormLabel>Image</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </FormControl>

      <FormControl id="tags" mb={4}>
        <FormLabel>Tags</FormLabel>
        <Flex>
          <Input
            type="text"
            value={tagInput}
            onChange={handleTagInputChange}
            placeholder="Add a tag"
            mr={2}
          />
          <Button onClick={handleAddTag} colorScheme="orange">
            Add Tag
          </Button>
        </Flex>
        <Flex wrap="wrap" mt={2}>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="orange"
              mr={2}
              mb={2}
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveTag(tag)} />
            </Tag>
          ))}
        </Flex>
      </FormControl>

      {error && <Box color="red.500" mb={4}>{error}</Box>}

      <Button
        onClick={handleSubmit}
        isLoading={loading}
        loadingText="Submitting"
        colorScheme="orange"
        size="lg"
      >
        Submit Story
      </Button>

      {/*{loading && <Spinner size="xl" mt={4} />}*/}
    </Box>
  );
};

export default WritePage;


