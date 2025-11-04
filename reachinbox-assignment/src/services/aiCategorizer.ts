// src/services/aiCategorizer.ts
export type Category =
  | "Interested"
  | "Meeting Booked"
  | "Not Interested"
  | "Spam"
  | "Out of Office";

export async function aiCategorizeEmail(subject: string, text: string): Promise<Category> {
  const content = (subject + " " + text).toLowerCase();

  if (/out of office|vacation|auto-?reply|away from desk/.test(content))
    return "Out of Office";
  if (/meeting|schedule|book(ed|ing)|call|interview/.test(content))
    return "Meeting Booked";
  if (/not interested|unsubscribe|no thanks|stop emailing/.test(content))
    return "Not Interested";
  if (/offer|discount|buy now|promo|sale|free trial|subscribe|advertisement/.test(content))
    return "Spam";

  // Default/fallback
  return "Interested";
}
