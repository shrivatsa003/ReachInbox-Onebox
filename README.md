
# ReachInbox Onebox Assignment

##  Overview
This project implements a **feature-rich Onebox Email Aggregator** as part of the **ReachInbox Associate Backend Engineer Assignment**.  
It provides real-time IMAP email synchronization, searchable storage using Elasticsearch, AI-based categorization, Slack and webhook integration, and a simple frontend UI for viewing and filtering emails.

---

##  Project Structure

```

Shrivatsa/
├── reachinbox-assignment/   # Backend (Node.js + TypeScript)
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── ...
├── reachinbox-frontend/     # Frontend (React)
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md

````

---

## ⚙️ Backend Setup (`reachinbox-assignment`)

### 1. Navigate to backend folder
```bash
cd reachinbox-assignment
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root of your backend folder with the following variables:

```
PORT=5000
ELASTICSEARCH_URL=http://localhost:9200
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXXX
IMAP_EMAIL_1=youremail1@example.com
IMAP_PASS_1=yourpassword1
IMAP_EMAIL_2=youremail2@example.com
IMAP_PASS_2=yourpassword2
```

>  Do not commit this `.env` file to GitHub.
> Add `.env` to `.gitignore`.

---

### 4. Start Elasticsearch using Docker

Make sure you have Docker installed and running.

```bash
docker run -d \
  --name elasticsearch \
  -p 9200:9200 \
  -e "discovery.type=single-node" \
  elasticsearch:8.12.0
```

You can verify it by visiting:
-> [http://localhost:9200](http://localhost:9200)

---

### 5. Start the Backend Server

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```

The backend will run on **[http://localhost:5000](http://localhost:5000)**

---

##  Frontend Setup (`reachinbox-frontend`)

### 1. Navigate to frontend folder

```bash
cd ../reachinbox-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the React app

```bash
npm start
```

The frontend will start on **[http://localhost:3000](http://localhost:3000)**

---

##  Postman Testing (Backend APIs)

### Base URL

```
http://localhost:5000
```

### Key API Endpoints

| Endpoint                    | Method | Description                                       |
| --------------------------- | ------ | ------------------------------------------------- |
| `/emails/sync`              | `GET`  | Syncs and fetches latest 30 days of emails (IMAP) |
| `/emails/search?query=text` | `GET`  | Searches emails via Elasticsearch                 |
| `/emails/categorize`        | `POST` | AI-based email categorization                     |
| `/emails/notify`            | `POST` | Sends Slack notification + triggers webhook       |

### Testing

1. Open **Postman**
2. Import your backend collection (if included)
3. Test the above routes
4. Verify responses and Slack notifications

---

## AI Categorization Labels

The backend classifies incoming emails into:

* Interested
* Meeting Booked
* Not Interested
* Spam
* Out of Office

These are auto-tagged using a lightweight AI model or rule-based classification.

---

##  Slack & Webhook Integration

* **Slack Notifications**: Sent automatically when an email is categorized as **Interested**.
* **Webhook Trigger**: Sends a JSON payload to `https://webhook.site/` (or your own endpoint) for automation.

---

##  Frontend Features

* Displays all synced emails (from multiple accounts)
* Filters by account and folder
* Displays AI category labels
* Search bar integrated with Elasticsearch backend
* Responsive minimal UI

---

##  Bonus Feature (Optional)

If implemented:

* **AI-Powered Suggested Replies (RAG)**
  Stores product and outreach data in a vector database and uses a language model to suggest context-aware email replies.

---

##  Tech Stack

**Backend:**

* Node.js + TypeScript
* Express
* IMAP Client (for mail sync)
* Elasticsearch (Docker)
* Slack API
* Webhooks
* dotenv

**Frontend:**

* React (Vite or CRA)
* Axios
* TailwindCSS / CSS
* React Hooks

---

##  Demo Video

Add your 5-minute demo video link here:
🎥 [Demo Video Link](https://www.loom.com/share/2bc7fab15d744580b73b45a88052c2e4)

---


##  Author

**Shrivatsa R S**
B.E. Computer Science (2021–2025)
Java Developer | Backend Engineer | AI Enthusiast



