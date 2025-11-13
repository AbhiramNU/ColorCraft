import React from 'react';
import FeedbackForm from './components/FeedbackForm';

function App() {
  // Example: pass imageId as 2
  return (
    <div>
      {/* other components or image display */}
      <FeedbackForm imageId={2} />
    </div>
  );
}

export default App;
