# Blackcoffer – Data Visualization Dashboard

## Overview
This project is a high-performance data visualization dashboard developed for the **Software Engineer (Full-stack) Associate test assignment** for Blackcoffer. 

The application transforms raw JSON data into actionable business intelligence through a series of interactive charts, real-time filters, and a premium, responsive user interface.

## 🚀 Live Deployed URL
[View Dashboard Online](https://blackcoffer-data-visualization-dash.vercel.app/)

---

## 🛠️ Tech Stack
- **Framework**: [Next.js 15+](https://nextjs.org/) (React.js)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ✨ Features
- **Dynamic Filtering**: Filter data across 7 dimensions: Year, Topic, Region, PESTLE, Sector, Country, and Source.
- **Advanced Visualizations**:
    - **Intensity & Likelihood Trends**: Multi-layered Area charts for temporal patterns.
    - **Sector Analysis**: Interactive Treemap with intelligent text truncation.
    - **Topic Distribution**: Custom radial and donut charts for categorical breakdown.
    - **Strategic Analysis**: Radar charts for PESTLE categories.
- **Premium UI/UX**:
    - Custom monochromatic light grid header design.
    - Fully responsive layout optimized for Mobile, Tablet, and Desktop (Balanced 2-column laptop view).
    - Interactive tooltips and polished hover effects.
- **Real-time Analytics**: Integrated Statistics Cards for high-level data summaries (Avg Intensity, Relevance, etc.).

---

## 📁 Project Structure
```text
├── src/
│ ├── app/          # Next.js App Router (Pages & API Routes)
│ ├── components/   # Modular UI & Chart Components
│ ├── lib/          # Utilities & Database Connections
│ └── api/          # Backend Data Services
├── public/         # Static Assets
├── package.json    # Dependencies & Scripts
├── next.config.js  # Framework Configuration
├── tailwind.config.js
└── README.md
```

---

## 🔑 Environment Variables
Create a `.env.local` file in the root directory and add your connection string:
```bash
MONGODB_URI=your_mongodb_atlas_connection_string
```
> **Security Note**: The `.env.local` file is excluded from version control to protect credentials.

---

## 💻 How to Run Locally

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📝 Notes & Submission
- This project strictly follows the assignment guidelines provided by Blackcoffer.
- Built with production-ready code, passing all ESLint and build validation checks.
- Source code is maintained privately and shared via Google Drive as per instructions.
- Designed with high attention to visual aesthetics and performance.
