import React from 'react';
import { trio } from 'ldrs'

function LoadingScreen() {
  trio.register()

  return (
    <div className='loading-screen'>
      <l-trio
        size="55"
        stroke="3"
        speed="1" 
        color="white" 
      ></l-trio>
    </div>
  )
}
export default LoadingScreen;
