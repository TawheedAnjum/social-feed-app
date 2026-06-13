"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReplyCard from "@/components/common/ReplyCard";

import commentImg from "@/assets/images/txt_img.png";

import {
    addReply,
    toggleCommentLike,
} from "@/features/comments/commentSlice";

function getTimeAgo(date) {
    const diffMs = Date.now() - new Date(date).getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return ".Just now";
    if (diffMinutes < 60) return `.${diffMinutes}m`;

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) return `.${diffHours}h`;

    return `.${Math.floor(diffHours / 24)}d`;
}

export default function CommentCard({ postId, comment }) {
    const dispatch = useDispatch();

    const { user, profile } = useSelector((state) => state.auth);

    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState("");

    const currentUserId = user?._id;
    const isLiked = comment.likes.includes(currentUserId);

    const fullName = `${comment.profile?.firstName || ""} ${comment.profile?.lastName || ""}`.trim() || "Unknown User";
    const avatar = comment.profile?.avatar || commentImg.src;

    const handleLike = () => {
        if (!currentUserId) return;

        // TODO Phase 2:
        // await commentService.toggleCommentLike(comment._id);

        dispatch(toggleCommentLike({
            postId,
            commentId: comment._id,
            userId: currentUserId,
        }));
    };

    const handleReplySubmit = (event) => {
        event.preventDefault();

        if (!replyText.trim()) return;

        const newReply = {
            _id: `r-${Date.now()}`,
            commentId: comment._id,
            author: { _id: user?._id },
            profile: {
                firstName: profile?.firstName || "",
                lastName: profile?.lastName || "",
                avatar: profile?.avatar || null,
            },
            text: replyText.trim(),
            likes: [],
            createdAt: new Date().toISOString(),
        };

        // TODO Phase 2:
        // const createdReply = await commentService.createReply(comment._id, { text: replyText });
        // dispatch(addReply({ postId, commentId: comment._id, reply: createdReply }));

        dispatch(addReply({
            postId,
            commentId: comment._id,
            reply: newReply,
        }));

        setReplyText("");
        setShowReplyInput(false);
    };

    return (
        <div className="_comment_main">
            <div className="_comment_image">
                <a href="#0" className="_comment_image_link">
                    <img src={avatar} alt="" className="_comment_img1" />
                </a>
            </div>

            <div className="_comment_area">
                <div className="_comment_details">
                    <div className="_comment_details_top">
                        <div className="_comment_name">
                            <a href="#0">
                                <h4 className="_comment_name_title">
                                    {fullName}
                                </h4>
                            </a>
                        </div>
                    </div>

                    <div class="_comment_status">
                        <p class="_comment_status_text">
                            <span>
                                <span>{comment.text}</span>
                            </span>
                        </p>
                    </div>

                    <div className="_total_reactions">
                        <div className="_total_react">
                            <span class="_reaction_like">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                            </span>

                            <span class="_reaction_heart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            </span>
                        </div>

                        <span className="_total">
                            {comment.likes.length}
                        </span>
                    </div>

                    <div className="_comment_reply">
                        <div className="_comment_reply_num">
                            {/* new */}
                            <ul class="_comment_reply_list">
                                <li type="button" onClick={handleLike}><span>{isLiked ? "Liked." : "Like."}</span></li>
                                <li type="button" onClick={handleLike}><span>Reply.</span></li>
                                <li type="button" onClick={handleLike}><span>Share</span></li>
                                <li type="button" onClick={handleLike}><span class="_time_link">{getTimeAgo(comment.createdAt)}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {showReplyInput && (
                    <div className="_feed_inner_comment_box">
                        <form className="_feed_inner_comment_box_form" onSubmit={handleReplySubmit}>
                            <div className="_feed_inner_comment_box_content">
                                <div className="_feed_inner_comment_box_content_image">
                                    <img src={profile?.avatar || commentImg.src} alt="" className="_comment_img" />
                                </div>

                                <div className="_feed_inner_comment_box_content_txt">
                                    <textarea
                                        className="form-control _comment_textarea"
                                        placeholder="Write a reply"
                                        id={`replyTextarea-${comment._id}`}
                                        value={replyText}
                                        onChange={(event) => setReplyText(event.target.value)}
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
                )}

                {comment.replies?.map((reply) => (
                    <>
                        <CommentCard
                            key={reply._id}
                            postId={postId}
                            commentId={comment._id}
                            comment={reply}
                        />
                        <div className="_feed_inner_comment_box">
                            <form className="_feed_inner_comment_box_form" onSubmit={null}>
                                <div className="_feed_inner_comment_box_content">
                                    <div className="_feed_inner_comment_box_content_image">
                                        <img src={avatar} alt="" className="_comment_img" />
                                    </div>

                                    <div className="_feed_inner_comment_box_content_txt">
                                        <textarea
                                            className="form-control _comment_textarea"
                                            placeholder="Write a comment"
                                            id={`floatingTextarea-${postId}`}
                                            value={""}
                                            onChange={(event) => null}
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
                    </>
                    // <ReplyCard
                    //     key={reply._id}
                    //     postId={postId}
                    //     commentId={comment._id}
                    //     reply={reply}
                    // />
                ))}
            </div>
        </div>
    );
}