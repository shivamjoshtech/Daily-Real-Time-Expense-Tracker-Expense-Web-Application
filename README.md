# Daily-Real-Time-Expense-Tracker-Expense-Web-Application
🧾 Expense Tracker (MERN + TypeScript) A responsive web app to manage daily expenses with category-wise tracking, charts, and PDF export — built using MongoDB, Express, React, and Node.js with TypeScript.


# 💰 Expense Tracker Web Application (MERN + TypeScript)

A responsive, full-featured Expense Tracker built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with TypeScript. Track your daily expenses with ease, view analytics, and generate beautiful reports.

---

## 🚀 Features

### 🎨 UI/UX Design
- Modern, minimalistic, and visually appealing interface
- Theme: Black & Blue with accent colors
- Fully responsive for Desktop, Tablet, and Mobile

### 🧩 Core Functionalities
- **Daily Expense Input**
  - Add item name, amount, and category (Food, Travel, Other)
  - Auto-save with current time and date

- **Expense Management**
  - Edit and delete expenses for any day
  - Automatic daily & category-wise totals

- **Visual Analytics**
  - Pie chart for category-wise expense distribution (daily/monthly)
  - Daily comparison with previous day’s expenses

- **History & Reports**
  - Track and filter expense history by date
  - Generate detailed monthly statements
  - Export and Print reports (PDF with tables and charts)

---

## 📁 Folder Structure
📦 expense-tracker-app/
├── client/ # Frontend (React + TypeScript)

│ ├── public/

│ ├── src/

│ │ ├── assets/

│ │ ├── components/

│ │ │ ├── ExpenseForm.tsx

│ │ │ ├── ExpenseList.tsx

│ │ │ ├── ExpenseChart.tsx

│ │ │ ├── ExpenseTable.tsx

│ │ │ ├── DailySummary.tsx

│ │ │ ├── MonthlyReport.tsx

│ │ │ ├── DateSelector.tsx

│ │ │ └── PDFExportButton.tsx

│ │ ├── pages/

│ │ ├── types/

│ │ ├── services/

│ │ ├── App.tsx

│ │ └── main.tsx

│ └── tailwind.config.js

│

├── server/ # Backend (Node.js + Express + TypeScript)

│ ├── src/

│ │ ├── controllers/

│ │ ├── models/

│ │ │ └── Expense.ts

│ │ ├── routes/

│ │ │ └── expenses.ts

│ │ ├── config/

│ │ │ └── db.ts

│ │ └── index.ts

│ └── tsconfig.json

│

├── .env

├── .gitignore

├── README.md

├── package.json

└── yarn.lock / package-lock.json


---

## 🛠 Tech Stack

### Frontend
- React.js (with TypeScript)
- Tailwind CSS (for styling)
- Chart.js / Recharts (for pie charts)
- jsPDF (for PDF generation)

### Backend
- Node.js + Express.js
- MongoDB (with Mongoose ODM)
- TypeScript

---

## 🧪 Key Components

- `ExpenseForm` - Add new expense
- `ExpenseList` - Display list of daily expenses
- `ExpenseTable` - Table view for daily/monthly reports
- `ExpenseChart` - Pie chart visualization
- `DailySummary` - Today's and yesterday's expense comparison
- `MonthlyReport` - Full monthly expense breakdown
- `PDFExportButton` - Export & Print monthly reports
- `DateSelector` - View history by date
- `EditExpenseModal` - Update any existing entry

---

## 🌐 API Routes (Express.js)

| Route              | Method | Description               |
|--------------------|--------|---------------------------|
| `/api/expenses`    | GET    | Get all expenses          |
| `/api/expenses/:id`| GET    | Get expense by ID         |
| `/api/expenses`    | POST   | Add a new expense         |
| `/api/expenses/:id`| PUT    | Update an existing expense|
| `/api/expenses/:id`| DELETE | Delete an expense         |

---

## 📦 Installation

### Prerequisites
- Node.js & npm or yarn
- MongoDB installed or cloud instance (MongoDB Atlas)

### Clone the Repository

```
git clone https://github.com/your-username/expense-tracker-app.git
cd expense-tracker-app
```
Install Backend Dependencies
```
cd server
npm install
```
Install Frontend Dependencies

cd ../client
npm install

▶️ Running the App

Start Backend

cd server
npm run dev

Start Frontend

cd client
npm run dev

The app will be running on:

Frontend: http://localhost:5173

Backend: http://localhost:5000

📸 Screenshots
Add screenshots here once the UI is complete.


![Screenshot 2025-06-05 180449](https://github.com/user-attachments/assets/90e36c85-e6d2-4d4d-8231-2aeaf892d0c6)





![Screenshot 2025-06-05 180435](https://github.com/user-attachments/assets/dd6770cb-5260-4d73-8283-c3fc23834a97)





![Screenshot 2025-06-05 180406](https://github.com/user-attachments/assets/d6427dd1-93ae-4541-81f8-2d984d650a23)





![Screenshot 2025-06-05 180350](https://github.com/user-attachments/assets/22b73ad2-3c55-4796-8772-47784f716ed0)




🙏 Acknowledgements
Thanks to the open-source community for great libraries like:

React.js

Tailwind CSS

Chart.js

jsPDF

Express & MongoDB

📬 Contact
Made with ❤️ by Shivam Joshi
Twitter: @shivamjoshiiiii

📝 License
This project is open-source and available under the MIT License.

