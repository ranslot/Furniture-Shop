import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../Utils/httpRequest";

type SuccessResponse = {
  success: true;
  user: User;
};
type ErrorResponse = {
  success: false;
  errors: ErrorMessages;
};
type ErrorMessages = {
  email?: string;
  password?: string;
};

type LogOutResponse = SuccessResponse | ErrorResponse;

export default function LogOut() {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mutation = useMutation({
    mutationFn: () => postData({}, "auth/logout"),
    onSuccess(result: LogOutResponse) {
      if (result.success) {
        queryClient.removeQueries({ queryKey: ["user"] });
        //Can't use wouter useLocation because it didn't reload page
        window.location.replace("/");
      }
    },
  });

  function handleOnClick() {
    mutation.mutate();
  }
  return (
    <button
      className="w-full justify-center bg-red-300 font-bold "
      onClick={handleOnClick}
    >
      Logout
    </button>
  );
}
