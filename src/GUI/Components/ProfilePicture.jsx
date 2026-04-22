import defaultAvatar from '../../assets/images/User.png';
import { useState } from 'react';

export default function ProfilePicture({ src }) {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc(defaultAvatar);
  };

  return (
    <img
      className="profile-picture"
      src={imageSrc || defaultAvatar}
      alt={'player avatar'}
      onError={handleError}
    />
  );
}
