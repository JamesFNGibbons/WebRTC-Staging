window.addEventListener('DOMContentLoaded', async () => {

  const peer = new Peer('sender', {
    host: 'localhost',
    port: 9000,
    path: '/app',
    debug: true
  })



  // navigator.mediaDevices.getUserMedia({video: true, audio: false}, (stream) => {
  //   console.log('stream = ' + stream);
  //   peer.call('client', stream);
  
  // }, (error) => {
  //   throw error;
  // })

  peer.on('connection', async (connection) => {
    console.log('peer open');

    connection.on('data', async (data) => {
      console.log('data  = ' + data);

      if(data == 'makeCall') {
        console.log('making call now.');

        try {
          let stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
          console.log('s = ' + stream);

          peer.call('rec', stream);
          
        } catch(err) {
          throw err;
        }
      }

    })
  })

  peer.on('rec', (message) => {
    console.log('here');
  
  });

  // peer.on('call', (call) => {
  //   console.log('here');
  //   navigator.getUserMedia({video: true}, (stream) => {
  //     call.answer(stream);
  //   })
  // });

}, false);