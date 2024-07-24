'use client'
import { DocumentData } from 'firebase/firestore/lite';
import { app } from '../firebase';
import { QueryDocumentSnapshot, addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import  {useSession} from 'next-auth/react'
import Image from 'next/image';
import Moment from 'react-moment';
import { FormEvent, useEffect, useState } from 'react';
function CommentSection({ id }: { id: string }) {
    const {data:session} =useSession();
    const [comment,setComment]=useState('');
    const [comments,setComments]=useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const db=getFirestore(app);
     async function handleSubmit(e:FormEvent) {
        e.preventDefault();
        // Add comment to firestore
        const commentToPost = comment;
        setComment('');
        await addDoc(collection(db,'posts',id, 'comments'),
        {
            comment: comment,
            username: session?.user?.usename,
            userImage: session?.user?.image,
            timestamp: serverTimestamp(),
        });
        
     }

     useEffect(() =>{
        onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')),(snapshot) =>{
            setComments(snapshot.docs);
        })
     },[db]);
  return (
    <div>
        {comments.length > 0 &&(
            <div className='max-10 max-h-24 overflow-y-scroll'>
                {comments.map((comment,id) =>(
                    <div key={id} className='flex items-center space-x-2 mb-2 justify-between'>
                        <Image 
                        src={comment.data().userImage} 
                        alt={'userImage'}
                        height={26}
                        width={26}
                        className='h-7 rounded-full object-cover border p-[2px]'
                        />
                        <p className=' text-sm text-gray-500 flex-1 truncate'>
                            <span className='font-bold'>
                                {comment.data().username}
                            </span>
                            {' '} {comment.data().comment}
                        </p>
                        <Moment fromNow className='text-xs text-gray-400 pr-8'>
                            {comment.data().timestamp?.toDate()}
                        </Moment>
                    </div>
                ))}
            </div>
        )}

        {
            session && (
                <form onSubmit={handleSubmit} className='flex items-center p-4 gap-2'>
                    <Image src={session.user.image as string} 
                    alt='userimage'
                    width={26}
                    height={26}
                    className=' h-10 w-10 rounded-full border p-[4px] object-cover'
                    />
                    <input type='text'
                    value={comment }
                    onChange={(e)=> setComment(e.target.value)}
                    placeholder='Add a comment...'
                    className='border-none flex-1 focus:ring-0 outline-none'
                    />
                    <button
                    disabled={!comment.trim()}
                    type='submit'
                    className='text-blue-400 disabled:cursor-not-allowed
                     disabled:text-gray-400'
                    >
                        Post
                    </button>
                </form>
            )
        }
    </div>
  )
}

export default CommentSection