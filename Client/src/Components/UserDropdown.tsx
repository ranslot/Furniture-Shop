import LogOutModal from "./LogOutModal";

type UserDropdown = {
  user: User;
};

export default function UserDropdown({ user }: UserDropdown) {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-square  btn-primary w-[120px] border"
      >
        <div className="m-auto">{user.name}</div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-md z-[1] mt-3 w-40 gap-1 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <a className="h-11 content-center justify-center font-bold">
            Profile
          </a>
        </li>
        <li>
          <button
            className="h-11 w-full content-center justify-center bg-accent font-bold text-white"
            onClick={() => {
              const logOutModal = document.getElementById(
                "logout_modal",
              ) as HTMLDialogElement;
              logOutModal.showModal();
            }}
          >
            Logout
          </button>
        </li>
      </ul>
      <LogOutModal />
    </div>
  );
}
