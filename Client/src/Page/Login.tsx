import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postData } from "../helpers/httpRequest";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";

const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(8, { message: "Password must be longer than 8 character." }),
});

type LoginFormFields = z.infer<typeof registerSchema>;

type UserAuth = {
  email: string;
  password: string;
  id: number;
  name: string;
  isAdmin?: boolean;
  createdAt?: Date;
  modifiedAt?: Date;
};

type SuccessResponse = {
  success: true;
  user: UserAuth;
};
type ErrorResponse = {
  success: false;
  errors: ErrorMessages;
};
type ErrorMessages = {
  email?: string;
  password?: string;
};

type LoginResponse = SuccessResponse | ErrorResponse;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormFields>({ resolver: zodResolver(registerSchema) });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

  const mutation = useMutation({
    mutationFn: (data: LoginFormFields) =>
      postData<LoginFormFields>(data, "auth/login"),
    onSuccess(result: LoginResponse) {
      if (result.success) {
        console.log(result.user);
        //  setLocation("/");
      } else {
        //Loop all result.errors.
        //Depends on setError so it can't be refactor to helpers.
        Object.keys(result.errors).forEach((key) => {
          const field = key as keyof LoginFormFields | "root";
          const errorMessage = result.errors[key as keyof ErrorMessages];
          setError(field, { message: errorMessage });
        });
      }
    },
    onError() {
      setError("root", { message: "Connection failed." });
    },
  });

  async function onSubmit(data: LoginFormFields) {
    mutation.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      className="mx-auto flex h-[100%] max-h-[370px] w-[100%] max-w-md flex-col items-center justify-center gap-3 rounded-lg border border-gray-700 p-4 shadow shadow-gray-700 md:h-screen lg:py-0"
    >
      <h1 className="mb-3 text-center text-3xl font-bold  text-white">
        Log in
      </h1>
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
      <div className="flex flex-col items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-square  btn-primary btn-wide mx-auto text-lg"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            "Log In"
          )}
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/auth/register" className="link link-primary">
            Register
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
