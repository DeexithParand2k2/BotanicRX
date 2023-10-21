import React, { useEffect, useState, useNavigate } from 'react'

/** 
 * @returns {JSX.Element} Homepage with register user and check match for exisiting user
 */
function App() {

  const [registered,setRegistered] = useState(false);

  useEffect(()=>{

    const reg = sessionStorage.getItem("user")
    if(reg){
        setRegistered(true)
    }

  },[])

  return (
    <div style={
        {
            position:'fixed',
            top:'50%',
            left:'50%',
            display:'flex',
            flexDirection:'column',
            gap:'10px'
        }
    }>
        {
            registered ? (
                <>
                    <button style={{padding:'10px'}} type="button">Check Match</button>
                    <p>Already Registered</p>
                </>
            ) : (
                <>
                    <button style={{padding:'10px'}} type="button">Register User</button>
                    <button style={{padding:'10px'}} type="button">Check Match</button>
                </>
            )  
        }
    </div>
  )
}

export default App