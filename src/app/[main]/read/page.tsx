'use client';
import React, {useState} from "react";
import Image from "next/image";
import Link from 'next/link'

   export const stories = [
    {
      title: "The Story of the Inklink",
      content:
        "This is the story of the Inklink. It all started in a small town in the middle of nowhere. The town was called Inkwell, and it was known for its beautiful landscapes and friendly people. The town was also home to a group of writers who called themselves the Inklink. The Inklink was a group of writers who loved to write stories about the town and its people. They would meet every week at the local coffee shop to share their stories and give each other feedback. The Inklink was a close-knit group, and they all shared a love of writing and storytelling. They were always looking for new members to join their group, and they welcomed anyone who shared their passion for writing. The Inklink was a special place where writers could come together to share their stories and support each other in their writing journey.",
      image: "/Images/inklink-1.jpg",
      date: "2021-10-10",
      tags: ["Writing", "Storytelling", "Inspiration"]
    },
    {
      tittle: "Introduction to Writing",
      content:
        "Writing is an art form that has been around for centuries. It is a way for people to express themselves and share their thoughts and ideas with others. Writing can take many forms, from poetry and short stories to novels and plays. It is a powerful tool that can be used to inform, entertain, and inspire others. Writing is a skill that can be learned and developed over time. It takes practice and dedication to become a good writer, but anyone can learn to write with time and effort. Writing is a rewarding and fulfilling activity that can bring joy and satisfaction to those who practice it. Whether you are a beginner or an experienced writer, there is always something new to learn and discover about the art of writing.",
      image: "/Images/inklink-1.jpg",
      date: "2024-05-12",
      tags: ["Writing", "Creativity", "Skill Development"],
    },
  ];
  const Read: React.FC = () => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(stories.flatMap((story) => story.tags)));

  // Filter stories based on selected tag
  const filteredStories = selectedTag
    ? stories.filter((story) => story.tags.includes(selectedTag))
    : stories;
  return (
    <div className="flex justify-between w-full p-8">
      {/* Left section (75%) */}
      <div className="w-3/4">
        {stories.map((story, index) => (
          <div
            key={index}
            className="flex justify-between p-6 rounded-lg shadow-lg mb-4 transition-transform transform hover:scale-105"
          >
            {/* Text Content (left) */}
            <div className="w-2/3">
              <h2 className="text-3xl font-bold text-amber-500 mb-2">
                {story.title}
              </h2>
              <p className="text-white text-base mb-4">
                {story.content.substring(0, 250)}... {/* Shortened content */}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {story.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-white text-black px-2 py-1 rounded-full text-sm "
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/read/${index}`}>
                <button className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors">
                  Read Post
                </button>
              </Link>
            </div>
  
            {/* Image (right) */}
            <div className="w-1/3 ml-4">
              <Image
                src={story.image}
                alt="story image"
                width={500}
                height={250}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        ))}
      </div>
  
      {/* Right section (Fixed, 25%) */}
      <div className="w-1/4  p-6 rounded-lg shadow-lg fixed right-8 h-[80vh] top-[6rem]">
      <h3 className="text-xl font-semibold text-white mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag, index) => (
            <span
              key={index}
              className={`bg-white text-black px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-amber-400 transition-colors ${
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