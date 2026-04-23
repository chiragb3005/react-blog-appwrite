import React from 'react'
import appwriteService from "../appwrite/conf"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {

    return (
        <Link to={`/post/${$id}`}>
            <article className='post-card animate-rise'>
                <div className='relative aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,rgba(212,101,61,0.12),rgba(30,36,51,0.08))]'>
                    {featuredImage ? (
                        <img
                            src={appwriteService.getFilePreview(featuredImage)}
                            alt={title}
                            className='h-full w-full object-cover transition duration-300 hover:scale-[1.03]'
                        />
                    ) : (
                        <div className='flex h-full items-center justify-center px-8 text-center font-[Georgia] text-2xl text-slate-500'>
                            Story cover
                        </div>
                    )}
                </div>
                <div className='flex flex-1 flex-col gap-3 p-5'>
                    <span className='eyebrow w-fit'>Article</span>
                    <h2 className='font-[Georgia] text-2xl font-bold leading-tight tracking-[-0.03em] text-slate-900'>
                        {title}
                    </h2>
                    <p className='text-sm leading-7 text-slate-600'>
                        Open the full post, read the published content, or jump into editing if you authored it.
                    </p>
                </div>
            </article>
        </Link>
    )
}


export default PostCard
