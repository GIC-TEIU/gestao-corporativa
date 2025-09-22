import React from 'react';

const Button = ({ children, ...props }) => {
  return (
    <button
      className="px-10 py-2 rounded-2xl border-2 border-brand-cyan font-medium
                 text-white bg-brand-cyan hover:bg-brand-cyan hover:bg-opacity-90"
      {...props} // type="submit"
    >
      {children}
    </button>
  );
};

export default Button;