import Image from "next/image";

import people1 from "@/assets/images/people1.png";
import people2 from "@/assets/images/people2.png";
import people3 from "@/assets/images/people3.png";
import feedEvent1 from "@/assets/images/feed_event1.png";

const suggestedPeople = [
    {
        id: "sp1",
        name: "Steve Jobs",
        title: "CEO of Apple",
        image: people1,
    },
    {
        id: "sp2",
        name: "Mark Zuckerberg",
        title: "CEO of Facebook",
        image: people2,
    },
    {
        id: "sp3",
        name: "Dylan Field",
        title: "CEO of Figma",
        image: people3,
    },
];

const events = [
    {
        id: "ev1",
        day: "10",
        month: "Jul",
        title: "No more terrorism no more cry",
        going: "17 People Going",
        image: feedEvent1,
    },
    {
        id: "ev2",
        day: "10",
        month: "Jul",
        title: "No more terrorism no more cry",
        going: "17 People Going",
        image: feedEvent1,
    },
];

export default function LeftSidebar() {
    return (
        <div className="_layout_left_sidebar_wrap">
            <div className="_layout_left_sidebar_inner">
                <div className="_left_inner_area_explore _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <h4 className="_left_inner_area_explore_title _title5  _mar_b24">
                        Explore
                    </h4>

                    <ul className="_left_inner_area_explore_list">
                        <li className="_left_inner_area_explore_item _explore_item">
                            <a
                                href="#0"
                                className="_left_inner_area_explore_link"
                            >
                                Learning
                            </a>
                            <span className="_left_inner_area_explore_link_txt">
                                New
                            </span>
                        </li>

                        <li className="_left_inner_area_explore_item">
                            <a
                                href="#0"
                                className="_left_inner_area_explore_link"
                            >
                                Insights
                            </a>
                        </li>

                        <li className="_left_inner_area_explore_item">
                            <a
                                href="#0"
                                className="_left_inner_area_explore_link"
                            >
                                Find friends
                            </a>
                        </li>

                        <li className="_left_inner_area_explore_item">
                            <a
                                href="#0"
                                className="_left_inner_area_explore_link"
                            >
                                Bookmarks
                            </a>
                        </li>

                        <li className="_left_inner_area_explore_item">
                            <a
                                href="#0"
                                className="_left_inner_area_explore_link"
                            >
                                Group
                            </a>
                        </li>

                        <li className="_left_inner_area_explore_item">
                            <a
                                href="#0"
                                className="_left_inner_area_explore_link"
                            >
                                Gaming
                            </a>
                        </li>

                        <li className="_left_inner_area_explore_item">
                            <a
                                href="#0"
                                className="_left_inner_area_explore_link"
                            >
                                Settings
                            </a>
                        </li>

                        <li className="_left_inner_area_explore_item">
                            <a
                                href="#0"
                                className="_left_inner_area_explore_link"
                            >
                                Save post
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="_layout_left_sidebar_inner">
                <div className="_left_inner_area_suggest _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <div className="_left_inner_suggest_content">
                        <h4 className="_left_inner_suggest_title _title5">
                            Suggested People
                        </h4>
                        <a href="#0" className="_left_inner_suggest_link">
                            See all
                        </a>
                    </div>

                    {suggestedPeople.map((person) => (
                        <div
                            className="_left_inner_area_suggest_info"
                            key={person.id}
                        >
                            <div className="_left_inner_area_suggest_info_left">
                                <div className="_left_inner_area_suggest_info_image">
                                    <a href="#0">
                                        <Image
                                            src={person.image}
                                            alt="Image"
                                            className="_info_img1"
                                        />
                                    </a>
                                </div>

                                <div className="_left_inner_area_suggest_info_txt">
                                    <a href="#0">
                                        <h4 className="_left_inner_area_suggest_info_title">
                                            {person.name}
                                        </h4>
                                    </a>
                                    <p className="_left_inner_area_suggest_info_para">
                                        {person.title}
                                    </p>
                                </div>
                            </div>

                            <div className="_left_inner_area_suggest_info_link">
                                <a href="#0" className="_info_link">
                                    Connect
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="_layout_left_sidebar_inner">
                <div className="_left_inner_area_event _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <div className="_left_inner_event_content">
                        <h4 className="_left_inner_event_title _title5">
                            Events
                        </h4>
                        <a href="#0" className="_left_inner_event_link">
                            See all
                        </a>
                    </div>

                    {events.map((event) => (
                        <a
                            className="_left_inner_event_card_link"
                            href="#0"
                            key={event.id}
                        >
                            <div className="_left_inner_event_card">
                                <div className="_left_inner_event_card_iamge">
                                    <Image
                                        src={event.image}
                                        alt="Image"
                                        className="_card_img"
                                    />
                                </div>

                                <div className="_left_inner_event_card_content">
                                    <div className="_left_inner_card_date">
                                        <p className="_left_inner_card_date_para">
                                            {event.day}
                                        </p>
                                        <p className="_left_inner_card_date_para1">
                                            {event.month}
                                        </p>
                                    </div>

                                    <div className="_left_inner_card_txt">
                                        <h4 className="_left_inner_event_card_title">
                                            {event.title}
                                        </h4>
                                    </div>
                                </div>

                                <hr className="_underline" />

                                <div className="_left_inner_event_bottom">
                                    <p className="_left_iner_event_bottom">
                                        {event.going}
                                    </p>
                                    <span className="_left_iner_event_bottom_link">
                                        Going
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
