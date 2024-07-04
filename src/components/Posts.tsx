import { app } from '@/firebase';
import {collection,getDocs,getFirestore,orderBy,query} from 'firebase/firestore';
import Post from './Post';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
// Define the structure of a Post
interface PostData {
  profileImg: string | StaticImport;
  usename: string;
  id: string;
  title: string;
  image:string | StaticImport;
  content: string;
  caption?:string
  
  // Add other fields that your post document might have
}
export default async function Posts(){
  const  db=getFirestore(app);
  const q =query(collection(db,'posts'),orderBy('timestamp','desc'));
  const querySnapshot = await  getDocs(q);
  const data: PostData[] = [];
  querySnapshot.forEach((doc) => {
    // Type assertion for Firestore data
    const postData = doc.data() as Omit<PostData, 'id'>;
    data.push({ id: doc.id, ...postData });
  });

  return (
    <div>
      {data.map((post) =>(
        <Post key={post.id} post={post}/>
      ))}
      
    </div>
  )
}
