const CACHE='piano-tabs-v5';
const CORE=['./','./index.html','./manifest.webmanifest','./apple-touch-icon.png','./icon-192.png','./icon-512.png',
  './samples/A1.mp3','./samples/C2.mp3','./samples/Ds2.mp3','./samples/Fs2.mp3','./samples/A2.mp3','./samples/C3.mp3','./samples/Ds3.mp3','./samples/Fs3.mp3','./samples/A3.mp3','./samples/C4.mp3','./samples/Ds4.mp3','./samples/Fs4.mp3','./samples/A4.mp3','./samples/C5.mp3','./samples/Ds5.mp3','./samples/Fs5.mp3','./samples/A5.mp3','./samples/C6.mp3','./samples/Ds6.mp3','./samples/Fs6.mp3','./samples/A6.mp3','./samples/C7.mp3','./samples/Ds7.mp3','./samples/Fs7.mp3','./samples/A7.mp3','./samples/C8.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(res=>{ if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));} return res; }).catch(()=>hit);
    return hit||net;
  }));
});
