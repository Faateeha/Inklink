'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaThumbsUp, FaBookmark, FaRegCommentDots } from 'react-icons/fa';
import { defaultStories } from '@/app/[main]/stories'; // Local stories
import { db } from '@/app/firebase'; // Firebase setup
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/app/auth';

interface Story {
  title: string;
  content: string;
  image: string;
  date: string;
}

interface Comment {
  user: string;
  avatar: string;
  content: string;
}

const Post = () => {
  const user = useAuth(); // Get logged-in user's data (name, avatar)
  const { index } = useParams<{ index: string }>();
   // Get the dynamic params

  const [story, setStory] = useState<Story | null>(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        if (index) {
          console.log(`Fetching story with index: ${index}`);
          const storyRef = doc(db, 'stories', index);
          const storySnap = await getDoc(storyRef);
  
          if (storySnap.exists()) {
            console.log('Story found in Firebase:', storySnap.data());
            setStory(storySnap.data() as Story);
          } else {
            console.log('Story not found in Firebase, checking local stories...');
            const localStory = defaultStories[parseInt(index as string)];
            if (localStory) {
              console.log('Story found in local stories:', localStory);
              setStory(localStory);
            } else {
              console.error('Story not found in local stories.');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };
  
    fetchStory();
  }, [index]);
  

  const toggleLike = () => {
    setLiked(!liked);
    localStorage.setItem(`liked-${index}`, JSON.stringify(!liked));
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    localStorage.setItem(`bookmarked-${index}`, JSON.stringify(!bookmarked));
  };

  const handleCommentSubmit = () => {
    if (comment.trim() && user) {
      const newComment = {
        user: user?.name || 'Anonymous',
        avatar: user?.avatar || '/default-avatar.png',
        content: comment,
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setComment('');
      localStorage.setItem(`comments-${index}`, JSON.stringify(updatedComments));
    }
  };

  if (!story) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-amber-500 mb-4">{story.title}</h1>
      <p className="text-lg mb-6">{story.content}</p>
      <Image
        src={story.image }
        alt="story image"
        width={600}
        height={300}
        className="rounded-lg object-cover mb-4"
      />
      <p className="text-gray-500 mb-4">Published on: {story.date}</p>

      <div className="flex items-center gap-4 mb-6">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${liked ? 'text-amber-500' : 'text-gray-600'}`}
          onClick={toggleLike}
        >
          <FaThumbsUp /> {liked ? 'Liked' : 'Like'}
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${bookmarked ? 'text-amber-500' : 'text-gray-600'}`}
          onClick={toggleBookmark}
        >
          <FaBookmark /> {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600">
          <FaRegCommentDots /> Comment
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Comments</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-4 rounded-lg border-2 border-gray-300 focus:border-amber-500 mb-4"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors"
        >
          Post Comment
        </button>

        {comments.length > 0 && (
          <div className="mt-6">
            {comments.map((comment, idx) => (
              <div key={idx} className="flex gap-4 mb-4 border-b pb-2">
                <Image
                  src={comment.avatar}
                  alt="user avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{comment.user}</p>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
