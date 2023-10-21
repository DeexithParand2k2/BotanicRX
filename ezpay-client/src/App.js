import React, { useEffect, useState } from 'react'

/** 
 * @returns {JSX.Element} Homepage with register user and check match for exisiting user
 */
function App() {

  const [registered,setRegistered] = useState(false);

  useEffect(()=>{

    const reg = localStorage.getItem("userReg")
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
                    <button type="button">Check Match</button>
                    <p>Already Registered</p>
                </>
            ) : (
                <>
                    <button type="button" >Register User</button>
                    <button type="button">Check Match</button>
                </>
            )  
        }
    </div>
  )
}

export default App