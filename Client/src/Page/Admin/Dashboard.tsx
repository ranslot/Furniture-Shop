import useAlertStore from "../../Utils/store";

export default function Dashboard() {
  console.log("Dashboard");
  const { showAlert } = useAlertStore();

  function handleOnclick() {
    const message = "Dashboard ";
    const error = false;
    showAlert(message, error);
  }

  return (
    <div>
      <button onClick={handleOnclick}> alert! </button>
      <div className="btn drawer-button">Dashboard</div>
    </div>
  );
}
