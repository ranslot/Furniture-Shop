import useAlertStore from "../Utils/store";

export default function Alert() {
  const { show, message, error, handleClose } = useAlertStore();

  if (show) {
    setTimeout(() => handleClose(), 3000);
  }

  return (
    <div
      className={`fixed left-0 right-0 top-[64px] z-50 mx-auto w-[35%]  ${show ? "scale-100 " : "scale-0"} transform-gpu transition-all`}
    >
      <div
        role="alert"
        className={`alert p-2 ${error ? "alert-error" : "alert-success"}`}
      >
        {error ? (
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
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
        )}

        <span>{message}</span>
        <div>
          <button className="btn btn-ghost btn-sm" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
