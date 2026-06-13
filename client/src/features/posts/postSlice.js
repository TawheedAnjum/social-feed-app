import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.error = null;
        },

        addPost: (state, action) => {
            state.posts.unshift(action.payload);
            state.error = null;
        },

        toggleLike: (state, action) => {
            const { postId, userId } = action.payload;

            const post = state.posts.find(
                (item) => item._id === postId
            );

            if (!post) return;

            const alreadyLiked = post.likes.includes(userId);

            if (alreadyLiked) {
                post.likes = post.likes.filter(
                    (id) => id !== userId
                );
            } else {
                post.likes.push(userId);
            }
        },

        setPostsLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setPostsError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const {
    setPosts,
    addPost,
    toggleLike,
    setPostsLoading,
    setPostsError,
} = postSlice.actions;

export const selectPosts = (state) => state.posts.posts;

export const selectPostsLoading = (state) =>
    state.posts.isLoading;

export const selectPostsError = (state) =>
    state.posts.error;

export default postSlice.reducer;