import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postData } from "../Utils/httpRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { loginSchema } from "../Utils/formSchema";

type LoginFormFields = z.infer<typeof loginSchema>;

type LoginSuccess = {
  success: true;
  user: User;
};
type LoginError = {
  success: false;
  errors: LoginErrorMessages;
};
type LoginErrorMessages = {
  email?: string;
  password?: string;
};

type LoginResponse = LoginSuccess | LoginError;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormFields>({ resolver: zodResolver(loginSchema) });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormFields) =>
      postData<LoginFormFields>(data, "auth/login"),
    onSuccess(result: LoginResponse) {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setLocation("/");
      } else {
        //Loop all result.errors.
        //Depends on setError so it can't be refactor to Utils.
        Object.keys(result.errors).forEach((key) => {
          const field = key as keyof LoginFormFields | "root";
          const errorMessage = result.errors[key as keyof LoginErrorMessages];
          setError(field, { message: errorMessage });
        });
      }
    },
    onError() {
      setError("root", { message: "Connection failed." });
    },
  });

  async function onSubmit(data: LoginFormFields) {
    mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      className="mx-auto flex h-[100%] max-h-[370px] w-[100%] max-w-md flex-col items-center justify-center gap-3 rounded-lg border-[1px] p-4 shadow-xl md:h-screen lg:py-0"
    >
      <h1 className="mb-3 text-center text-3xl font-bold  text-primary">
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
          disabled={isPending}
          className="btn btn-square  btn-primary btn-wide mx-auto text-lg"
        >
          {isPending ? (
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
