import React from 'react';

function SourceItem({source}) {

  if (source) {
    return (
      <a href={source.url} target="_blank" rel="noopener" className="bg-lighter-link m-1">
        {source.title}
      </a>
    );
  }
}

export default SourceItem;