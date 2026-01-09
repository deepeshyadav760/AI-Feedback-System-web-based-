import React, { useState } from 'react';
import ReviewForm from './components/ReviewForm';
import ResponseModal from './components/ResponseModal';
import './styles/main.css';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [responseRating, setResponseRating] = useState(0);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message, type = 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  const handleSuccess = (response, rating) => {
    setAiResponse(response);
    setResponseRating(rating);
    setModalOpen(true);
  };

  const handleError = (error) => {
    showNotification(error, 'error');
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="app">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button 
            className="notification-close"
            onClick={() => setNotification({ show: false, message: '', type: '' })}
          >
            ×
          </button>
        </div>
      )}

      <div className="container">
        <header className="header">
          <div className="logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="url(#gradient)" />
              <path d="M20 10L25 18H15L20 10Z" fill="white" />
              <path d="M20 30L15 22H25L20 30Z" fill="white" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
            <h1>Fynd Feedback</h1>
          </div>
          <p className="tagline">Your opinion matters to us</p>
        </header>

        <main className="main-content">
          <div className="content-wrapper">
            <div className="intro-section">
              <h2>Share Your Experience</h2>
              <p>
                We value your feedback and use it to continuously improve our services.
                Please take a moment to share your thoughts.
              </p>
            </div>

            <div className="form-section">
              <ReviewForm 
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>© 2024 Fynd. All rights reserved.</p>
        </footer>
      </div>

      <ResponseModal 
        isOpen={modalOpen}
        onClose={closeModal}
        response={aiResponse}
        rating={responseRating}
      />
    </div>
  );
}

export default App;