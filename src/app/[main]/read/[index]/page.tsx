'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // useParams for dynamic routing
import Image from 'next/image';
import { FaThumbsUp, FaBookmark, FaRegCommentDots } from 'react-icons/fa'; // Icons for like, bookmark, and comment
import { defaultStories } from '@/app/[main]/read/page'; // Correct import path to stories array
import { auth } from '@/app/firebase'; // Import your auth provider hook for user info
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
   // Adjust the import path as necessary
  
  const user = useAuth(); // Get logged-in user's data (name, avatar)
  const params = useParams(); // Get the dynamic params
  const { index } = params || {}; // Destructure index from params

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]); // For storing user comments

  useEffect(() => {
    if (index) {
      // Check localStorage for like, bookmark, and comment states on initial load
      const savedLiked = localStorage.getItem(`liked-${index}`);
      const savedBookmarked = localStorage.getItem(`bookmarked-${index}`);
      const savedComments = localStorage.getItem(`comments-${index}`);

      if (savedLiked) setLiked(JSON.parse(savedLiked));
      if (savedBookmarked) setBookmarked(JSON.parse(savedBookmarked));
      if (savedComments) setComments(JSON.parse(savedComments));
    }
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
        user: user?.name || 'Anonymous', // Use logged-in user's name or fallback
        avatar: user?.avatar || '/default-avatar.png', // Use logged-in user's avatar or fallback
        content: comment,
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setComment(''); // Clear the input after submission
      localStorage.setItem(`comments-${index}`, JSON.stringify(updatedComments)); // Save comments to localStorage
    }
  };

  // If the index doesn't exist yet
  if (!index) return <p>Loading...</p>;

  // Get the specific story using the index
  const story = defaultStories[parseInt(index as string)];

  // If no story is found with that index
  if (!story) return <p>Post not found.</p>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-amber-500 mb-4">{story.title}</h1>
      <p className="text-lg mb-6">{story.content}</p>
      <Image
        src={story.image}
        alt="story image"
        width={600}
        height={300}
        className="rounded-lg object-cover mb-4"
      />
      <p className="text-gray-500 mb-4">Published on: {story.date}</p>

      {/* Like, Bookmark, and Comment Section */}
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

      {/* Comment Section */}
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

        {/* Displaying comments */}
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







