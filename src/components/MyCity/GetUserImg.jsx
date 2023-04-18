import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function GetUserImg(profileImg) {
  const [imgUrl, setImgUrl] = useState('');
  useEffect(() => {
    async function getImgUrl() {
      if (profileImg && profileImg.includes('http')) {
        setImgUrl(profileImg);
      } else if (!profileImg) {
        setImgUrl('/images/default-profile.png');
      } else {
        try {
          const response = await axios.get(
            `http://localhost:4000/uploads/${profileImg.replace('/', '')}`,
          );
          setImgUrl(response.config.url);
        } catch (err) {
          console.error(err);
        }
      }
    }
    getImgUrl();
  }, [profileImg]);
  return imgUrl;
}
