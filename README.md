# 🛍️ My E-Commerce App

A sleek, responsive e-commerce platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**, using the **FakeStore API**. This project includes a complete product catalog, dynamic cart system, image editing, and user reviews.

🔗 **Live Demo**: [my-ecommerce-app.vercel.app](https://my-ecommerce-app-two-sooty.vercel.app)

---

## 🚀 Features

- ✅ Curated Hero Section
- ✅ Product Catalog with Category Filters (Apparel, Accessories, Digital)
- ✅ Search Functionality
- ✅ Floating "Add to Cart" Button
- ✅ Cart Page with Quantity Management (`localStorage`)
- ✅ Product Detail Page  
  • Image editor (Pixo)  
  • Sticky title/description  
- ✅ Related Product Suggestions
- ✅ Reviews Section (Anonymous or Named)
- ✅ Fully Responsive

---

## 🛠️ Tech Stack

- ⚛️ Next.js 14
- ⌨️ TypeScript
- 💨 Tailwind CSS
- 🛒 FakeStore API
- 🧠 localStorage for cart
- ✏️ Pixo Editor (client-side image editing)
- 🎯 Lucide Icons

---

## 📦 Getting Started

```bash
git clone https://github.com/yourusername/my-ecommerce-app.git
cd my-ecommerce-app
npm install
npm run dev

Visit http://localhost:3000 to explore the app locally.

🏗️ Build & Deploy
To create a production build:

npm run build
npm start

Deployed on Vercel:
👉 https://my-ecommerce-app-two-sooty.vercel.app

📁 Folder Structure
src/
├── components/       // Shared components (Header, ProductCard, etc.)
├── context/          // Cart context for global state
├── pages/            // Routes: index, product/[id], cart
├── public/           // Static assets
└── styles/           // Tailwind and global styles

💡 Potential Improvements
🧾 Backend for review persistence

🛍️ Payment gateway integration (e.g. Stripe)

🌒 Dark mode toggle

🔐 Authentication system

👨‍💻 Author
Made with ❤️ by K Deepali
