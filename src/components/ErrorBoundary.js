import React from 'react';

const ErrorBoundary = () =>
  (<div className="NotFound">
    <h3>Connection Refused</h3>
    <p>We are sorry but we encountered a server error.</p>
    <a className="btn btn-primary" href="/">Try again</a>
   </div>
  );

export default ErrorBoundary;
