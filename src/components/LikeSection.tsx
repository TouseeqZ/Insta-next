'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiOutlineHeart,HiHeart } from "react-icons/hi";
import {app} from '../firebase';
import { QueryDocumentSnapshot, collection, getFirestore, onSnapshot, deleteDoc,
  doc, setDoc } from "firebase/firestore";
import { DocumentData } from "firebase/firestore/lite";
function LikeSection({ id }: { id: string }) {
    const {data:session} =useSession();
    const [hasLiked,setHasLiked]=useState(false);  
    const [Likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const db= getFirestore(app);
    useEffect(() =>{
     onSnapshot(collection(db,'posts',id,'likes'),
     (snapshot) => {
      setLikes(snapshot.docs);

     });
    }, [db]);

    useEffect(() =>{
      if(Likes.findIndex((like) => like.id === session?.user?.uid) !== -1) {
    setHasLiked(true);
  } else{
    setHasLiked(false);
  }
},[Likes]);

async function likePost(){
  if (!session?.user?.uid) return;
  if(hasLiked) {
    await deleteDoc(doc(db,'posts',id,'likes', session?.user?.uid));
  }
  else {

    if (session.user.usename) {
    await setDoc(doc(db,'posts',id, 'likes', session?.user?.uid),{
     username:session?.user?.usename,
    }
    );
  }
}
}
    
return (
    <div>
        {session && <div className="flex border-t border-gray-200 px-4 pt-4">
          <div className="flex items-center gap-2">
            {hasLiked?(
              <HiHeart 
               onClick={likePost}
               className="text-red-500 cursor-pointer text-3xl hover:scale-125 
              transition-transform duration-200 ease-out"/>
            ):(
              <HiOutlineHeart
               onClick={likePost}
               className="cursor-pointer text-3xl hover:scale-125 
              transition-transform duration-200 ease-out"/>
            )}
            {Likes.length >0 && (
              <p className="text-gray-500">
                {Likes.length} {Likes.length === 1 ? 'Like' :'Likes' }
              </p>
            )}
          </div>
        </div>

        }
    </div>
  )
}

export default LikeSection

