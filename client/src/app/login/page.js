"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import logo from "@/assets/images/logo.svg";
import google from "@/assets/images/google.svg";
import loginImage from "@/assets/images/login.png";
import shapeOne from "@/assets/images/shape1.svg";
import shapeTwo from "@/assets/images/shape2.svg";
import shapeThree from "@/assets/images/shape3.svg";
import darkShape from "@/assets/images/dark_shape.svg";
import darkShapeOne from "@/assets/images/dark_shape1.svg";
import darkShapeTwo from "@/assets/images/dark_shape2.svg";

import { login } from "@/features/auth/authService";
import {
  setCredentials,
  setError,
  setLoading,
  selectError,
  selectIsLoading,
} from "@/features/auth/authSlice";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

function getAuthErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Login failed. Please check your email and password."
  );
}

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const data = await login(formData.email, formData.password);

      dispatch(
        setCredentials({
          user: data.user,
          profile: data.profile || null,
        })
      );

      router.push("/feed");
    } catch (error) {
      dispatch(setError(getAuthErrorMessage(error)));
    }
  };

  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <Image src={shapeOne} alt="" className="_shape_img" />
        <Image src={darkShape} alt="" className="_dark_shape" />
      </div>

      <div className="_shape_two">
        <Image src={shapeTwo} alt="" className="_shape_img" />
        <Image
          src={darkShapeOne}
          alt=""
          className="_dark_shape _dark_shape_opacity"
        />
      </div>

      <div className="_shape_three">
        <Image src={shapeThree} alt="" className="_shape_img" />
        <Image
          src={darkShapeTwo}
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
                  <Image
                    src={loginImage}
                    alt="Login"
                    className="_left_img"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">
                <div className="_social_login_left_logo _mar_b28">
                  <Image src={logo} alt="Logo" className="_left_logo" />
                </div>

                <p className="_social_login_content_para _mar_b8">
                  Welcome back
                </p>

                <h4 className="_social_login_content_title _titl4 _mar_b50">
                  Login to your account
                </h4>

                <button
                  type="button"
                  className="_social_login_content_btn _mar_b40"
                >
                  <Image src={google} alt="Google" className="_google_img" />
                  <span>Or sign-in with google</span>
                </button>

                <div className="_social_login_content_bottom_txt _mar_b40">
                  <span>Or</span>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 mb-3" role="alert">
                    {error}
                  </div>
                )}

                <form
                  className="_social_login_form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
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
                          <p className="text-danger small mt-1 mb-0">
                            {errors.email.message}
                          </p>
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
                          <p className="text-danger small mt-1 mb-0">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                      <div className="form-check _social_login_form_check">
                        <input
                          className="form-check-input _social_login_form_check_input"
                          type="radio"
                          name="rememberMe"
                          id="rememberMe"
                          defaultChecked
                          readOnly
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
                          disabled={isLoading}
                        >
                          {isLoading ? "Logging in..." : "Login now"}
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
                        <Link href="/register">Create New Account</Link>
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