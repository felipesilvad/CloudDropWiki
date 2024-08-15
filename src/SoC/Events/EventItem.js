import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

function EventItem({event}) {
  // const img = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${char.role}.png?alt=media`

  if (event) {
    return (
      <div>
        <h1>{event.title}</h1>
        <div dangerouslySetInnerHTML={{__html: event.content}}></div>
      </div>
    );
  }
}

export default EventItem;