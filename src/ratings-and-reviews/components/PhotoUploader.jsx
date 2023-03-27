import React, { useState } from 'react';

function PhotoUploader() {
  const [photos, setPhotos] = useState([]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setPhotos([...photos, event.target.result]);
    }

    reader.readAsDataURL(file);
  }

  const handleAddPhotoClick = () => {
    document.getElementById('file-input').click();
  }

  return (
    <>
      <h5>Upload Your Photos</h5>
      <div>
        {photos.map((photo) => (
          <img src={photo} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
        ))}
        {photos.length < 5 && (
          <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden' }}>
            <button style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }} onClick={handleAddPhotoClick}>
              Click to Add
            </button>
            <input type="file" id="file-input" accept="image/*" style={{ position: 'absolute', top: '0', left: '0', opacity: '0' }} onChange={handleFileInputChange} />
          </div>
        )}
      </div>
    </>
  );
}

export default PhotoUploader;