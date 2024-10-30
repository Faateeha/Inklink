"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/auth";
import incrementReadCount from "@/app/readCount";  // Import the function

const Read: React.FC = () => {
  const user: { name: string; avatar: string } | null = useAuth();
  const [fetchedStories, setFetchedStories] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch stories from Firebase
  const fetchStories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "stories"));
      const storiesFromFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFetchedStories(storiesFromFirebase); // Set the fetched stories in state
    } catch (error) {
      console.error("Error fetching stories:", error);
    }  finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  
  const allStories = [ ...fetchedStories];

  // Extract all unique tags
  const allTags = Array.from(
    new Set(allStories.flatMap((story) => story.tags))
  );

  // Filter stories based on selected tag
  const filteredStories = selectedTag
    ? allStories.filter((story) => story.tags.includes(selectedTag))
    : allStories;

    const handleReadPost = async (storyId: string) => {
      if (user) {
        try {
          await incrementReadCount(storyId);
          // Navigate to the post details page
        } catch (error) {
          console.error("Error handling read post:", error);
        }
      }
    };

  return (
    <div className="flex justify-between w-full p-8">
      {/* Left section (75%) */}
      <div className="w-full md:w-3/4">
        {filteredStories.map((story, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between p-6 md:mr-8 rounded-lg shadow-lg mb-4 transition-transform transform hover:scale-105"
          >
            {/* Image */}
            <div className="w-full md:w-1/3 order-1 md:order-none mt-4 md:mt-0 ml-0 md:ml-6 md:pr-4">
              <Image
                src={story.imageUrl || story.image || 'images/inklink-1.jpg'} // Image URL from Firebase or default story
                alt="story image"
                width={500}
                height={250}
                className="rounded-lg object-cover w-full h-auto shadow-md"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-2/3 order-2 md:order-none">
              <h2 className="text-3xl font-bold text-amber-500 mb-2">
                {story.title}
              </h2>
              <p className="text-base mb-4">
                {story.content.substring(0, 250)}...
              </p>
              
              {/* Author */}
              <p className="text-sm text-gray-500">
                Written by: {story.author || user?.name || "Anonymous"}
              </p>

              {/* Read Count */}
              <p className="text-sm text-gray-500">
                Reads: {story.readCount || 0}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {story.tags.map((tag: string, tagIndex: number) => (
                  <span
                    key={tagIndex}
                    className="border-2 border-amber-200 px-2 py-1 rounded-full text-sm "
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Conditionally render the "Read Post" button based on login status */}
              {user ? (
                <Link href={`/main/read/${story.id}`}>
                  <button
                    onClick={() => handleReadPost(story.id)}
                    className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors"
                  >
                    Read Post
                  </button>
                </Link>
              ) : (
                <button
                  className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  title="You need to log in to read this post"
                  disabled
                >
                  Read Post
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Right section (Tags) */}
      <div className="hidden md:block w-1/4 p-6 rounded-lg shadow-lg fixed right-8 h-[100vh] top-[6rem]">
        <h3 className="text-xl font-semibold text-white mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag, index) => (
            <span
              key={index}
              className={`border-amber-200 border-2 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-amber-400 transition-colors ${
                selectedTag === tag ? "bg-amber-600" : ""
              }`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Read;




