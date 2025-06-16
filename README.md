
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
# Install Backend Dependencies
```
cd server
npm install
```
# Install Frontend Dependencies
```
cd ../client
npm install
```
# Environment Setup
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
# ▶️ Running the App
```
Start Backend
```
cd server
npm run dev
```
Start Frontend
```
cd client
npm run dev
```
The app will be running on:
```
Frontend: http://localhost:5173

Backend: http://localhost:5000

# 📤 Deployment

You can deploy the app using platforms like:

Frontend: Vercel, Netlify

Backend: Render, Railway, Heroku

Database: MongoDB Atlas

# 📸 Screenshots

![Screenshot 2025-06-05 180449](https://github.com/user-attachments/assets/e46bdf66-0df7-4228-a52f-42d55a911ab1)


Add & View Daily Expenses
Easily add your daily expenses by entering the item name, amount, and selecting a category. All entries are automatically time-stamped and instantly listed with options to edit or delete.

![Screenshot 2025-06-05 180435](https://github.com/user-attachments/assets/70f4c881-f044-4bc1-9876-9a97cb4e1235)


Daily Summary & Pie Chart
Get a quick overview of your total spending for the day. A visually styled pie chart shows category-wise distribution (Food, Travel, Other) for better clarity.


![Screenshot 2025-06-05 180449](https://github.com/user-attachments/assets/1ae5cf6f-2de3-40be-b58d-ca356b994572)


Monthly Report Table
Track your daily expenses across the month in a well-structured table. View date-wise totals and a final monthly summary to stay on top of your spending habits.

![Screenshot 2025-06-05 180350](https://github.com/user-attachments/assets/f7bd7743-26d1-4c14-a329-5f601d3af10f)

Export PDF & Print Reports
Generate a professional-looking monthly report with a single click. Download the full report as a PDF including tables and charts, or print it directly for physical records.

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



---





🧾 Expense Tracker App (MERN + TypeScript)
A responsive and modern web application to track your daily expenses. Built with the MERN stack and TypeScript, it offers real-time data tracking, daily/monthly summaries, category-wise analytics with charts, and PDF export/print functionality. Simple UI, powerful features — everything you need to manage your money smarter.

**URL**: https://lovable.dev/projects/fdfbf0ff-58ee-47c3-b985-b78e5dd4c2ed


