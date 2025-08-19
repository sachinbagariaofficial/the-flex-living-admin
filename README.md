# 🏡 Property Dashboard (React + TypeScript + Vite)

This project is a **Property Management Dashboard** built with **React, TypeScript, and Vite**.  
It allows users to view, filter, and manage property reviews, ratings, and statuses in a clean and responsive UI.

The dashboard provides an optimized way to fetch and display data with pagination, filtering, and toggle-based status updates (e.g., publish/unpublish reviews).

---

## 📸 Screenshots

![Dashboard Overview](src/assets/Dashboard.png)
![Mobile](src/assets/Mobile.png)

---

## ✨ Features & Functionality

- 📌 **Property Listing**: Displays property details including name, location, rating, and review count.
- 🎚 **Toggle Review Status**: Publish/unpublish reviews with smooth toggle animation.
- 🔎 **Filters & Search**:
  - Filter by status, rating, sort order, etc.
  - (Search box placeholder included, toast message shown since backend search is not implemented yet).
- 📊 **Pagination**: Supports `itemsPerPage` parameter for dynamic data loading.
- 🎨 **Responsive UI**: Works seamlessly across desktop and mobile devices.
- 🚀 **Optimistic Updates**: UI immediately reflects toggle changes while syncing with the API.
- ⚡ **Error Handling**: Reverts status in case of API failure and shows a toast notification.

---

## 🛠️ Technologies Used

- **React 18** (UI framework)
- **TypeScript** (type safety)
- **Vite** (fast bundler & dev server)
- **TailwindCSS** (styling & responsiveness)
- **Lucide Icons** (icons for ratings, reviews, etc.)
- **React Toastify** (notifications & error handling)

---

## 📂 Project Setup

```bash
# Clone repository
git clone https://github.com/sachinbagariaofficial/flex-living-admin.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
