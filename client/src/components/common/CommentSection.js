"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommentCard from "@/components/common/CommentCard";

import commentImg from "@/assets/images/comment_img.png";
import commentImg2 from "@/assets/images/txt_img.png";

import {
    addComment,
    selectCommentsByPost,
    setComments,
} from "@/features/comments/commentSlice";

const DUMMY_COMMENTS = [
    {
        _id: "c1",
        postId: "1",
        author: { _id: "u2" },
        profile: { firstName: "Jane", lastName: "Smith", avatar: null },
        text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        likes: [],
        createdAt: new Date().toISOString(),
        replies: [
            {
                _id: "r1",
                commentId: "c1",
                author: { _id: "u1" },
                profile: { firstName: "John", lastName: "Doe", avatar: null },
                text: "This is a reply",
                likes: [],
                createdAt: new Date().toISOString(),
            },
        ],
    },
    {
        _id: "c2",
        postId: "1",
        author: { _id: "u2" },
        profile: { firstName: "Jane", lastName: "Smith", avatar: null },
        text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        likes: [],
        createdAt: new Date().toISOString(),
        replies: [
            {
                _id: "r2",
                commentId: "c2",
                author: { _id: "u2" },
                profile: { firstName: "John", lastName: "Doe", avatar: null },
                text: "This is a reply",
                likes: [],
                createdAt: new Date().toISOString(),
            },
        ],
    },
];

export default function CommentSection({ postId }) {
    const dispatch = useDispatch();

    const { user, profile } = useSelector((state) => state.auth);
    const comments = useSelector((state) => selectCommentsByPost(state, postId));

    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState("");

    const avatar = profile?.avatar || commentImg.src;

    useEffect(() => {
        const filteredComments = DUMMY_COMMENTS.filter((comment) => comment.postId === postId);
        debugger

        dispatch(setComments({
            postId,
            comments: filteredComments,
        }));

        // TODO Phase 2:
        // const comments = await commentService.getComments(postId);
        // dispatch(setComments({ postId, comments }));
    }, [dispatch, postId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        if (!commentText.trim()) {
            setError("Please write a comment.");
            return;
        }

        const newComment = {
            _id: `c-${Date.now()}`,
            postId,
            author: { _id: user?._id },
            profile: {
                firstName: profile?.firstName || "",
                lastName: profile?.lastName || "",
                avatar: profile?.avatar || null,
            },
            text: commentText.trim(),
            likes: [],
            createdAt: new Date().toISOString(),
            replies: [],
        };

        // TODO Phase 2:
        // const createdComment = await commentService.createComment(postId, { text: commentText });
        // dispatch(addComment({ postId, comment: createdComment }));

        dispatch(addComment({
            postId,
            comment: newComment,
        }));

        setCommentText("");
    };

    return (
        <div className="_feed_inner_timeline_cooment_area">
            <div className="_feed_inner_comment_box">
                <form className="_feed_inner_comment_box_form" onSubmit={handleSubmit}>
                    <div className="_feed_inner_comment_box_content">
                        <div className="_feed_inner_comment_box_content_image">
                            <img src={avatar} alt="" className="_comment_img" />
                        </div>

                        <div className="_feed_inner_comment_box_content_txt">
                            <textarea
                                className="form-control _comment_textarea"
                                placeholder="Write a comment"
                                id={`floatingTextarea-${postId}`}
                                value={commentText}
                                onChange={(event) => setCommentText(event.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="_feed_inner_comment_box_icon">
                        <button type="submit" className="_feed_inner_comment_box_icon_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                <path fill="#000" fillOpacity=".46" fillRule="evenodd" d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.167 3.167 0 013.167 3.167v3.2a3.167 3.167 0 01-6.333 0v-3.2A3.167 3.167 0 017.833.667z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            {error && (
                <p className="text-danger _mar_t10 _mar_b0">
                    {error}
                </p>
            )}

            {comments.length > 0 && (
                <div className="_timline_comment_main">
                    <div className="_previous_comment">
                        <button type="button" className="_previous_comment_txt">
                            View {comments.length} previous comments
                        </button>
                    </div>

                    {comments.map((comment) => (
                        <CommentCard
                            key={comment._id}
                            postId={postId}
                            comment={comment}
                        />
                    ))}
                </div>
            )}
            
        </div>
    );
}