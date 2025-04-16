import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Potentially add other pages here later (e.g., NotFound, ProjectDetail)

function App() {
  return (
    <Layout>
      <Routes>
        {/* Define the route for the Home page */}
        <Route path="/" element={<Home />} />
        {/* Add other routes here as needed */}
        {/* Example: <Route path="/about" element={<About />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;