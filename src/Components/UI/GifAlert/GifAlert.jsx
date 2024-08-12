import React, { useState, useEffect } from 'react';
import './GifAlert.css';

const GifAlert = ({ gifUrl, message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="gif-alert-overlay">
      <div className="gif-alert-container">
        <img src={gifUrl} alt="Alert GIF" className="gif-alert-gif" />
        <p className="gif-alert-message">{message}</p>
      </div>
    </div>
  );
};

export default GifAlert;
