import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    commentsByPost: {},
    isLoading: false,
    error: null,
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments: (state, action) => {
            const { postId, comments } = action.payload;

            state.commentsByPost[postId] = comments;
            state.error = null;
        },

        addComment: (state, action) => {
            const { postId, comment } = action.payload;

            if (!state.commentsByPost[postId]) {
                state.commentsByPost[postId] = [];
            }

            state.commentsByPost[postId].unshift(comment);
            state.error = null;
        },

        toggleCommentLike: (state, action) => {
            const { postId, commentId, userId } = action.payload;
            const comments = state.commentsByPost[postId] || [];
            const comment = comments.find((item) => item._id === commentId);

            if (!comment) return;

            const alreadyLiked = comment.likes.includes(userId);

            if (alreadyLiked) {
                comment.likes = comment.likes.filter((id) => id !== userId);
            } else {
                comment.likes.push(userId);
            }
        },

        addReply: (state, action) => {
            const { postId, commentId, reply } = action.payload;
            const comments = state.commentsByPost[postId] || [];
            const comment = comments.find((item) => item._id === commentId);

            if (!comment) return;

            if (!comment.replies) {
                comment.replies = [];
            }

            comment.replies.push(reply);
            state.error = null;
        },

        toggleReplyLike: (state, action) => {
            const { postId, commentId, replyId, userId } = action.payload;
            const comments = state.commentsByPost[postId] || [];
            const comment = comments.find((item) => item._id === commentId);

            if (!comment || !comment.replies) return;

            const reply = comment.replies.find((item) => item._id === replyId);

            if (!reply) return;

            const alreadyLiked = reply.likes.includes(userId);

            if (alreadyLiked) {
                reply.likes = reply.likes.filter((id) => id !== userId);
            } else {
                reply.likes.push(userId);
            }
        },

        setCommentsLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setCommentsError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const {
    setComments,
    addComment,
    toggleCommentLike,
    addReply,
    toggleReplyLike,
    setCommentsLoading,
    setCommentsError,
} = commentSlice.actions;

export const selectCommentsByPost = (state, postId) => {
    return state.comments.commentsByPost[postId] || [];
};

export const selectCommentsLoading = (state) => state.comments.isLoading;
export const selectCommentsError = (state) => state.comments.error;

export default commentSlice.reducer;