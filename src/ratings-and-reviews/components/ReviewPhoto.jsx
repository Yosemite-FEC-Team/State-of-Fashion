import React, {useState} from 'react';

const ReviewPhoto = ({photo}) => {
  return (
   <img className = "reviewPhoto" src={photo.url} alt="User provided photo"></img>
  );
}

export default ReviewPhoto;