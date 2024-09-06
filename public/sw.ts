import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";

import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
// import { NavigationRoute, Route, registerRoute } from "workbox-routing";
// import { CacheFirst, NetworkFirst } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);
let allowlist;
if (import.meta.env.DEV) {
  allowlist = [/^\/$/];
}

// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const messaging = getMessaging();

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.skipWaiting();
clientsClaim();

// // cache images
// const imageRoute = new Route(
//   ({ request, sameOrigin }) => {
//     return sameOrigin && request.destination === "image";
//   },
//   new CacheFirst({
//     cacheName: "images",
//   })
// );
// registerRoute(imageRoute);

// // cache api calls

// // cache navigations
// const navigationRoute = new NavigationRoute(
//   new NetworkFirst({
//     cacheName: "navigation",
//     networkTimeoutSeconds: 3,
//   })
// );
// registerRoute(navigationRoute);

// // Receive push notifications
// self.addEventListener("push", function (e) {
//   if (e.data) {
//     const message = e.data.json();
//     e.waitUntil(
//       self.registration.showNotification(message.title, {
//         body: message.body,
//         icon: message.icon,
//       })
//     );
//   }
// });

// // Click and open notification
// self.addEventListener(
//   "notificationclick",
//   function (event) {
//     event.notification.close();

//     self.clients.openWindow("/farm");
//   },
//   false
// );
