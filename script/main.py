import socketio
import os

sio = socketio.Client()

completed_folder = 'received_images'  # Specify the folder where completed images will be stored

if not os.path.exists(completed_folder):
    os.makedirs(completed_folder)

@sio.event
def connect():
    print('connection established')

@sio.on('image')
def receive_image(data):
    filename = data['filename']
    image_data = data['data']
    image_path = os.path.join(completed_folder, filename)
    
    # Write the received image data to a file in the completed folder
    with open(image_path, 'wb') as file:
        file.write(image_data)
    
    print(f'Image received and saved: {filename}')

@sio.event
def disconnect():
    print('disconnected from server')

sio.connect('http://localhost:5000')

sio.wait()
