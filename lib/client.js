window.addEventListener('DOMContentLoaded', () => {

  const peer = new Peer('rec', {
    host: '192.168.0.26',
    port: 9000,
    path: '/app',
    debug: true
  });

  peer.on('call', (call) => {
    console.log('call here pen ting');

    call.answer();
    call.on('stream', (remoteStream) => {
      console.log('call here pen ting');

      document.getElementById('video').srcObject = remoteStream;
    })
  });

  document.getElementById('call').onclick = function() {
    const connection = peer.connect('sender');

    connection.on('open', () => {
      console.log('remote opened.');
      connection.send('makeCall');
    })
  };
  
});