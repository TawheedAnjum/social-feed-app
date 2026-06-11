"use client";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  loginFailed,
  loginStart,
  loginSuccess,
} from "@/features/auth/authSlice";

import logo from "@/assets/images/logo.svg";
import loginImage from "@/assets/images/login.png";
import shape1 from "@/assets/images/shape1.svg";
import shape2 from "@/assets/images/shape2.svg";
import shape3 from "@/assets/images/shape3.svg";
import darkShape from "@/assets/images/dark_shape.svg";
import darkShape1 from "@/assets/images/dark_shape1.svg";
import darkShape2 from "@/assets/images/dark_shape2.svg";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    dispatch(loginStart());

    try {
      // Later real API:
      // const res = await api.post("/auth/login", data);
      // Backend will verify password with bcrypt.
      // Backend will set JWT in httpOnly cookie.
      // dispatch(loginSuccess(res.data.user));

      const dummyUser = {
        id: "1",
        name: "Demo User",
        email: data.email,
      };

      dispatch(loginSuccess(dummyUser));
      alert("Login successful");
    } catch (error) {
      dispatch(loginFailed());
      alert("Invalid login");
    }
  };

  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <img src={shape1.src} alt="" className="_shape_img" />
        <img src={darkShape.src} alt="" className="_dark_shape" />
      </div>

      <div className="_shape_two">
        <img src={shape2.src} alt="" className="_shape_img" />
        <img
          src={darkShape1.src}
          alt=""
          className="_dark_shape _dark_shape_opacity"
        />
      </div>

      <div className="_shape_three">
        <img src={shape3.src} alt="" className="_shape_img" />
        <img
          src={darkShape2.src}
          alt=""
          className="_dark_shape _dark_shape_opacity"
        />
      </div>

      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <img
                    src={loginImage.src}
                    alt="Login"
                    className="_left_img"
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">
                <div className="_social_login_left_logo _mar_b28">
                  <img src={logo.src} alt="Logo" className="_left_logo" />
                </div>

                <p className="_social_login_content_para _mar_b8">
                  Welcome back
                </p>

                <h4 className="_social_login_content_title _titl4 _mar_b50">
                  Login to your account
                </h4>

                <form
                  className="_social_login_form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">
                          Email
                        </label>

                        <input
                          type="email"
                          className="form-control _social_login_input"
                          {...register("email")}
                        />

                        {errors.email && (
                          <small className="text-danger">
                            {errors.email.message}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">
                          Password
                        </label>

                        <input
                          type="password"
                          className="form-control _social_login_input"
                          {...register("password")}
                        />

                        {errors.password && (
                          <small className="text-danger">
                            {errors.password.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                      <div className="form-check _social_login_form_check">
                        <input
                          className="form-check-input _social_login_form_check_input"
                          type="checkbox"
                          id="rememberMe"
                        />

                        <label
                          className="form-check-label _social_login_form_check_label"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                      <div className="_social_login_form_left">
                        <p className="_social_login_form_left_para">
                          Forgot password?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="_social_login_form_btn _mar_t40 _mar_b60">
                        <button
                          type="submit"
                          className="_social_login_form_btn_link _btn1"
                          disabled={loading}
                        >
                          {loading ? "Logging in..." : "Login now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_login_bottom_txt">
                      <p className="_social_login_bottom_txt_para">
                        Dont have an account?{" "}
                        <a href="/register">Create New Account</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}