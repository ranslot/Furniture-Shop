import LogOut from "./LogOut";

type UserDropdown = {
  user: User;
};

export default function UserDropdown({ user }: UserDropdown) {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="avatar btn btn-square  btn-primary w-[120px] border"
      >
        <div className="m-auto">{user.name}</div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <a className="justify-between">Profile</a>
        </li>
        <li>
          <LogOut />
        </li>
      </ul>
    </div>
  );
}
