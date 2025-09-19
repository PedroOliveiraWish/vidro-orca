
import { toast } from "react-toastify";

export const notifyError = ({ message }: { message: string }) => toast.error(message);
export const notifySuccess = ({ message }: { message: string }) => toast.success(message);