import React from 'react';

const ResponseModal = ({ isOpen, onClose, response, rating }) => {
  if (!isOpen) return null;

  const getRatingEmoji = (rating) => {
    const emojis = {
      1: '😞',
      2: '😕',
      3: '😐',
      4: '😊',
      5: '🤩'
    };
    return emojis[rating] || '😊';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon">
            <span className="emoji">{getRatingEmoji(rating)}</span>
          </div>
          <h2>Thank You for Your Feedback!</h2>
        </div>
        
        <div className="modal-body">
          <p className="response-text">{response}</p>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;