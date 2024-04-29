// src/HomePage.js
import React from 'react';


const HomePage = () => {
  return (
    <div style={{ textAlign: 'center' }}> {/* Center content */}
      <img src={`${process.env.PUBLIC_URL}/amongus.png`} alt="sus" style={{ maxWidth: '500px', height: 'auto' }} />
    </div>
  );
};

export default HomePage;
