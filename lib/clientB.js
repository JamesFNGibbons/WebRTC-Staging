document.addEventListener('DOMContentLoaded', async () => {

  // Load local video feed.
  const mainStream = await navigator.mediaDevices.getUserMedia({
    video: {
      framerate: 60
    },
    audio: true
  });

  document.getElementById('prev').srcObject = mainStream;

  // Register as a client on the server.
  const peer = new Peer('clientB', {
    host: '192.168.0.26',
    port: 9000,
    path: '/app',
    debug: true
  });

  // Handle the on call button click.
  document.getElementById('callBtn').onclick = function() {
    document.getElementById('callBtn').disabled = true; 

    const call = peer.call('clientA', mainStream);
    call.on('stream', (remoteStream) => {
      document.getElementById('remote').srcObject = remoteStream;
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