import React from "react";
import EmailCard from "./EmailCard";

interface Email {
  id: string;
  from: string;
  subject: string;
  category?: string;
}

interface EmailListProps {
  emails: Email[];
}

const EmailList: React.FC<EmailListProps> = ({ emails }) => {
  if (!emails.length) {
    return (
      <p className="text-gray-400 mt-8 text-center">
        No emails found. Try searching for a keyword.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {emails.map((email) => (
        <EmailCard
          key={email.id}
          from={email.from}
          subject={email.subject}
        />
      ))}
    </div>
  );
};

export default EmailList;
