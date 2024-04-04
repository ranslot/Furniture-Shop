import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postData } from "../helpers/httpRequest";
import { useMutation } from "@tanstack/react-query";

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

type RegisterSuccess = {
  success: true;
};
type RegisterFail = {
  success: false;
  errors: {
    errorName?: string;
    errorEmail?: string;
    errorPassword?: string;
    errorConfirmPassword?: string;
  };
};
type RegisterResponse = RegisterSuccess | RegisterFail;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormFields>({ resolver: zodResolver(registerSchema) });

  const mutation = useMutation({
    mutationFn: (data: RegisterFormFields) =>
      postData<RegisterFormFields>(data, "auth/register"),
    onSuccess(result: RegisterResponse) {
      if (result.success) {
        console.log(result);
      } else {
        //Loop all result.errors. depends on setError so it can't be refactor tp helpers
        Object.keys(result.errors).forEach((key) => {
          const field = key
            .replace("error", "")
            .toLowerCase() as keyof RegisterFormFields;
          const errorMessage = result.errors[key as keyof typeof result.errors];
          setError(field, { message: errorMessage });
        });
      }
    },
    onError() {
      setError("root", { message: "Connection failed." });
    },
  });

  async function onSubmit(data: RegisterFormFields) {
    mutation.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      className="w-[100%] max-w-md flex-row align-middle justify-center h-[100%] max-h-[500px] m-auto gap-3"
    >
      <div className="">
        <label htmlFor="name">Username : </label>
        <input className=" input-sm " {...register("name")} type="text" />
        {errors?.name && <p className="text-error ">{errors?.name.message}</p>}
      </div>
      <div className="">
        <label htmlFor="email">Email : </label>
        <input className=" input-sm " {...register("email")} type="text" />
        {errors?.email && (
          <p className="text-error ">{errors?.email.message}</p>
        )}
      </div>
      <div className="">
        <label htmlFor="password">Password : </label>
        <input
          className=" input-sm"
          {...register("password")}
          type="password"
        />
        {errors?.password && (
          <p className="text-error ">{errors?.password.message}</p>
        )}
      </div>
      <div className="">
        <label htmlFor="confirmPassword">Confirm Password : </label>
        <input
          className=" input-sm"
          {...register("confirmPassword")}
          type="password"
        />
        {errors?.confirmPassword && (
          <p className="text-error ">{errors?.confirmPassword.message}</p>
        )}
      </div>
      <div className="flex align-middle justify-end pr-10">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-square  btn-secondary "
        >
          {isSubmitting ? "Loading..." : "Register"}
        </button>
        {errors?.root && <p className="text-error">{errors?.root?.message}</p>}
      </div>
    </form>
  );
}
