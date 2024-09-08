import { useParams } from 'next/navigation'; // useParams for dynamic routing
import Image from 'next/image';
import { stories } from '@/app/[main]/read/page'; // Correct import path to stories array

interface Story {
  title: string;
  content: string;
  image: string;
  date: string;
}

const Post = () => {
  const params = useParams(); // Get the dynamic params
  const { index } = params || {}; // Destructure index from params

  // If the index doesn't exist yet
  if (!index) return <p>Loading...</p>;

  // Get the specific story using the index
  const story = stories[parseInt(index as string)];

  // If no story is found with that index
  if (!story) return <p>Post not found.</p>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-amber-500 mb-4">{story.title}</h1>
      <p className="text-lg text-white mb-6">{story.content}</p>
      <Image
        src={story.image}
        alt="story image"
        width={600}
        height={300}
        className="rounded-lg object-cover mb-4"
      />
      <p className="text-gray-500">Published on: {story.date}</p>
    </div>
  );
};

export default Post;


