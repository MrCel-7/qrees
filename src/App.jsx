import { useState } from "react";
import { FaBell, FaExclamation, FaEye, FaEyeSlash } from "react-icons/fa";

export default function App() {
  const username = "Marcel Wang";
  const userRole = "Master";
  const wallet = 10000;
  const savings = 2000000;

  const [showWallet, setShowWallet] = useState(false);
  const [eye, setEye] = useState(true);

  function formatMoney(number) {
    return number.toLocaleString("id-ID");
  }

  return (
    <div className="w-full h-screen flex flex-col px-7">
      {/* Header */}
      <div className="w-full py-5 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="p-3 bg-sky-200 w-fit rounded-full shadow-xl">
            <img src="/user.png" className="w-8" />
          </div>
        </div>

        <h1 className="text-2xl font-bold">QREES</h1>

        <div className="flex items-center">
          <div className="p-3 rounded-full bg-sky-200 shadow-xl">
            <FaBell className="text-2xl text-blue-500 text-shadow" />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="w-full bg-sky-400 p-5 mt-10 rounded-xl">
        <h1 className="text-lg text-white text-shadow font-bold">Wallet</h1>
        <div className="my-13 flex justify-between">
          <div className="flex gap-4">
            <h1 className="text-white text-4xl font-semibold ">Rp</h1>
            <h1 className="font-semibold text-4xl text-white">
              {showWallet ? formatMoney(wallet) : "*******"}
            </h1>
          </div>
          {eye ? (
            <button
              onClick={() => {
                setShowWallet(true);
                setEye(false);
              }}
            >
              <FaEye className="text-white text-xl cursor-pointer" />
            </button>
          ) : (
            <button
              onClick={() => {
                setShowWallet(false);
                setEye(true);
              }}
            >
              <FaEyeSlash className="text-white text-xl cursor-pointer" />
            </button>
          )}
        </div>
        <div className="w-full">
          <p className="text-md text-white">
            Savings: Rp {showWallet ? formatMoney(savings) : "*******"}
          </p>
        </div>
      </div>
    </div>
  );
}
