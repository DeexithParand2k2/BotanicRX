import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

/** 
 * @returns {JSX.Element} Homepage with register user and check match for exisiting user
 */
function App() {

  const [registered,setRegistered] = useState(false);
  const navigate = useNavigate()

  var streamHanlder = () =>{
    navigate('/register')
  }

  var matchHanlder = () =>{
    navigate('/match')
  }

  var uploadHanlder = () =>{
    navigate('/upload')
  }

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
                    <button 
                        style={{padding:'10px'}} 
                        type="button" 
                        onClick={matchHanlder}
                    >
                        Check Match
                    </button>
                    <p>Already Registered</p>
                </>
            ) : (
                <>
                    <button 
                        style={{padding:'10px'}} 
                        type="button" 
                        onClick={streamHanlder}
                    >
                        Stream Video
                    </button>
                    <button 
                        style={{padding:'10px'}} 
                        type="button" 
                        onClick={matchHanlder}
                    >
                        Check Match
                    </button>
                    <button 
                        style={{padding:'10px'}} 
                        type="button" 
                        onClick={uploadHanlder}
                    >
                        Upload Recording
                    </button>
                </>
            )  
        }
    </div>
  )
}

export default App