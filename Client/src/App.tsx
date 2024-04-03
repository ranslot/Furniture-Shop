import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "./helpers/httpRequest";
import { useState } from "react";

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

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<sendFormData>();

  const [serverErrors, setServerErrors] = useState<errorFormData | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: sendFormData) => postData<sendFormData>(data, "auth"),
    onSuccess: (res: resFormData) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      if ("errors" in res) {
        setServerErrors(res);
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
        <input
          {...register("email", { required: true })}
          type="email"
          name="email"
          id="email"
        />
        {errors.email && <p>Email is required</p>}
        {serverErrors?.errors.email && <p>Wrong Email</p>}
        <label htmlFor="password">Password : </label>
        <input
          {...register("password", { required: true })}
          type="password"
          name="password"
          id="password"
        />
        {errors.password && <p>Password is required</p>}
        {serverErrors?.errors.password && <p>Wrong Password</p>}
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
