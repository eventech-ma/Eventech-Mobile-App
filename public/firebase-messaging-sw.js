// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );

// const firebaseConfig = {
//   apiKey: "AIzaSyBTwisT1F1xDlXBjjp2hVj_JnZCqIJd_iM",
//   authDomain: "massive-woods-396316.firebaseapp.com",
//   projectId: "massive-woods-396316",
//   storageBucket: "massive-woods-396316.appspot.com",
//   messagingSenderId: "24638185706",
//   appId: "1:24638185706:web:cf77b11efb28b9f7cfb793",
//   measurementId: "G-6T55ZNWRVG"
// };

// firebase.initializeApp(firebaseConfig);
// firebase.messaging().onBackgroundMessage(() => {
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,notificationOptions);
// });
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyBTwisT1F1xDlXBjjp2hVj_JnZCqIJd_iM",
  authDomain: "massive-woods-396316.firebaseapp.com",
  projectId: "massive-woods-396316",
  storageBucket: "massive-woods-396316.appspot.com",
  messagingSenderId: "24638185706",
  appId: "1:24638185706:web:cf77b11efb28b9f7cfb793",
  measurementId: "G-6T55ZNWRVG"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});