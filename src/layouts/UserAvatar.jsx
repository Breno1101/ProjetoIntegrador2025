// components/UserAvatar.jsx
import React from 'react';

const UserAvatar = ({ avatar, name = 'Admin', className = 'h-8 w-8' }) => {
  const avatarUrl = avatar?.trim()
    ? avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

  return (
    <img
      src={avatarUrl}
      alt={`${name} avatar`}
      className={`${className} rounded-full`}
    />
  );
};

export default UserAvatar;
