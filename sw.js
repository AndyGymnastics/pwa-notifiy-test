// Varför: Vi lyssnar på "push"-eventet som skickas från molnet (Firebase).
self.addEventListener('push', function(event) {
    let data = { title: 'Nytt meddelande', body: 'Kolla appen!' };
    
    if (event.data) {
        data = event.data.json();
    }

    const options = {
        body: data.body,
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        data: {
            url: self.location.origin // Sparar URL för att kunna öppna appen vid klick
        }
    };

    // Varför: Här sätter vi den röda siffran på ikonen.
    if ('setAppBadge' in navigator) {
        navigator.setAppBadge(1).catch(err => console.error("Badge error:", err));
    }

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Varför: Gör så att användaren hamnar i appen när de klickar på notisen.
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
