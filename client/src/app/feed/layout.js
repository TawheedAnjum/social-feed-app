import Navbar from "@/components/layout/Navbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";

export default function FeedLayout({ children }) {
    return (
        <div className="_layout _layout_main_wrapper">
            {/* DARK AND LIGHT MODE */}
            {/* <div className="_layout_mode_swithing_btn">
                <button type="button" className="_layout_swithing_btn_link">
                    <div className="_layout_swithing_btn">
                        <div className="_layout_swithing_btn_round"></div>
                    </div>
                </button>
            </div> */}

            <div className="_main_layout">
                <Navbar />

                <div className="container _custom_container">
                    <div className="_layout_inner_wrap">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                {/* <LeftSidebar /> */}
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="_layout_middle_wrap">
							        <div className="_layout_middle_wrap">
                                        {children}
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                {/* <RightSidebar /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}