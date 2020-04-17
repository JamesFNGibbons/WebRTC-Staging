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
  const peer = new Peer('clientA', {
    host: '',
    port: 9000,
    path: '/app',
    debug: true
  });

  // Handle the on call button click.
  document.getElementById('callBtn').onclick = function() {
    document.getElementById('callBtn').disabled = true; 

    const call = peer.call('clientB', mainStream);
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