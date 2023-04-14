import React from 'react';

function HappyPage(props) {
  console.log(props)
  return (
    <div>
      <h2>Happy Page</h2>
      <p>Make your face look happy!</p>
      {props.isEmotionDetected && props.emotion === 'happy' && (
        <button onClick={props.onNextChallenge}>Next Challenge</button>
      )}
    </div>
  );
}

export default {HappyPage};
