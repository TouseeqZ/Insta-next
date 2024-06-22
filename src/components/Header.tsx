'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { signIn,useSession,signOut } from 'next-auth/react' 

function Header() {
  const {data:session}=useSession();
  //console.log(session);
  return (
    <div className='shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
        <div className='flex justify-between items-center max-w-6xl mx-auto'>
            {/* logo */}
            <Link className='hidden lg:inline-flex' href={''}>
                <Image 
                src='/Instagram_logo_black-2.webp'
                width={96} height={96}
                alt='Instagram Logo'
                />            
            </Link>
            <Link className='lg:hidden'href={''}>
                <Image 
                src='/800px-Instagram_logo_2016.webp'
                width={40} height={40}
                alt='Instagram Logo'
                />            
            </Link>
            {/* search input */}
            <input type="text" placeholder='Search'
            className='bg-gray-50 border border-gray-200 rounded text-sm
             py-2 px-4 max-w-[210px]'  />

            {/* menu items */}
            {session?(
            <Image src={session.user?.image as string}
             alt={session.user?.name as string} className='h-10 w-10 rounded-full cursor-pointer'
             onClick={()=>signOut()}
             width={40} height={40}

             />
            ):(
            <button 
            onClick={() => signIn()} 
            className='text-sm font-semibold text-blue-500'>
            Log In
          </button>
           )}
        
        </div>
    </div>
  )
}

export default Header
