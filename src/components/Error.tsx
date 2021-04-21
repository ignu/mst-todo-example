import React from 'react';
import { ImSad } from 'react-icons/im';

const Error = () => {
  return (
    <div className="errorPage">
      <div>
        <h1>There was a problem.</h1>
      </div>
      <div>
        <ImSad size={190} />;
      </div>
    </div>
  );
};

export default Error;
