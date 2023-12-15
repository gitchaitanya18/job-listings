import { toast } from "react-toastify";

export const showToast = (msg, color) => {
    toast.success(msg, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { columnRuleColor: color }
    });
};