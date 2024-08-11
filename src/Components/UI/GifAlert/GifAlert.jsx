import React, { useState, useEffect } from 'react';

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
    <div style={alertStyles.overlay}>
      <div style={alertStyles.container}>
        <img src={gifUrl} alt="Alert GIF" style={alertStyles.gif} />
        <p style={alertStyles.message}>{message}</p>
      </div>
    </div>
  );
};

const alertStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 1000,
  },
  container: {
    width: '50%', 
    maxWidth: '500px',
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    textAlign: 'center',
  },
  gif: {
    width: '100%',
    maxHeight: '200px', 
    height: 'auto',
    marginBottom: '10px',
  },
  message: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default GifAlert;