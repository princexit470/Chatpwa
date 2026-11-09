// --- XIT FIXES ---

// 1. Permissions Forcefully Maangna
async function requestAllPermissions() {
    try {
        if ("Notification" in window && Notification.permission !== "granted") {
            await Notification.requestPermission();
        }
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            stream.getTracks().forEach(track => track.stop());
        }
    } catch (e) {
        console.log("Permission denied:", e);
    }
}

// 2. App Open hote hi (ya pehli click par) permission maango
document.body.addEventListener('click', function() {
    requestAllPermissions();
}, { once: true });

// 3. Back Button ka Fix (App band hone se bachaye)
window.addEventListener('popstate', function(event) {
    // Agar koi chat open hai, call screen hai, ya modal open hai, toh app close mat hone do
    if (document.getElementById('chat-window').classList.contains('open') || 
        document.getElementById('call-screen').style.display === 'flex' ||
        document.getElementById('status-viewer').style.display === 'flex') {
        // Puraana history state wapas push kar do taaki app band na ho
        history.pushState({page: 'app'}, ""); 
    }
});

// History state ko initialise karo taaki back button kaam kare
history.pushState({page: 'app'}, "");
