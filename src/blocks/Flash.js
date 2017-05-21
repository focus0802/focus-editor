import React from 'react';

const Flash = (props) => {
  return (
    <embed src={props.src} type="application/x-shockwave-flash" />
  );
};
export default Flash;
