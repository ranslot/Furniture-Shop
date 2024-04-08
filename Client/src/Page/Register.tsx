import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postData } from "../Utils/httpRequest";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { useState } from "react";

const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Username is required." }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(1, { message: "Password is required." })
      .min(8, { message: "Password must be longer than 8 character." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required." })
      .min(8, { message: "Confirm Password must be longer than 8 character." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password not match.",
    path: ["confirmPassword"],
  });

type RegisterFormFields = z.infer<typeof registerSchema>;

type SuccessResponse = {
  success: true;
};
type ErrorResponse = {
  success: false;
  errors: ErrorMessages;
};
type ErrorMessages = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type RegisterResponse = SuccessResponse | ErrorResponse;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormFields>({ resolver: zodResolver(registerSchema) });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: RegisterFormFields) =>
      postData<RegisterFormFields>(data, "auth/register"),
    onSuccess(result: RegisterResponse) {
      setIsLoading(false);
      if (result.success) {
        setLocation("/auth/login");
      } else {
        //Loop all result.errors.
        //Depends on setError so it can't be refactor to helpers.
        Object.keys(result.errors).forEach((key) => {
          const field = key as keyof RegisterFormFields | "root";
          const errorMessage = result.errors[key as keyof ErrorMessages];
          setError(field, { message: errorMessage });
        });
      }
    },
    onError() {
      setIsLoading(false);
      setError("root", { message: "Connection failed." });
    },
    onMutate() {
      setIsLoading(true);
    },
  });

  async function onSubmit(data: RegisterFormFields) {
    mutation.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      className="card mx-auto flex h-[100%] max-h-[500px] w-[100%] max-w-md flex-col items-center justify-evenly border-[1px] p-4 shadow-xl md:h-screen lg:py-0"
    >
      <h1 className="my-3 text-center text-3xl font-bold text-primary">
        Register
      </h1>
      <div className="mx-5 flex w-full flex-col">
        <label
          htmlFor="name"
          className=" input input-bordered flex items-center gap-2"
        >
          <input
            className="grow"
            {...register("name")}
            type="text"
            placeholder="Username"
          />
        </label>
        {errors?.name ? (
          <p className="ml-1 text-sm text-error">{errors?.name.message}</p>
        ) : (
          <p className="ml-1 text-sm text-error">&nbsp;</p>
        )}
      </div>
      <div className="mx-5 flex w-full flex-col">
        <label
          htmlFor="email"
          className=" input input-bordered flex items-center gap-2"
        >
          <input
            className="grow"
            {...register("email")}
            type="text"
            placeholder="Email"
          />
        </label>
        {errors?.email ? (
          <p className="ml-1 text-sm text-error">{errors?.email.message}</p>
        ) : (
          <p className="ml-1 text-sm text-error">&nbsp;</p>
        )}
      </div>
      <div className="mx-5 flex w-full flex-col">
        <label
          htmlFor="password"
          className=" input input-bordered flex items-center gap-2"
        >
          <input
            className="grow"
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </label>

        {errors?.password ? (
          <p className="ml-1 text-sm text-error">{errors.password.message}</p>
        ) : (
          <p className="ml-1 text-sm text-error">&nbsp;</p>
        )}
      </div>
      <div className="mx-5 flex w-full flex-col">
        <label
          htmlFor="confirmPassword"
          className="input input-bordered flex items-center gap-2"
        >
          <input
            className="grow"
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
          />
        </label>
        {errors?.confirmPassword ? (
          <p className="ml-1 text-sm text-error">
            {errors?.confirmPassword.message}
          </p>
        ) : (
          <p className="ml-1 text-sm text-error">&nbsp;</p>
        )}
      </div>
      <div className="flex flex-col items-center">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-square  btn-primary btn-wide mx-auto text-lg"
        >
          {isLoading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            "Register"
          )}
        </button>
        <p>
          Already have an account?{" "}
          <Link to="/auth/login" className="link link-primary">
            Login
          </Link>
        </p>
        {errors?.root ? (
          <p className="ml-1 text-sm text-error">{errors?.root?.message}</p>
        ) : (
          <p className="ml-1 text-sm text-error">&nbsp;</p>
        )}
      </div>
    </form>
  );
}
