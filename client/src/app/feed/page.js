"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreatePost from "@/components/common/CreatePost";
import PostCard from "@/components/common/PostCard";

import {
    selectPosts,
    selectPostsLoading,
    setPosts,
    setPostsLoading,
} from "@/features/posts/postSlice";

const DUMMY_POSTS = [
    {
        _id: "1",
        author: { _id: "u1" },
        profile: { firstName: "John", lastName: "Doe", avatar: null },
        text: "This is a sample post",
        image: null,
        visibility: "public",
        likes: [],
        createdAt: new Date().toISOString(),
    },
    {
        _id: "2",
        author: { _id: "u2" },
        profile: { firstName: "John", lastName: "Doe", avatar: null },
        text: "This is a sample post",
        image: null,
        visibility: "public",
        likes: [],
        createdAt: new Date().toISOString(),
    },
];

export default function FeedPage() {
    const dispatch = useDispatch();

    const posts = useSelector(selectPosts);
    const isLoading = useSelector(selectPostsLoading);

    useEffect(() => {
        dispatch(setPostsLoading(true));

        // Phase 1: static data
        dispatch(setPosts(DUMMY_POSTS));

        // TODO Phase 2:
        // const posts = await postService.getPosts();
        // dispatch(setPosts(posts));

        dispatch(setPostsLoading(false));
    }, [dispatch]);

    return (
        <>
            <CreatePost />

            {isLoading && (
                <div className="text-center _mar_t20 _mar_b20">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {!isLoading && posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}

            <div className="py-4"></div>
        </>
    );
}