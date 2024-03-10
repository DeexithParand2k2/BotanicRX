const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const pako = require('pako')

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;
const IMAGE_FOLDER = path.join(__dirname, `images-${Date.now()}`); 

// Create the images folder if it doesn't exist
if (!fs.existsSync(IMAGE_FOLDER)) {
  fs.mkdirSync(IMAGE_FOLDER);
}

// Enable CORS
app.use(cors());

io.on('connection', (socket) => {
  
  // Set up event listener for receiving frames
  socket.on('frame', ({ frame, SenderIndex }) => {

    console.log(`Received frame from sender ${SenderIndex}`);

    console.log('.......1',frame)

    const decompressedFrameData = pako.inflate(frame, { to: 'string' });

    // Convert base64 image to binary data
    const imageData = decompressedFrameData.replace(/^data:image\/png;base64,/, '');
    const imageBuffer = Buffer.from(imageData, 'base64');

    // Generate unique filename
    const filename = `frame_${Date.now()}.jpg`;
    const filePath = path.join(IMAGE_FOLDER, filename);

    // Save image to the images folder
    fs.writeFile(filePath, imageBuffer, 'binary', (err) => {
      if (err) {
        console.error('Error saving image:', err);
      } else {
        console.log('Image saved successfully:', filename);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}`);
});
