import React, { useEffect } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import {Button, Input, Select, RTE} from "../index";
import service from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PastForm (post) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post ?.title || "",
            slug: post ?.slug || "",
            content: post ?.content || "",
            status: post ?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)


    // making a async function to handle when post is submited to the backend and then display it in the frontend and its various cases
    // it is async cause uploading files, posts and creating all take time ---- need await so it doesnt crash
    // as these are API calls so need the await
    const submit = async (data) => {
            if(post){
            const image = data.image[0] ? service.uploadFile(data.image[0]) : null

            if(file){
                service.deleteFile(post.featuredImage)
            }
            const dbPost = await service.updatePost(post.$id, {
                ...data, 
                featuredImage: file ? file.$id : undefined
            })
            if (dbPost){
                navigate(`./post/${dbPost.$id}`)
            }
            else{
                // const file = await service.uploadFile(data.image[0])
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

                if (file){
                    const fileId = file.$id
                    data.featuredImage = fileId
                    const dbPost = await service.createPost({
                        ...data,
                        userId: userData.$id
                    })
                    if(dbPost){
                        navigate(`./post/${dbPost.$id}`)
                    }
                }
            }
        }   
    }

    // work is to watch title and then read it to pass it to slug
    // if user gives some space convert it ton " - "
    const slugTransform = useCallback((value) => {
        if(value && value.typeof === 'string'){
            // const slug = value.toLowerCase().replace(/ /g, '-')
            // setValue('slug', slug)
            // return slug
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')
        }
        else{
            return ""
        }
    }, [])


    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name==='title'){
                setValue('slug', slugTransform(value.title, {shouldValidate:true}))
            }
        })
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)}
        className="flex flex-wrap"
        >
            <div className="w-2/3 px-2">
                <Input 
                label='Title'
                placeholder='Title'
                className='mb-4'
                {...register ('title', {
                    required:true
                })}
                />
                <Input
                label='Slug'
                placeholder='Enter for Slug'
                className='mb-4'
                {...register ('slug', {
                    required:true
                })}
                onInput={(e) => {
                    setValue('slug', slugTransform(e.currentTargetValue), {shouldValidate: true})
                }}
                />
                <RTE 
                label="Content"
                name='content'
                control={control}
                defaultValue={getValues('content')}
                />
            </div>
            <div className="sw-1/3 px-2">
                <Input 
                label='Featured Image'
                type='file'
                className='mb-4'
                accept='image/png image/jpg image/jpeg image/gif'
                {...register ('image', {required: !post})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg" />
                    </div>
                )}
                <Select
                options={['active', 'inactive']}
                label='Status'
                className='mb-4'
                {...register('status', {required: true})}/>
                <Button
                type='submit'
                bgcolor={post ? "bg-green-500" : undefined}
                className='w-full'
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
    
}