import {ReactNode} from "react"
import {toast , ToastOptions} from "react-toastify"
export const successToast = (content: ReactNode, toastOptions?: ToastOptions) =>
  toast.success(content, { ...toastOptions });
export const errorToast = (content: ReactNode, toastOptions?: ToastOptions) =>
  toast.error(content, { ...toastOptions });
export const warningToast = (content: ReactNode, toastOptions?: ToastOptions) =>
  toast.warning(content, { ...toastOptions });
