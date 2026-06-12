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
import registrationImage from "@/assets/images/registration.png";
import registrationDarkImage from "@/assets/images/registration1.png";
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
    confirmPassword: z.string().min(1, "Repeat password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function getAuthErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Registration failed. Please try again."
  );
}

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
      dispatch(setError(getAuthErrorMessage(error)));
    }
  };

  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
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

      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image">
                  <Image
                    src={registrationImage}
                    alt="Registration"
                    priority
                  />
                </div>

                <div className="_social_registration_right_image_dark">
                  <Image
                    src={registrationDarkImage}
                    alt="Registration Dark"
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_registration_content">
                <div className="_social_registration_right_logo _mar_b28">
                  <Image src={logo} alt="Logo" className="_right_logo" />
                </div>

                <p className="_social_registration_content_para _mar_b8">
                  Get Started Now
                </p>

                <h4 className="_social_registration_content_title _titl4 _mar_b50">
                  Registration
                </h4>

                <button
                  type="button"
                  className="_social_registration_content_btn _mar_b40"
                >
                  <Image src={google} alt="Google" className="_google_img" />
                  <span>Register with google</span>
                </button>

                <div className="_social_registration_content_bottom_txt _mar_b40">
                  <span>Or</span>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 mb-3" role="alert">
                    {error}
                  </div>
                )}

                <form
                  className="_social_registration_form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          First Name
                        </label>

                        <input
                          type="text"
                          className="form-control _social_registration_input"
                          {...register("firstName")}
                        />

                        {errors.firstName && (
                          <p className="text-danger small mt-1 mb-0">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          Last Name
                        </label>

                        <input
                          type="text"
                          className="form-control _social_registration_input"
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
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          Email
                        </label>

                        <input
                          type="email"
                          className="form-control _social_registration_input"
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
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          Password
                        </label>

                        <input
                          type="password"
                          className="form-control _social_registration_input"
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
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          Repeat Password
                        </label>

                        <input
                          type="password"
                          className="form-control _social_registration_input"
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
                    <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                      <div className="form-check _social_registration_form_check">
                        <input
                          className="form-check-input _social_registration_form_check_input"
                          type="radio"
                          name="terms"
                          id="terms"
                          defaultChecked
                          readOnly
                        />

                        <label
                          className="form-check-label _social_registration_form_check_label"
                          htmlFor="terms"
                        >
                          I agree to terms & conditions
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                        <button
                          type="submit"
                          className="_social_registration_form_btn_link _btn1"
                          disabled={isLoading}
                        >
                          {isLoading ? "Creating account..." : "Register now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_bottom_txt">
                      <p className="_social_registration_bottom_txt_para">
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