import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const showNotification = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
      });
      break;
    case "danger":
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
      });
      break;
    default:
      break;
  }
};

export default showNotification;
