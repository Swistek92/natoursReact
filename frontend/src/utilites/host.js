import React from 'react';

const host = () =>
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/v1/'
    : '/api/v1/';

export default host;
