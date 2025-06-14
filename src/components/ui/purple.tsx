import React from 'react';

export const PurpleCard: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <div className={`bg-[#f5f0e6] border border-[#a3c6be] shadow-lg p-6 ${className || ''}`}>
    {children}
  </div>
);

export const PurpleTitle: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <h2 className={`text-2xl font-bold text-[#53457f] mb-4 drop-shadow ${className || ''}`}>{children}</h2>
);

export const PurpleDivider: React.FC<{className?: string}> = ({ className }) => (
  <hr className={`my-4 border-[#a3c6be] ${className || ''}`} />
);

export const PurpleButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button
    className={`px-4 py-2 bg-[#53457f] text-[#f5f0e6] border border-[#a3c6be] font-semibold shadow hover:bg-[#a3c6be] hover:text-[#53457f] transition ${className || ''}`}
    {...props}
  />
);
