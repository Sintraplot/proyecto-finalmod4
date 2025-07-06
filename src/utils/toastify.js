import Toastify from "toastify-js"; 
import "toastify-js/src/toastify.css";

export const showToast = (message, type = 'info') => {
    
  let backgroundColor;
  let duration = 3000;

  switch (type) {
    case 'success':
      backgroundColor = 'linear-gradient(to right, #00b09b, #96c93d)';
      break;
    case 'error':
      backgroundColor = 'linear-gradient(to right,rgb(215, 21, 37),rgb(180, 6, 6))';
      break;
    case 'warning':
      backgroundColor = 'linear-gradient(to right,rgb(255, 114, 59),rgb(231, 128, 32))';
      break;
    default:
      backgroundColor = 'linear-gradient(to right, #00b7d4, #2196F3)';
  }

  Toastify({
    text: message,
    duration: duration,
    close: true,
    gravity: 'top', // 'top' or 'bottom'
    position: 'right', // 'left', 'center' or 'right'
    stopOnFocus: true,
    style: {
      background: backgroundColor,
      borderRadius: '8px',
      boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
      fontFamily: 'Arial, sans-serif',
    },

    

  }).showToast();
};

// Specific toast functions for different scenarios
export const showSuccessToast = (message) => {
  showToast(message, 'success');
};

export const showErrorToast = (message) => {
  showToast(message, 'error');
};

export const showWarningToast = (message) => {
  showToast(message, 'warning');
};