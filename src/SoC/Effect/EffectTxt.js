import React from 'react';

function EffectTxt({txt}) {

  // Function to wrap numbers and percentage sign in a span with a class
  const highlightNumbers = (txt) => {
    return txt.replace(/(\d+%?)/g, '<span class="highlight">$1</span>');
  };

  return (
    <div className='effect-txt'>
      <p dangerouslySetInnerHTML={{ __html: highlightNumbers(txt) }} />
    </div>
  );
}

export default EffectTxt;