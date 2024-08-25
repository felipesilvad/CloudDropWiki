import React from 'react';
import { Button, Container } from 'react-bootstrap';

function FooterComponent() {
  const img = require('./assets/img/character_zzzhuoqiantest.png')
  
  return (
    <footer className='footer d-flex justify-content-between align-items-center'>
      <Container className='d-flex justify-content-between align-items-center'>
        <img src={img} className='footer-img' />
        <a href='https://forms.gle/VJUss2tM1vMfhj5C6'target="_blank" rel="noopener"> 
          <Button className='footer-btn'>Submit Feedback</Button>
        </a>
      </Container>
    </footer>
  );
}

export default FooterComponent;