import React from "react";

interface EmailCardProps {
  from: string;
  subject: string;
}

const EmailCard: React.FC<EmailCardProps> = ({ from, subject }) => {
  return (
    <div className="bg-white text-gray-900 rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
      <p className="font-semibold">{subject}</p>
      <p className="text-sm text-gray-500 mt-1">{from}</p>
    </div>
  );
};

export default EmailCard;
