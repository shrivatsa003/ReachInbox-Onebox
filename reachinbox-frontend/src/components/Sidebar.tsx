import { useState } from "react";

interface SidebarProps {
  selectedAccount: string | null;
  onAccountSelect: (account: string | null) => void;
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedAccount,
  onAccountSelect,
  selectedCategory,
  onCategorySelect,
}) => {
  const accounts = ["Account 1", "Account 2"];
  const categories = [
    "Interested",
    "Meeting Booked",
    "Not Interested",
    "Spam",
    "Out of Office",
  ];

  const handleAccountClick = (account: string) => {
    onAccountSelect(account === selectedAccount ? null : account);
    onCategorySelect(null); // reset category when switching account
  };

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category === selectedCategory ? null : category);
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Mail Filters</h2>
        <h3 className="text-gray-400 text-sm uppercase mb-2">Accounts</h3>
        <ul className="space-y-2">
          {accounts.map((account) => (
            <li key={account}>
              <button
                onClick={() => handleAccountClick(account)}
                className={`w-full text-left px-3 py-2 rounded-lg transition ${
                  selectedAccount === account
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {account}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-gray-400 text-sm uppercase mb-2">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategoryClick(category)}
                className={`w-full text-left px-3 py-2 rounded-lg transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
