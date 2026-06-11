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

import { register as registerUser } from "@/features/auth/authService";
import {
  setCredentials,
  setError,
  setLoading,
  selectError,
  selectIsLoading,
} from "@/features/auth/authSlice";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const data = await registerUser(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );

      dispatch(
        setCredentials({
          user: data.user,
          profile: data.profile || null,
        })
      );

      router.push("/feed");
    } catch (error) {
      dispatch(
        setError(
          error?.response?.data?.message ||
            "Registration failed. Please try again."
        )
      );
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
                    alt="Register"
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
                  Get started
                </p>

                <h4 className="_social_login_content_title _titl4 _mar_b50">
                  Create your account
                </h4>

                <button
                  type="button"
                  className="_social_login_content_btn _mar_b40"
                >
                  <Image src={google} alt="Google" className="_google_img" />
                  <span>Or sign-up with google</span>
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
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">
                          First Name
                        </label>

                        <input
                          type="text"
                          className="form-control _social_login_input"
                          {...register("firstName")}
                        />

                        {errors.firstName && (
                          <p className="text-danger small mt-1 mb-0">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">
                          Last Name
                        </label>

                        <input
                          type="text"
                          className="form-control _social_login_input"
                          {...register("lastName")}
                        />

                        {errors.lastName && (
                          <p className="text-danger small mt-1 mb-0">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

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

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">
                          Confirm Password
                        </label>

                        <input
                          type="password"
                          className="form-control _social_login_input"
                          {...register("confirmPassword")}
                        />

                        {errors.confirmPassword && (
                          <p className="text-danger small mt-1 mb-0">
                            {errors.confirmPassword.message}
                          </p>
                        )}
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
                          {isLoading ? "Creating account..." : "Create Account"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_login_bottom_txt">
                      <p className="_social_login_bottom_txt_para">
                        Already have an account?{" "}
                        <Link href="/login">Login Now</Link>
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