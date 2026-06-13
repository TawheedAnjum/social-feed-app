"use client";

import { useDispatch, useSelector } from "react-redux";

import { toggleReplyLike } from "@/features/comments/commentSlice";

import commentImg from "@/assets/images/txt_img.png";

function getTimeAgo(date) {
    const diffMs = Date.now() - new Date(date).getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return ".Just now";
    if (diffMinutes < 60) return `.${diffMinutes}m`;

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) return `.${diffHours}h`;

    return `.${Math.floor(diffHours / 24)}d`;
}

export default function ReplyCard({ postId, commentId, reply }) {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const currentUserId = user?._id;
    const isLiked = reply.likes.includes(currentUserId);

    const fullName = `${reply.profile?.firstName || ""} ${reply.profile?.lastName || ""}`.trim() || "Unknown User";
    const avatar = reply.profile?.avatar || commentImg.src;

    const handleLike = () => {
        if (!currentUserId) return;

        // TODO Phase 2:
        // await commentService.toggleReplyLike(reply._id);

        dispatch(toggleReplyLike({
            postId,
            commentId,
            replyId: reply._id,
            userId: currentUserId,
        }));
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

                    <div className="_comment_status">
                        <p className="_comment_status_text">
                            <span>{reply.text}</span>
                        </p>
                    </div>

                    <div className="_total_reactions">
                        <div className="_total_react">
                            <span className="_reaction_like">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up">
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                </svg>
                            </span>

                            <span className="_reaction_heart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </span>
                        </div>

                        <span className="_total">
                            {reply.likes.length}
                        </span>
                    </div>

                    <div className="_comment_reply">
                        <div className="_comment_reply_num">
                            <ul className="_comment_reply_list">
                                <li>
                                    <button type="button" onClick={handleLike}>
                                        {isLiked ? "Liked." : "Like."}
                                    </button>
                                </li>

                                <li>
                                    <span>Reply.</span>
                                </li>

                                <li>
                                    <span>Share</span>
                                </li>

                                <li>
                                    <span className="_time_link">
                                        {getTimeAgo(reply.createdAt)}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}