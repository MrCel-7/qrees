import { useEffect, useState } from "react";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function Toast({
  message,
  type = "success",
  duration = 5000,
  onClose,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    // Slide in
    setVisible(true);

    // Start slide out before remove
    const hideTimer = setTimeout(
      () => {
        setVisible(false);
      },
      Math.max(duration - 300, 0),
    );

    // Remove completely
    const removeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [message, duration]);

  if (!message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-yellow-500";

  return (
    <div
      className={`rounded-xl flex overflow-hidden flex-col transition-all duration-300 ${visible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
    >
      <div className="w-[280px] min-h-[80px] gap-2 flex bg-white shadow-xl h-full">
        <div className={`${bgColor} flex flex-1 items-center justify-center`}>
          {type === "success" ? (
            <FaCheck className="text-white" />
          ) : type === "error" ? (
            <IoClose className="text-white" />
          ) : (
            <FaExclamation className="text-white" />
          )}
        </div>
        <div className="flex flex-3 bg-white flex-col justify-center">
          <h1 className="font-bold text-md">
            {type === "success"
              ? "Success!"
              : type === "error"
                ? "Error?"
                : "Warning..."}
          </h1>
          <p className="text-xs">{message}</p>
        </div>
      </div>

      {/* Duration bar */}
      <div className="w-full h-1 bg-gray-200">
        <div
          className={`${bgColor} h-full animate-toast`}
          style={{ animationDuration: `${duration}ms` }}
        ></div>
      </div>
    </div>
  );
}
