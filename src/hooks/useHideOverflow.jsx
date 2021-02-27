import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectConfirmingDelete } from "../selectors";

const useHideOverflow = (ref) => {
  const confirmingDelete = useSelector(selectConfirmingDelete);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    const handleTouchMove = (event) => {
      if (event.scale !== 1) {
        event.preventDefault();
      }
    };

    if (confirmingDelete) {
      if (window.innerWidth <= 425) {
        html.style.position = "relative";
        html.style.overflow = "hidden";
        body.style.position = "relative";
        body.style.overflow = "hidden";

        window.addEventListener("touchmove", handleTouchMove, {
          passive: false,
        });
      } else {
        ref.current.style.overflowY = "hidden";
      }
    }

    return () => {
      ref.current.style.overflowY = "scroll";
      html.style.position = "unset";
      html.style.overflow = "unset";
      body.style.position = "unset";
      body.style.overflow = "unset";
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [confirmingDelete]);
};

export default useHideOverflow;
