# Week 3: E-Commerce Product Comparison 🛒

This week's assignment required me to replicate a responsive e-commerce product comparison page. It uses modern React architecture by breaking down a complex UI into reusable components and utilizing a Just-In-Time CSS engine (which is Tailwind) for styling.

## 🚀 Technologies Used

* **React** (UI Library)
* **Vite** (Next Generation Frontend Tooling)
* **Tailwind CSS v4** (Utility-first CSS framework)
* **Lucide React** (Icon library)

## 📁 Project Structure

The application is structured using a feature-based architecture to keep components, pages, and data cleanly separated:

```text
src/
├── assets/                 # Static assets like images and fonts
├── components/             # Reusable UI components
│   ├── ComparisonTable.jsx # Main dynamic grid comparing product specs
│   ├── FeaturesBanner.jsx  # Highlighted store features (e.g., Free Shipping)
│   ├── Footer.jsx          # Site footer with newsletter signup
│   ├── Header.jsx          # Top navigation bar with Lucide icons
│   └── Hero.jsx            # Page banner with background image blend modes
├── data/                   # Externalized data structures
│   └── comparisonData.jsx  # Structured object containing product specifications
├── pages/                  # Master layout components
│   └── ComparisonPage.jsx  # Assembles all components into the final page view
├── App.css                 # Triggers the Tailwind CSS JIT compiler
├── App.jsx                 # Main application entry point
└── main.jsx                # React DOM render script