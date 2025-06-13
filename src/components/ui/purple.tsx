import React from 'react';

export const PurpleCard: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <div className={`rounded-xl bg-gradient-to-br from-purple-700/80 to-purple-900/90 shadow-lg p-6 border border-purple-400/30 ${className || ''}`}>
    {children}
  </div>
);

export const PurpleTitle: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <h2 className={`text-2xl font-bold text-purple-300 mb-4 drop-shadow ${className || ''}`}>{children}</h2>
);

export const PurpleDivider: React.FC<{className?: string}> = ({ className }) => (
  <hr className={`my-4 border-purple-600/40 ${className || ''}`} />
);

export const PurpleButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold shadow hover:from-purple-700 hover:to-purple-900 transition ${className || ''}`}
    {...props}
  />
);
