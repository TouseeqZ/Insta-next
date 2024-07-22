// Post.tsx
import React from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import LikeSection from './LikeSection';
// Define the structure of a Post
interface PostData {
  profileImg: string | StaticImport;
  usename: string;
  id: string;
  title: string;
  image:string | StaticImport;
  content: string;
  caption?: string; // Include other fields like caption if needed
}

// Define the props for the Post component
interface PostProps {
  post: PostData;
}

function Post({ post }: PostProps) {
  return (
    
    <div className='bg-white my-7 border rounded-md'>
    <div className='flex items-center p-5 border-b border-gray-200'>
        <Image src={post.profileImg} alt={post.usename}
        width={50}
        height={40} 
        className='h-12 rounded-full object-cover border p-1 mr-3'
        />
        <p className='flex-1 font-bold'>{post.usename}</p>
        <HiOutlineDotsVertical className='h-5 cursor-pointer'/>
    </div>
    
    <Image src={post.image} alt={post.caption || 'Post Image'}
    width={300}
    height={300}
    className='object-cover w-full'/>

    <LikeSection id={post.id}/>

  <p className='p-5 truncate'>
      <span className='font-bold mr-2'>{post.usename}</span>
      {post.caption}
    </p>
    </div>
  );
}

export default Post;
