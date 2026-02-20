
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Use HTMLMotionProps to resolve conflicts between React's standard HTML attributes and Framer Motion's props (notably onDrag).
interface InputProps extends HTMLMotionProps<'input'> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>}
      <motion.input
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`bg-slate-800/40 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 backdrop-blur-sm transition-all shadow-inner ${className}`}
        {...props}
      />
    </div>
  );
};
