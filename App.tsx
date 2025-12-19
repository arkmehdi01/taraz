import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Directory from './pages/Directory';
import LawyerProfile from './pages/LawyerProfile';
import Academy from './pages/Academy';
import CourseDetail from './pages/CourseDetail';
import Corporate from './pages/Corporate';
import AIDemo from './pages/AIDemo';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/lawyer/:id" element={<LawyerProfile />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/ai-demo" element={<AIDemo />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;