import { useState } from "react";
import {
  FaBell,
  FaEye,
  FaEyeSlash,
  FaPiggyBank,
  FaWallet,
} from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

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
          <div className="p-2 bg-sky-200 w-fit rounded-full shadow-xl">
            <img src="/user.png" className="w-5" />
          </div>
        </div>

        <h1 className="text-lg font-bold">QREES</h1>

        <div className="flex items-center">
          <div className="p-2 rounded-full bg-sky-200 shadow-xl">
            <FaBell className="text-md text-blue-500 text-shadow" />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="w-full bg-sky-400 p-5 mt-10 rounded-xl shadow-xl">
        <div className="flex items-center  gap-3 text-lg text-white text-shadow font-bold">
          <FaWallet />
          <p>Wallet</p>
        </div>
        <div className="my-10 flex justify-between">
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

      {/* Navigation */}
      <div className="flex flex-col w-full gap-5">
        <div className="grid grid-cols-2 mt-5 gap-5">
          <button className="shadow-xl py-2 flex items-center justify-center gap-2 cursor-pointer text-white font-bold bg-green-400 rounded-xl">
            <FaArrowTrendUp />
            <p className="text-md">Income</p>
          </button>
          <button className="shadow-xl py-2 flex items-center justify-center gap-2 cursor-pointer text-white font-bold bg-red-400 rounded-xl">
            <FaArrowTrendDown />
            <p className="text-md">Expense</p>
          </button>
        </div>
        <button className="shadow-xl py-2 flex items-center justify-center gap-2 cursor-pointer text-white font-bold bg-yellow-400 rounded-xl">
          <FaPiggyBank />
          <p className="text-md">Savings</p>
        </button>
      </div>
    </div>
  );
}
