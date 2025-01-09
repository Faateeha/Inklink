"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { FaThumbsUp, FaBookmark } from 'react-icons/fa';
import { db } from '@/app/firebase'; // Firebase setup  
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '@/app/auth';
//import incrementReadCount from "@/app/readCount";

interface Story {
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  likes?: string[];
  bookmarks?: string[];
  comments?: Comment[];
}

interface Comment {
  user: string;
  avatar: string;
  content: string;
}

const Post: React.FC = () => {
  const user = useAuth() as { uid: string; name: string; avatar: string } | null;
  const router = useRouter();
  const { storyId: id } = useParams();
  const [story, setStory] = useState<Story | null>(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const [bookmarkLoading, setBookmarkLoading] = useState<boolean>(false);

  const fetchStory = async () => {
    if (!id) return;
    try {
      const storyRef = doc(db, 'stories', id as string);
      const storySnap = await getDoc(storyRef);

      if (storySnap.exists()) {
        const storyData = storySnap.data();
        const formattedStory: Story = {
          title: storyData.title,
          content: storyData.content,
          imageUrl: storyData.imageUrl,
          date: storyData.date,
          likes: storyData.likes || [],
          bookmarks: storyData.bookmarks || [],
          comments: storyData.comments || [],
        };
        setStory(formattedStory);
        setLiked(storyData.likes?.includes(user?.uid || '') ?? false);
        setBookmarked(storyData.bookmarks?.includes(user?.uid || '') ?? false);
        setComments(storyData.comments || []);
        setLoading(false);

        if (user) {
          return;
        }
      } else {
        console.error('No story found for ID:', id);
      }
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  useEffect(() => {
    fetchStory();
  }, [id]);

  const toggleLike = async () => {
    if (!user) return;
    const storyRef = doc(db, 'stories', id as string || '');
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeLoading(true);

    try {
      if (newLikedState) {
        await updateDoc(storyRef, {
          likes: arrayUnion(user.uid),
        });
      } else {
        await updateDoc(storyRef, {
          likes: arrayRemove(user.uid),
        });
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    } finally {
      setLikeLoading(false);
    }
  };

  const toggleBookmark = async () => {
    if (!user) return;
    const storyRef = doc(db, 'stories', id as string || '');
    const newBookmarkedState = !bookmarked;
    setBookmarked(newBookmarkedState);
    setBookmarkLoading(true);

    try {
      if (newBookmarkedState) {
        await updateDoc(storyRef, {
          bookmarks: arrayUnion(user.uid),
        });
      } else {
        await updateDoc(storyRef, {
          bookmarks: arrayRemove(user.uid),
        });
      }
    } catch (error) {
      console.error('Error updating bookmark status:', error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!user || !comment.trim()) return;
    const storyRef = doc(db, 'stories', id as string || '');

    try {
      await updateDoc(storyRef, {
        comments: arrayUnion({
          user: user.name,
          avatar: user.avatar,
          content: comment,
        }),
      });
      setComments([...comments, {
        user: user.name,
        avatar: user.avatar,
        content: comment,
      }]);
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) return <div className="loader">Loading...</div>; // Use a loader component here

  if (!story) return <div className="loader">Loading...</div>; // Use a loader component here

  return (
    <div className="p-6">
      {/* Story details */}
      <h1 className="text-4xl font-bold mb-4 text-amber-400">{story.title}</h1>
      <Image
        src={story.imageUrl}
        alt={story.title}
        width={400}
        height={200}
        className=" mb-4"
      />
      <p className="text-lg mb-4">{story.content}</p>

      {/* Actions */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded ${liked ? 'bg-red-500 text-white' : 'bg-white'}`}
          disabled={likeLoading}
        >
          <FaThumbsUp />
          <span>{liked ? 'Liked' : 'Like'}</span>
        </button>
        <button
          onClick={toggleBookmark}
          className={`flex items-center gap-2 px-4 py-2 rounded ${bookmarked ? 'bg-yellow-500 text-white' : 'bg-white'}`}
          disabled={bookmarkLoading}
        >
          <FaBookmark />
          <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Comments</h2>
        <div className="mb-4">
          {comments.map((comment, index) => (
            <div key={`${comment.user}-${index}`} className="flex gap-4 mb-2">
              <Image
                src={comment.avatar}
                alt={comment.user}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{comment.user}</p>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCommentSubmit}
            className="px-2 py-2 bg-amber-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;


