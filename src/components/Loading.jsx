import React from 'react';
import { Oval } from 'react-loader-spinner';
import '../style/loading.scss';

export default function Loading() {
  return (
    <div className="loading">
      <Oval
        height={80}
        width={80}
        color="#605cff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#888"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}
