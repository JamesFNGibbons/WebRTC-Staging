document.addEventListener('DOMContentLoaded', async () => {

  const localClientId = 'RtcStagingDemo' + Math.floor((Math.random() * 100) + 1);
  alert('Your Local Client ID = ' + localClientId);

  // Load local video feed.
  const mainStream = await navigator.mediaDevices.getUserMedia({
    video: {
      framerate: 60
    },
    audio: true
  });

  document.getElementById('prev').srcObject = mainStream;

  // Register as a client on the server.
  const peer = new Peer(localClientId, {
    debug: true,
    
     config: {'iceServers': [
        {url:'stun:stun01.sipphone.com'},
        {url:'stun:stun.ekiga.net'},
        {url:'stun:stun.fwdnet.net'},
        {url:'stun:stun.ideasip.com'},
        {url:'stun:stun.iptel.org'},
        {url:'stun:stun.rixtelecom.se'},
        {url:'stun:stun.schlund.de'},
        {url:'stun:stun.l.google.com:19302'},
        {url:'stun:stun1.l.google.com:19302'},
        {url:'stun:stun2.l.google.com:19302'},
        {url:'stun:stun3.l.google.com:19302'},
        {url:'stun:stun4.l.google.com:19302'},
        {url:'stun:stunserver.org'},
        {url:'stun:stun.softjoys.com'},
        {url:'stun:stun.voiparound.com'},
        {url:'stun:stun.voipbuster.com'},
        {url:'stun:stun.voipstunt.com'},
        {url:'stun:stun.voxgratia.org'},
        {url:'stun:stun.xten.com'},
        {
        	url: 'turn:numb.viagenie.ca',
        	credential: 'muazkh',
        	username: 'webrtc@live.com'
        },
        {
        	url: 'turn:192.158.29.39:3478?transport=udp',
        	credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        	username: '28224511:1379330808'
        },
        {
        	url: 'turn:192.158.29.39:3478?transport=tcp',
        	credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        	username: '28224511:1379330808'
        }
    ]}
  });

  // Handle the connection establised event
  peer.on('open', () => {
    document.getElementById('header').innerHTML = "Connected to RTC Server";
  });

  // Handle the on call button click.
  document.getElementById('callBtn').onclick = function() {
    document.getElementById('callBtn').disabled = true; 

    const remoteId = window.prompt('Enter remote client ID');

    const call = peer.call(remoteId, mainStream);
    call.on('stream', (stream) => {
      document.getElementById('remote').srcObject = stream; 
    });
  }

  peer.on('call', (call) => {
    document.getElementById('callBtn').disabled = true;

    call.answer(mainStream);
    call.on('stream', (stream) => {
      document.getElementById('remote').srcObject = stream;
    });
  });

});