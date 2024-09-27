import React, {useState,useEffect} from 'react';
// import {firestore} from '../firebase';
// import { doc, onSnapshot, query, collection, where } from "firebase/firestore";
import {Dropdown,Modal,Button,Image} from 'react-bootstrap';
import SignOut from './SignOut';
// import ChatMessagePP from '../Chat/ChatMessagePP';
// import ChangePP from './ChangePP';
import { BiSolidGift } from "react-icons/bi";
import {IKImage} from 'imagekitio-react';

function AccountHeader({userData}) {

  // const [userData, setUserData] = useState()
  // useEffect(() => {
  //   onSnapshot(doc(firestore, "/users/", user.uid), (doc) => {
  //     setUserData(doc.data());
  //   });
  // }, [user]);

  const [profilePics, setProfilePics] = useState('')
  const [profilePicsUnlocked, setProfilePicsUnlocked] = useState('')

  const now = new Date().getTime()

  // useEffect (() => {
  //   onSnapshot(query(collection(firestore, `/profile-pics`), where("lv", "==", 2)), (snapshot) => {
  //     setProfilePics(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
  //   });
  // }, [])

  // useEffect (() => {
  //   if (profilePics && userData.unlockedProfilePics) {
  //     const profilePicsUnlocked = profilePics.filter((item) => (
  //       now >= (item.startDate.seconds*1000) && now <= (item.endDate.seconds*1000)
  //     )).filter((item) => (
  //       !userData.unlockedProfilePics.includes(item.id)
  //     ));
  
  //     setProfilePicsUnlocked(profilePicsUnlocked)
  //   }
  // }, [profilePics, userData])


  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Dropdown>
      <Dropdown.Toggle className='profile-dropdown m-2' id="dropdown-basic">
        {userData&&(
          // <ChatMessagePP id={userData.profilePic} header={true} />
          // <img className={`profile-img ${header&&("profile-img-header")}`} src={profilePic.url} />
          <IKImage
            urlEndpoint={'https://ik.imagekit.io/clouddrop/soc/'}
            path={`chars/${userData.profilePic}.png`}
            alt={`${userData.profilePic}`} key={`${userData.profilePic}`}
            transformation={[
              {
                height: 105,  // Height of the cropped area
                width: 105,   // Width of the cropped area
                cropMode: 'extract', // Extracts the area bas ed on width and height
                x: 68,        // X-coordinate from where the cropping starts
                y: 15,       // Y-coordinate from where the cropping starts
              },
            ]}
            width={"105"} height={"105"} 
            className={`profile-img`}
          />
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item> */}
        {/* <ChangePP userID={user.uid}/> */}
        {userData.profilePic}
        <SignOut />
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default AccountHeader;

