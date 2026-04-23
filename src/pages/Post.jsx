import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from '../appwrite/conf'
import {Button, Container} from '../components'
import parse from 'html-react-parser'
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if(slug){
            service.getPost(slug).then((post) =>{
                if(post){
                    setPost(post)
                }
            })
        }
        else{
            navigate('/')
        }
    }, [slug, navigate])

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
                if(status){
                    service.deleteFile(post.featuredImage)
                    navigate('/')
                }
        })
    }


    return (
    post ? (
        <div className="py-8">
            <Container>
                <div className="max-w-4xl mx-auto">

                    {/* Image */}
                    <div className="w-full rounded-xl overflow-hidden mb-6 relative">
                        {post.featuredImage && (
                            <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full object-cover max-h-96"
                            />
                        )}
                    </div>

                    {/* Title + Buttons row */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">{post.title}</h1>
                        {isAuthor && (
                            <div className="flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor='bg-green-500 hover:bg-green-300'>Edit</Button>
                                </Link>
                                <Button bgColor='bg-red-500 hover:bg-red-300' onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Content box */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="browser-css prose max-w-none text-2xl">
                            {parse(post.content)}
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    ) : null
)
}