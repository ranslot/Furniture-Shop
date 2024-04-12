import { create } from "zustand";

type AlertState = {
  show: boolean;
  message: string;
  error: boolean;
  showAlert: (message: string, error: boolean) => void;
  handleClose: () => void;
};

const initialState = {
  show: false,
  message: "",
  error: false,
};

const useAlertStore = create<AlertState>()((set) => ({
  ...initialState,

  showAlert: (message: string, error: boolean) =>
    set({ show: true, message, error }),

  handleClose: () => set({ ...initialState }),
}));

export default useAlertStore;
