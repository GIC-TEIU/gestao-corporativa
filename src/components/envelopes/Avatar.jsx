import React from 'react';

const getInitials = (name) => {
  if (!name) return '?';
  const names = name.split(' ');
  const firstInitial = names[0][0] || '';
  const lastInitial = names.length > 1 ? names[names.length - 1][0] : '';
  return `${firstInitial}${lastInitial}`.toUpperCase();
};

const nameToColor = (name) => {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-600', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
};

const Avatar = ({ name }) => {
  const initials = getInitials(name);
  const bgColor = nameToColor(name);

  return (
    <div 
      title={name} 
      className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs ${bgColor}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;