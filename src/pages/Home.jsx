import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

export default function Home() {
    const [posts, setPosts] = useState([]);

    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (authStatus && userData) {
            service.getPosts(userData.$id).then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        } else {
            setPosts([]);
        }
    }, [authStatus, userData]);

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        Login to Read the Posts !
                    </h1>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-3xl font-bold hover:text-gray-500">
                        Add post to see it !
                    </h1>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}