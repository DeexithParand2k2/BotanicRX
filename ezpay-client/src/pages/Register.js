import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam"

/**
 * 
 * @returns {JSX.Element} - Returns JSX element
 */
function Register() {

  const [captured,setCaptured] = useState(false)
  const [camOpen,setCamOpen] = useState(false)
  const [frames,setFrames] = useState([])

  //on unmounting - remove session storage
  useEffect(()=>{
  
    return() => {
      if(!captured){
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
      margin:'20px'
    }}>
        <div style={{display:'flex',flexDirection:'row'}}>
          <p>Register&nbsp;</p>
          <input type="text" placeholder='username'/>
        </div>

        <div>
          {
            camOpen ? (
              <Webcam height={600} width={600} />
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
          <button style={{padding:'10px'}} type="button">Capture and Register</button>
        </div>
        
    </div>
  )
}

export default Register