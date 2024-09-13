'use client'
import React, { useState } from 'react';
import { db, storage } from "@/app/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, Button, Input, FormControl, FormLabel, Textarea, Spinner, Tag, TagLabel, Flex } from "@chakra-ui/react";
import { useRouter } from 'next/router'; // Import useRouter

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const router = useRouter(); // Initialize useRouter

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!title || !content || !image) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload Image to Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Step 2: Save Content to Firebase Firestore
      const docRef = await addDoc(collection(db, 'stories'), {
        title,
        content,
        imageUrl,
        tags,
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
      alert('Content submitted successfully!');

      // Refresh the Read page
      router.push('/read'); // Redirect to the Read page
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error submitting content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="container mx-auto px-4 py-10">
      {/* Rest of the form content */}
      <Button
        onClick={handleSubmit}
        isLoading={loading}
        loadingText="Submitting"
        colorScheme="orange"
        size="lg"
      >
        Submit Story
      </Button>

      {loading && <Spinner size="xl" mt={4} />}
    </Box>
  );
};

export default WritePage;

