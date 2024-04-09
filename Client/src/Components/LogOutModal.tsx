import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../Utils/httpRequest";

type LogOutSuccess = {
  success: true;
};
type LogOutError = {
  success: false;
  errors: string;
};

type LogOutResponse = LogOutSuccess | LogOutError;

export default function LogOutModal() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
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
    mutate();
  }

  return (
    <dialog className="modal " id="logout_modal">
      <div className="modal-box">
        <p className=" text-lg font-semibold">
          Are you sure you want to log out?
        </p>
        <div className="modal-action">
          <button className="btn btn-accent " onClick={handleOnClick}>
            {isPending ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              "Log Out"
            )}
          </button>
          {/* form is used for exit dialog modal */}
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
