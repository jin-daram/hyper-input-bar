const React = require('react');

module.exports = function InputBar({ value, onChange, onKeyDown, onFocus, inputRef }) {
  return React.createElement('div', {
    key: 'custom-input',
    style: {
      height: 45,
      backgroundColor: '#111',
      borderTop: '1px solid #333',
      flexShrink: 0,
    }
  }, React.createElement('input', {
    type: 'text',
    value,
    ref: inputRef,
    onChange,
    onKeyDown,
    onFocus,
    style: {
      width: '100%',
      height: '100%',
      padding: '10px',
      backgroundColor: '#000',
      color: '#0f0',
      border: 'none',
      outline: 'none',
      fontSize: '14px',
    }
  }));
};
