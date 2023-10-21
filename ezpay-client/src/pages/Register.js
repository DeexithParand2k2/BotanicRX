import React, { useEffect, useState } from 'react'



/**
 * 
 * @returns {JSX.Element} - Returns JSX element
 */
function Register() {

  const [captured,setCaptured] = useState(false)

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
      alignContent:'center'
    }}>
        <h1>register user : </h1>
        <input type="text" placeholder='username'/>

        

        <button style={{padding:'10px'}} type="button">Capture and Register</button>
    </div>
  )
}

export default Register