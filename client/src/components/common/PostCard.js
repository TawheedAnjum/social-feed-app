"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommentSection from "@/components/common/CommentSection";
import { toggleLike } from "@/features/posts/postSlice";

import postImg from "@/assets/images/post_img.png";
import timelineImg from "@/assets/images/timeline_img.png";
import reactImg1 from "@/assets/images/react_img1.png";
import reactImg2 from "@/assets/images/react_img2.png";
import reactImg3 from "@/assets/images/react_img3.png";
import reactImg4 from "@/assets/images/react_img4.png";
import reactImg5 from "@/assets/images/react_img5.png";

function getTimeAgo(date) {
    const diffMs = Date.now() - new Date(date).getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minute ago`;

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) return `${diffHours} hour ago`;

    return `${Math.floor(diffHours / 24)} day ago`;
}

export default function PostCard({ post }) {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const [showTimelineDropdown, setShowTimelineDropdown] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const currentUserId = user?._id;
    const isLiked = post.likes.includes(currentUserId);
    const isOwner = post.author?._id === currentUserId;

    const fullName = `${post.profile?.firstName || ""} ${post.profile?.lastName || ""}`.trim() || "Unknown User";
    const avatar = post.profile?.avatar || postImg.src;
    const postImage = post.image || timelineImg.src;

    const handleLike = () => {
        if (!currentUserId) return;

        // TODO Phase 2:
        // await postService.toggleLike(post._id);

        dispatch(toggleLike({
            postId: post._id,
            userId: currentUserId,
        }));
    };

    return (
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                <div className="_feed_inner_timeline_post_top">
                    <div className="_feed_inner_timeline_post_box">
                        <div className="_feed_inner_timeline_post_box_image">
                            <img src={avatar} alt="" className="_post_img" />
                        </div>

                        <div className="_feed_inner_timeline_post_box_txt">
                            <h4 className="_feed_inner_timeline_post_box_title">
                                {fullName}
                            </h4>

                            <p className="_feed_inner_timeline_post_box_para">
                                {getTimeAgo(post.createdAt)} .{" "}
                                <a href="#0">
                                    {post.visibility === "public" ? "Public" : "Private"}
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="_feed_inner_timeline_post_box_dropdown">
                        <div className="_feed_timeline_post_dropdown">
                            <button
                                type="button"
                                id="_timeline_show_drop_btn"
                                className="_feed_timeline_post_dropdown_link"
                                onClick={() => setShowTimelineDropdown((prev) => !prev)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                                    <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                                    <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                                    <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                                </svg>
                            </button>
                        </div>

                        <div
                            id="_timeline_drop"
                            className={`_feed_timeline_dropdown _timeline_dropdown ${
                                showTimelineDropdown ? "show" : ""
                            }`}
                        >
                            <ul className="_feed_timeline_dropdown_list">
                                <li className="_feed_timeline_dropdown_item">
                                    <a href="#0" className="_feed_timeline_dropdown_link">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                                                <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z" />
                                            </svg>
                                        </span>
                                        Save Post
                                    </a>
                                </li>

                                <li className="_feed_timeline_dropdown_item">
                                    <a href="#0" className="_feed_timeline_dropdown_link">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                                                <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9.5 17.417A7.917 7.917 0 109.5 1.583a7.917 7.917 0 000 15.834z" />
                                                <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9.5 6.333V9.5l2.375 2.375" />
                                            </svg>
                                        </span>
                                        Turn on Notification
                                    </a>
                                </li>

                                <li className="_feed_timeline_dropdown_item">
                                    <a href="#0" className="_feed_timeline_dropdown_link">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" fill="none" viewBox="0 0 19 15">
                                                <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M1.583 7.5s2.875-5.542 7.917-5.542S17.417 7.5 17.417 7.5 14.542 13.042 9.5 13.042 1.583 7.5 1.583 7.5z" />
                                                <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9.5 9.875a2.375 2.375 0 100-4.75 2.375 2.375 0 000 4.75z" />
                                            </svg>
                                        </span>
                                        Hide Post
                                    </a>
                                </li>

                                {isOwner && (
                                    <>
                                        <li className="_feed_timeline_dropdown_item">
                                            <a href="#0" className="_feed_timeline_dropdown_link">
                                                Edit Post
                                            </a>
                                        </li>

                                        <li className="_feed_timeline_dropdown_item">
                                            <a href="#0" className="_feed_timeline_dropdown_link">
                                                Delete Post
                                            </a>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {post.text && (
                    <h4 className="_feed_inner_timeline_post_title">
                        {post.text}
                    </h4>
                )}

                <div className="_feed_inner_timeline_image">
                    <img src={postImage} alt="" className="_time_img" />
                </div>
            </div>

            <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
                <div className="_feed_inner_timeline_total_reacts_image">
                    <img src={reactImg1.src} alt="Image" className="_react_img1" />
                    <img src={reactImg2.src} alt="Image" className="_react_img" />
                    <img src={reactImg3.src} alt="Image" className="_react_img _rect_img_mbl_none" />
                    <img src={reactImg4.src} alt="Image" className="_react_img _rect_img_mbl_none" />
                    <img src={reactImg5.src} alt="Image" className="_react_img _rect_img_mbl_none" />

                    <p className="_feed_inner_timeline_total_reacts_para">
                        {post.likes.length > 0 ? post.likes.length : "0"}
                    </p>
                </div>

                <div className="_feed_inner_timeline_total_reacts_txt">
                    <p className="_feed_inner_timeline_total_reacts_para1">
                        <span>0</span> Comment
                    </p>

                    <p className="_feed_inner_timeline_total_reacts_para2">
                        <span>0</span> Share
                    </p>
                </div>
            </div>

            <div className="_feed_inner_timeline_reaction">
                <button
                    type="button"
                    className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${
                        isLiked ? "_feed_reaction_active" : ""
                    }`}
                    onClick={handleLike}
                >
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                                <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z" />
                                <path fill="#664500" d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z" />
                                <path fill="#fff" d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z" />
                                <path fill="#664500" d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z" />
                            </svg>
                            {isLiked ? "Liked" : "Haha"}
                        </span>
                    </span>
                </button>

                <button
                    type="button"
                    className="_feed_inner_timeline_reaction_comment _feed_reaction"
                    onClick={() => setShowComments((prev) => !prev)}
                >
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>
                            <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                                <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z" />
                                <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563" />
                            </svg>
                            Comment
                        </span>
                    </span>
                </button>

                <button type="button" className="_feed_inner_timeline_reaction_share _feed_reaction">
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>
                            <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
                                <path stroke="#000" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z" />
                            </svg>
                            Share
                        </span>
                    </span>
                </button>
            </div>

            {showComments && (
                <CommentSection postId={post._id} />
            )}
        </div>
    );
}