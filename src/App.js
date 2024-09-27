import React, {useState, useEffect} from 'react';
import './SoC/styles/main.scss';
import HeaderComponent from './SoC/Header';
import FooterComponent from './SoC/Footer';
import Router from './router';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import {auth} from './firebase';
// import {firestore} from './firebase';
// import {onSnapshot, doc} from 'firebase/firestore';

function App() {
  // const [user] = useAuthState(auth);

  // const [userData, setUserData] = useState()

  // useEffect(() => {
  //   if (user) {
  //     onSnapshot(doc(firestore, "/users/", user.uid), (doc) => {
  //       setUserData(doc.data());
  //     });
  //   }
  // }, [user]);

  return (
    <>
      <div className="App">
        <HeaderComponent 
          // userData={userData}
         />
        <Router />
      </div>
      <FooterComponent />
    </>
  );
}

export default App;
