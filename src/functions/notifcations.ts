import { ToastOptions, toast } from "react-toastify";

const options: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const notifcation = {
  error(message: string) {
    toast(message, {
      ...options,
      theme: "colored",
      type: "error",
    });
  },
  success(message: string) {
    toast(message, {
      ...options,
      theme: "colored",
      type: "success",
    });
  },
  warning(message: string) {
    toast(message, {
      ...options,
      theme: "colored",
      type: "warning",
    });
  },
};
