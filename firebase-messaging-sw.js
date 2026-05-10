// Varför: Detta är en standardfil som Firebase letar efter för att hantera push i bakgrunden.
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "DIN_API_KEY",
  projectId: "DITT_PROJEKT",
  messagingSenderId: "DITT_ID",
  appId: "DITT_APP_ID"
});

const messaging = firebase.messaging();

// Varför: Detta körs när en push tas emot medan appen INTE är öppen.
messaging.onBackgroundMessage((payload) => {
  console.log('Bakgrundsmeddelande tas emot:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icon-192.png'
  };

  // Sätt badge (den röda siffran)
  if ('setAppBadge' in navigator) {
    navigator.setAppBadge(1);
  }

  self.registration.showNotification(notificationTitle, notificationOptions);
});
