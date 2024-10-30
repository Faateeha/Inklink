'use client'
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/app/firebase'; // Ensure this path is correct

// Function to increment read count
const incrementReadCount = async (storyId: string) => {
  if (!storyId) {
    console.error('Invalid storyId:', storyId);
    return;
  }

  try {
    const storyRef = doc(db, 'stories', storyId);
    await updateDoc(storyRef, {
      readCount: increment(1),
    });
    console.log('Read count incremented for storyId:', storyId);
  } catch (error) {
    console.error('Error incrementing read count:', error);
  }
};

export default incrementReadCount;
