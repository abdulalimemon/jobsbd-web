"use client";

/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import Link from "next/link";
import { Button, Checkbox } from "@nextui-org/react";

import EmployeeAuthContainer from "@/components/ui/EmployeeAuthContainer";
import ORDivider from "@/components/ui/ORDivider";
import PhoneNumberInput from "@/components/ui/PhoneNumberInput";
import SocialLogin from "@/components/ui/SocialLogin";
import EmployeeAuthInput from "@/components/ui/EmployeeAuthInput";
import { useSignUpMutation } from "@/redux/api/auth/authApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


const EmployeeRegister = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const methods = useForm<FieldValues>();
// Recruiter register
const [signUp] = useSignUpMutation();
  // on submit handle
  const onSubmit = async (data: FieldValues) => {
    const formData = {
      ...data,
      phoneNumber: phone,
      role: "EMPLOYER",
    };
    const response = await signUp(formData);
    if (response.data) {
      Swal.fire({
        title: "Success",
        text: "You have been registered successfully",
        icon: "success",
      });
      router.push("/employee-login");
      methods.reset();
    } else {
      Swal.fire({
        title: "Error",
        text: "Registration failed",
        icon: "error",
      });
      console.log(response.error);
    }
  };

  return (
    <EmployeeAuthContainer>
      {/* main div container */}
      <div className="w-full lg:w-[500px] lg:mx-auto p-4">
        {/* text social login and divider container */}
        <div className="text-center pt-1 mb-9 space-y-2">
          {/* text container */}
          <p className="font-medium">Post your jobs easily</p>
          <h3 className="text-lg font-bold text-primary">
            Create an Employer Account
          </h3>
        </div>
        {/* register form */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-5 mb-10"
          >
            <EmployeeAuthInput
              name="companyName"
              type="text"
              label="Company Name"
              placeholder="Enter Company Name"
              rules={{ required: "Company Name is required" }}
            />
            <div>
              <label className="text-sm font-medium text-[#424447]">
                Phone Number <span className="text-red-500 ml-1">*</span>
              </label>
              <PhoneNumberInput phone={phone} setPhone={setPhone} />
            </div>
            <EmployeeAuthInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter Your Email Address"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
            />
            <EmployeeAuthInput
              name="password"
              type="password"
              label="Password"
              placeholder="Enter Your Password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
            />
            <div className="flex">
              <Checkbox radius="none" />
              <p className="text-sm">
                By clicking "Create an account", you confirm that you agree to
                ATB Jobs Terms and Conditions and Privacy Policy.
              </p>
            </div>

            <Button
              type="submit"
              className="uppercase w-full bg-primary text-white shadow rounded-md"
            >
              Create an account
            </Button>
          </form>
        </FormProvider>

        <ORDivider />
        <div className="lg:w-[180px] lg:mx-auto mt-5">
          <SocialLogin />
        </div>

        <p className="font-semibold text-center mt-8 pb-10">
          Already have an account?
          <Link href="/employee-login" className="text-primary ml-1">
            Login In
          </Link>
        </p>
      </div>
    </EmployeeAuthContainer>
  );
};

export default EmployeeRegister;
