import React, { useState, useRef, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import pako from 'pako'; // Importing pako for gzip compression

const ENDPOINT = 'http://localhost:5000'; // Change this to your server's endpoint

function App() {
  const [video, setVideo] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [senderIndex, setSenderIndex] = useState(null); 
  const [progress, setProgress] = useState(0);
  const [capturedFrames, setCapturedFrames] = useState([]);
  const videoRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideo(URL.createObjectURL(file));
  };

  useEffect(()=>{
    const socket = socketIOClient(ENDPOINT);
    socket.emit('setSocketClientName', 'Deexith');
  },[])

  function uniqueIdGenerate() {
    const uniqueId = uuidv4();
    return uniqueId;
  }

  useEffect(() => {
    if (!streaming) {
      const uid = uniqueIdGenerate();
      setSenderIndex(uid);
    }
  }, [streaming]);

  const startStreaming = () => {
    
    setCapturedFrames([])

    if (videoRef.current) {
      setStreaming(true);
      const socket = socketIOClient(ENDPOINT);

      let currentTime = 0;
      const duration = videoRef.current.duration;
      const interval = setInterval(() => {
        if (currentTime < duration) {
          currentTime += 3;
          setProgress((currentTime / duration) * 100);

          videoRef.current.currentTime = currentTime;

          // Capture the current frame
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const frameData = canvas.toDataURL('image/jpg');

          // Compress the frame data using gzip
          const compressedFrameData = pako.gzip(frameData);

          setCapturedFrames(prevFrames => [...prevFrames, frameData]);

          console.log('emit emit ..')

          // Send the frame to the server
          socket.emit('frame', {
            frame: compressedFrameData,
            SenderIndex: senderIndex
          });

        } else {
          clearInterval(interval);
          setStreaming(false);
          console.log('transmitted frame count size : ',capturedFrames.length)
          socket.disconnect();
        }
      }, 1000); // Stream every 1 second
      
    }
  };

  return (
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
      minHeight:'100vh',
      margin:'20px'
    }}>
      <input type="file" onChange={handleFileChange} />
      <br />
      <video ref={videoRef} controls src={video} style={{ width: '50%', margin: '20px' }} />
      <br />
      {video && !streaming && (
        <button onClick={startStreaming}>Stream</button>
      )}
      <br />
      {streaming && (
        <progress value={progress} max="100" style={{ width: '50%' }} />
      )}

      <div>
        {capturedFrames.map((frame, index) => (
          <img key={index} src={frame} alt={`Frame ${index}`} style={{ width: '200px', height: 'auto' }} />
        ))}
      </div>
    </div>
  );
}

export default App;
