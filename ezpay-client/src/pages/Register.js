import React, { useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam"

/**
 * 
 * @returns {JSX.Element} - Returns JSX element
 */


var framesLimit=5, timeGap=1;

function Register() {

  const [captured,setCaptured] = useState(false) // check if all frames are captured

  const [camOpen,setCamOpen] = useState(false) // open and close cam

  const [frames,setFrames] = useState([]) // store frames in state
  const [capturing,setCapturing] = useState(false) // start capture & end capture

  const webcamRef = useRef(null)

  //start capture
  // function startCapture(){
  //   setCapturing(true)

  //   const interval = setInterval(()=>{

  //     if(frames.length>framesLimit){
  //       clearInterval(interval)
  //       setCapturing(false)
  //       setCaptured(true)
  //     }

  //     if(webcamRef.current){
  //       var currFrame = webcamRef.current.getScreenshot()
  //       setFrames((frames)=>([...frames,currFrame]))
  //     }

  //   },timeGap*1000)

  // }

  function startCapture() {

    setCamOpen(true)

    setCapturing(true);
  
    const interval = setInterval(() => {
      if (webcamRef.current) {
        var currFrame = webcamRef.current.getScreenshot();
  
        setFrames((frames) => {
          const updatedFrames = [...frames, currFrame];
          if (updatedFrames.length >= framesLimit) {
            clearInterval(interval);
            setCapturing(false);
            setCaptured(true);
            setCamOpen(false)
          }
          return updatedFrames;
        });
      }
    }, timeGap * 1000);
  }

  
  //on unmounting - remove session storage
  useEffect(()=>{
  
    return() => {
      if(captured){
        sessionStorage.clear()
      }
    }
  })

  return (
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      gap:'20px',
      flexDirection: 'column',
      margin:'20px',
    }}>
        <div style={{display:'flex',flexDirection:'row'}}>
          <p>Register&nbsp;</p>
          <input type="text" placeholder='username'/>
        </div>

        <div>
          {
            !capturing ? <p>Yet to capture</p> : <p>Capturing... Frame {frames.length}</p>
          }
          {
            camOpen ? (
              <div>
                <Webcam ref={webcamRef} style={{border:'2px solid lightgreen'}} height={600} width={600} />
              </div>
            ) : (
              <div style={{
                backgroundColor:'grey',
                height:'500px',
                width:'700px',
                marginBottom: '40px',
                marginTop:'40px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
              }}>
                <p>Camera Closed</p>
              </div>
            )
          }
        </div>

        <div style={{display:'flex',gap:'20px',flexDirection:'row'}}>
          <button style={{padding:'10px'}} type="button" onClick={()=>{
            if(camOpen){
              setCamOpen(false)
            } else {
              setCamOpen(true)
            }
          }}>OPEN/CLOSE CAM</button>
          <button style={{
            padding:'10px'
          }} 
            type="button"
            onClick={startCapture}
          >
            Capture and Register
          </button>
        </div>

        <div>
          <h3 style={{textAlign:'center'}}>
            Captured Frames : 
            {
              capturing && !captured && <p>Ongoing</p>
            }
            {
              captured && <p>Completed</p>
            }
          </h3>
          <div style={{
            width:'1000px',
            gap:'5px',
            color:'white',
            display:'flex',
            flexDirection:'row',
            flexWrap: 'wrap',
          }}>
            {
              frames && frames.length>0 && 
              frames.map((frame,index)=>(
                <img
                  key={index}
                  src={frame}
                  alt={`Frame ${index}`}
                  height={120}
                  width={160}
                >
                </img>
              ))
            }
          </div>
        </div>
        
    </div>
  )
}

export default Register