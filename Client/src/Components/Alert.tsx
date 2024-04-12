import useAlertStore from "../Utils/store";

export default function Alert() {
  const { show, message, error, handleClose } = useAlertStore();

  if (!show) {
    return null;
  } else {
    return (
      <div className=" fixed left-[50%] top-[64px] z-50 p-0">
        <div
          role="alert"
          className={`alert p-2 ${error ? "alert-error" : "alert-success"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
          <div>
            <button className="btn btn-ghost btn-sm" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>{" "}
      </div>
    );
  }
}
