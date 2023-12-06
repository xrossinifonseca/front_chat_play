import { notifcation } from "@/functions/notifcations";
interface Handle {
  message: string;
  time: number;
  action?: () => any;
}
export const useFetchTimeout = () => {
  const handleTimeout = (props: Handle) => {
    let time = setTimeout(() => {
      notifcation.warning(props.message);

      if (props.action) {
        setTimeout(() => {
          props.action!();
        }, 4000);
      }
    }, props.time);

    return time;
  };

  return { handleTimeout };
};
