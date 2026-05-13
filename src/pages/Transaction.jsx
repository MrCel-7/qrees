import { useEffect, useState } from "react";

export default function Transaction() {
  const [walletData, setWalletData] = useState([]);
  const [formData, setFormData] = useState({
    type: "income",
    desc: "salary",
    value: "",
  });

  // Load data from localstorage
  useEffect(() => {
    const savedData = localStorage.getItem("wallet-data");

    if (savedData) {
      setWalletData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localstorage
  useEffect(
    (num) => {
      localStorage.setItem("wallet-data", JSON.stringify(walletData));
    },
    [walletData],
  );

  // Format numbers with coma
  const formatNumber = (num) => {
    return Number(num).toLocaleString("id-ID");
  };

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numbers for value
    if (name === "value") {
      const onlyNumbers = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.value) return;

    const newData = {
      id: Date.now(),
      ...formData,
    };

    setWalletData([newData, ...walletData]);

    setFormData({
      type: "income",
      desc: "salary",
      value: "",
    });
  };

  // Total wallet
  const totalWallet = walletData.reduce((acc, item) => {
    if (item.type === "income") {
      return acc + Number(item.value);
    }

    if (item.type === "expense") {
      return acc - Number(item.value);
    }

    return acc;
  }, 0);
}
