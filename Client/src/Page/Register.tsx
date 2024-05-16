import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postData } from "../Utils/httpRequest";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { registerSchema } from "../Utils/formSchema";

type RegisterFormFields = z.infer<typeof registerSchema>;

type RegisterSuccess = {
  success: true;
};
type RegisterError = {
  success: false;
  errors: RegisterErrorMessages;
};
type RegisterErrorMessages = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type RegisterResponse = RegisterSuccess | RegisterError;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormFields>({ resolver: zodResolver(registerSchema) });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterFormFields) =>
      postData<RegisterFormFields>(data, "auth/register"),
    onSuccess(result: RegisterResponse) {
      if (result.success) {
        setLocation("/auth/login");
      } else {
        //Loop all result.errors.
        //Depends on setError so it can't be refactor to Utils.
        Object.keys(result.errors).forEach((key) => {
          const field = key as keyof RegisterFormFields | "root";
          const errorMessage =
            result.errors[key as keyof RegisterErrorMessages];
          setError(field, { message: errorMessage });
        });
      }
    },
    onError() {
      setError("root", { message: "Connection failed." });
    },
  });

  async function onSubmit(data: RegisterFormFields) {
    mutate(data);
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
          disabled={isPending}
          className="btn btn-square  btn-primary btn-wide mx-auto text-lg"
        >
          {isPending ? (
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
