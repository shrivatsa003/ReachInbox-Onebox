import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import EmailList from "../components/EmailList";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Dashboard() {
  const [emails, setEmails] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [account, setAccount] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        // Don’t call if no filters or query
        if (!query.trim() && !account && !category) {
          setEmails([]);
          return;
        }

        const params = new URLSearchParams();
        if (query) params.append("q", query);
        if (account) params.append("account", account);
        if (category) params.append("category", category);

        const res = await api.get(`/search?${params.toString()}`);
        setEmails(res.data.results || []);
      } catch (err) {
        console.error("Error fetching emails:", err);
      }
    };

    fetchEmails();
  }, [query, account, category]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar
        selectedAccount={account}
        onAccountSelect={setAccount}
        selectedCategory={category}
        onCategorySelect={setCategory}
      />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">📬 ReachInbox Dashboard</h1>
        <SearchBar onSearch={setQuery} />
        <EmailList emails={emails} />

        <p className="mt-4 text-gray-400 text-sm">
          Selected Account: {account || "None"} | Selected Category:{" "}
          {category || "None"}
        </p>
      </main>
    </div>
  );
}
