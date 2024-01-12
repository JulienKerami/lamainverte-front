import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Signin.scss'
import { useNavigate } from 'react-router';


function Signin(props) {
    const [user, setUser] = useState([]);
    const [emailCheck, setEmailCheck] = useState(false)
    let navigate = useNavigate()
    const [error, setError] = useState("")

    useEffect(() => {
        return () => {

        }
    }, []);


     async function createUser(user) {
        try {
            console.log(user);
          const httpResponse = await axios.post(`http://localhost:3000/signin`, user);
          
          return httpResponse;
          
      
        } catch (error) {
          console.error(error);
          return error;
        }
      }
      


    const handleSubmit = async (e) => {
        let UserArray = {
          lastname: e.target[0].value,
          firstname: e.target[1].value,
          email: e.target[3].value,
          password: e.target[4].value}


//La regex permets d'utiliser une method nativ a nodeJS qui permets de verifier si certains caractères sont présent dans une chaîne de caractères.
   
     const EmailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g         
       
        if(EmailRegEx.test(e.target[3].value)=== false) {
            setEmailCheck(true)
        return}
        setEmailCheck(false)
        const user = await createUser(UserArray)

        if (user.request.status === 400) {
          alert(user.response.data)
          return 
        } 
          
          navigate('/')
          alert(`Bienvenue ${UserArray.firstname}`)
}

    

    return (
        <>
        <main className='Signin'>
          
          <form action="submit" onSubmit={(e)=> {e.preventDefault();
        handleSubmit(e)}}>
               
               <h3>Inscription</h3>
              <input type="text" placeholder='Nom' />
              <span style={{margin:"0",padding:"0"}}></span>
              <input type="text" placeholder='Prénom' />
            
              <input type="text" placeholder='Email' />
              <input type="password" placeholder='Mot de passe'/>
              <input type="password" placeholder='Confirmer mot de passe'/>
              <button>Sign in</button>
          </form>
          </main>
        </>
    )
}

export default Signin;