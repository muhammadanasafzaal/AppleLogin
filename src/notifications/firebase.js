// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBVEGJHAy6tUT8GB2MyEG1m2bxIsiBrRH4",
  authDomain: "fir-social-logins-dddfd.firebaseapp.com",
  projectId: "fir-social-logins-dddfd",
  storageBucket: "fir-social-logins-dddfd.appspot.com",
  messagingSenderId: "567038227483",
  appId: "1:567038227483:web:555e7b4a9923815cdbf4be",
  measurementId: "G-L8RN8S583S"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app)

const generateFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission()
    console.log(permission)
    if (permission == 'granted') {
      //check if has old fcm token then use it
      let token = localStorage.getItem('fcmToken')
      if(token){
        console.log('existing token',token)
        return token
      } 
      
      //else get new fcm token
      token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
      })

      //fallback 
      if(!token){
        console.log('error getting FCM token')
        throw new Error()
      }

      localStorage.setItem('fcmToken', token)
      console.log('got new FCM token',token)
    }      
  } catch (error) {
    console.log(error)
    const token = generateRandomToken()
    localStorage.setItem('fcmToken', token)
  }
}

const generateRandomToken = (length = 64) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  
  let token = '';
  for (let i = 0; i < length; i++) {
      // Pick a random character from the chars string
      const randomIndex = Math.floor(Math.random() * chars.length);
      token += chars[randomIndex];
  }
  
  return token;
}


export { app as default, auth, generateFCMToken }