import React from 'react';

export default function Multer() {
  return (
    <>
      Multer
      <form action="/profile" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" />
      </form>
    </>
  );
}
