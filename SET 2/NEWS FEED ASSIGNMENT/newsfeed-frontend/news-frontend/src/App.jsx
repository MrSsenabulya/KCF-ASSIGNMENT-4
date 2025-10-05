import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NewsFeed from './pages/NewsFeed';
import SinglePost from './pages/SinglePost';
import AppLayout from './components/AppLayout';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css'

function App() {
  return (
    <ErrorBoundary>
      <AppLayout>
        <Routes>
          {/* Redirect from root (/) to the news feed (/news) */}
          <Route path="/" element={<Navigate to="/news" replace />} />
          
          {/* 1. News Feed Page */}
          <Route path="/news" element={<NewsFeed />} />
          
          {/* 2. Single Post Page - supports both ID and slug */}
          <Route path="/news/:id" element={<SinglePost />} />
        </Routes>
      </AppLayout>
    </ErrorBoundary>
  );
}

export default App;
