

importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker
const firebaseConfig = {
    apiKey: "AIzaSyBVEGJHAy6tUT8GB2MyEG1m2bxIsiBrRH4",
    authDomain: "fir-social-logins-dddfd.firebaseapp.com",
    projectId: "fir-social-logins-dddfd",
    storageBucket: "fir-social-logins-dddfd.appspot.com",
    messagingSenderId: "567038227483",
    appId: "1:567038227483:web:555e7b4a9923815cdbf4be",
    measurementId: "G-L8RN8S583S"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
