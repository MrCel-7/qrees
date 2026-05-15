import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaEye,
  FaEyeSlash,
  FaPiggyBank,
  FaWallet,
} from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import TransactionModal from "../components/TransactionModal";

export default function Home() {
  const username = "Marcel Wang";
  const userRole = "Master";

  // Load from localstorage
  const [wallet, setWallet] = useState(() => {
    return Number(localStorage.getItem("wallet")) || 0;
  });

  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });

  // Save to localstorage
  useEffect(() => {
    localStorage.setItem("wallet", wallet);
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Add transaction
  const handleAddTransaction = (type, amount) => {
    const transaction = {
      id: Date.now(),
      type,
      amount,
      createdAt: new Date(),
    };

    // Update wallet
    if (type === "income") {
      setWallet((prev) => prev + amount);
    }

    if (type === "expense") {
      setWallet((prev) => prev - amount);
    }

    // Save transaction
    setTransactions((prev) => [transaction, ...prev]);
  };

  const savings = 2000000;

  const [showWallet, setShowWallet] = useState(false);
  const [eye, setEye] = useState(true);

  const [showModal, setShowModal] = useState(false);

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
        <div className="flex items-center  gap-3 text-md text-white text-shadow font-bold">
          <FaWallet />
          <p>Wallet</p>
        </div>
        <div className="my-10 flex justify-between">
          <div className="flex gap-4">
            <h1 className="text-white text-3xl font-semibold ">Rp</h1>
            <h1 className="font-semibold text-3xl text-white">
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
              <FaEye className="text-white text-md cursor-pointer" />
            </button>
          ) : (
            <button
              onClick={() => {
                setShowWallet(false);
                setEye(true);
              }}
            >
              <FaEyeSlash className="text-white text-md cursor-pointer" />
            </button>
          )}
        </div>
        <div className="w-full">
          <p className="text-xs text-white">
            Savings: Rp {showWallet ? formatMoney(savings) : "*******"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col mt-5 mb-10 w-full gap-5">
        <div className="grid grid-cols-2 gap-5">
          <button
            onClick={() => setShowModal(true)}
            className="shadow-xl py-2 flex items-center justify-center gap-2 cursor-pointer text-white font-bold bg-green-400 rounded-xl"
          >
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

      {/* Modal Form */}
      {showModal && (
        <TransactionModal
          myWallet={wallet}
          onAdd={handleAddTransaction}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Recent Transaction */}
      <div className="w-full flex flex-col">
        <div className="w-full">
          <Link className="text-md">Recent transactions {">"}</Link>
        </div>
      </div>
    </div>
  );
}
