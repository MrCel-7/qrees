import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoBackspace, IoClose } from "react-icons/io5";

export default function TransactionModal({ onClose, onAdd, myWallet }) {
  const [type, setType] = useState("income");

  const [num, setNum] = useState(0);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "000", 0];

  function formatMoney(number = 0) {
    return Number(number).toLocaleString("id-ID");
  }

  const handleSubmit = () => {
    if (num <= 0) return;

    onAdd(type, num);

    onClose();
  };

  const maxAmount = 99999999999;

  const handleNumber = (value) => {
    setNum((prev) => {
      const prevString = prev === 0 ? "" : prev.toString();

      const valueString = value.toString();

      // Remaining allowed digits
      const remainingDigits = maxAmount.toString().length - prevString.length;

      // Cut input if too long
      const allowedValue = valueString.slice(0, remainingDigits);

      // If nothing can be added
      if (allowedValue.length === 0) {
        return prev;
      }

      const newValue = Number(prevString + allowedValue);

      return newValue;
    });
  };

  const handleDelete = () => {
    setNum((prev) => {
      const newValue = prev.toString().slice(0, -1);

      return newValue === "" ? 0 : Number(newValue);
    });
  };

  const handleClear = () => {
    setNum(0);
  };

  return (
    <div className="fixed top-0 py-4 left-0 w-full h-screen bg-white">
      <div className="flex px-3">
        <div className="flex w-full justify-between gap-2 items-start text-2xl">
          <div>
            <IoClose onClick={onClose} className="cursor-pointer" />
          </div>
          <div className="flex flex-col items-end">
            <div className="flex w-fit gap-3 items-center">
              <FaArrowTrendUp className="text-green-400" />
              <h1 className="font-bold uppercase">income</h1>
            </div>
            <div className="w-full flex justify-end h-fit py-1">
              <p className="text-sm">Your wallet: Rp{formatMoney(myWallet)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 bg-white mx-3 rounded-xl shadow-xl">
        <div className="py-5 px-8 mt-8 rounded-md bg-gray-200 shadow-inner justify-center flex items-end">
          <h1 className="text-3xl">
            Rp
            {formatMoney(num)}
          </h1>
        </div>
        <div className="w-full flex justify-center gap-5 pt-3">
          <div
            className="flex py-2 cursor-pointer hover:bg-red-400 bg-red-500 rounded-xl w-full justify-center"
            onClick={handleClear}
          >
            <h1 className="text-xl font-bold text-white">Clear</h1>
          </div>
          <div
            className="flex py-2 cursor-pointer hover:bg-green-400 bg-green-500 rounded-xl w-full justify-center"
            onClick={handleSubmit}
          >
            <h1 className="text-xl font-bold text-white">Submit</h1>
          </div>
        </div>
      </div>

      {/* Numpad */}
      <div className="w-full fixed bottom-0">
        <div className="grid grid-cols-3 w-full">
          {numbers.map((item, index) => (
            <div
              key={index}
              className="h-20 flex items-center justify-center cursor-pointer active:bg-gray-200"
              onClick={() => handleNumber(item)}
            >
              <h1 className="text-xl">{item}</h1>
            </div>
          ))}

          <div
            className="h-20 flex items-center justify-center cursor-pointer active:bg-gray-200"
            onClick={handleDelete}
          >
            <IoBackspace />
          </div>
        </div>
      </div>
    </div>
  );
}
