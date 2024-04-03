import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "./helpers/httpRequest";
import { useState } from "react";
import { Link, useLocation } from "wouter";

type sendFormData = {
  email: string;
  password: string;
};

type errorFormData = {
  errors: {
    email: string;
    password: string;
  };
};

type successFormData = {
  success: {
    msg: string;
    user: {
      email: string;
      password: string;
      id: number;
      name: string;
      isAdmin: boolean | null;
      createdAt: Date | null;
      modifiedAt: Date | null;
    };
    accessToken: string;
  };
};

type resFormData = successFormData | errorFormData;

export default function Test() {
  const { register, handleSubmit } = useForm<sendFormData>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

  const [errors, setErrors] = useState<errorFormData | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: sendFormData) =>
      postData<sendFormData>(data, "auth/login"),
    onSuccess: (res: resFormData) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      if ("errors" in res) {
        setErrors(res);
      } else {
        setLocation("/u");
      }
      console.log(res);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: sendFormData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <label htmlFor="email">Email : </label>
        <input {...register("email")} type="email" required />
        {errors?.errors.email && <p>{errors?.errors.email}</p>}
        <label htmlFor="password">Password : </label>
        <input
          {...register("password")}
          type="password"
          minLength={8}
          required
        />
        {errors?.errors.password && <p>{errors?.errors.password}</p>}
        <button type="submit" className="btn btn-circle btn-accent">
          submit
        </button>
      </form>
      <Link to="/g" className="btn btn-square btn-secondary ">
        Guest
      </Link>
    </>
  );
}
