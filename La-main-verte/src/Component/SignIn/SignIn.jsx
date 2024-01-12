import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Signin.scss'
import { useNavigate } from 'react-router';


function Signin(props) {
  const [user, setUser] = useState([]);
  const [FormCheck, setFormCheck] = useState(true)
  let navigate = useNavigate()
  const [error, setError] = useState("")
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [EmailError, setEmailError] = useState(false)
  const [Password1Error, setPassword1Error] = useState(false)
  const [Password2Error, setPassword2Error] = useState(false)

  useEffect(() => {
    return () => {
    }
  }, []);


  //  async function createUser(user) {
  //     try {
  //         console.log(user);
  //       const httpResponse = await axios.post(`http://localhost:3000/signin`, user);
  //       return httpResponse;

  //     } catch (error) {
  //       console.error(error);
  //       return error;
  //     }
  //   }



  const handleSubmit = async (e) => {

    setFirstNameError(false)
          setLastNameError(false)
          setEmailError(false)
          setPassword1Error(false)
          setPassword2Error(false)

    let UserArray = {
      lastname: e.target[0].value,
      firstname: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value,
      password2: e.target[4].value
    }

    let validation = true

   
    //La regex permets d'utiliser une method nativ à nodeJS qui permets de verifier si certains caractères sont présent dans une chaîne de caractères.

    //////////////////////////////////////////            REGEX   ///////////////////////////////////////////////

    const EmailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    const NameRegex = /^[A-Z][-a-zA-Z]+$/

    const PasswordRegEx = /^(?=.[A-Z])(?=.\d).{8,}$/;




    // const PasswordRegEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
      


 

    if (NameRegex.test(e.target[0].value) === false) {
      console.log("false firstName")
      validation = false
      setFirstNameError(true)
    }
   
  
     if (NameRegex.test(e.target[1].value) === false) {
        console.log("false LastName")
       validation = false
       setLastNameError(true)
      }
  
    
    
     if (EmailRegEx.test(e.target[2].value) === false) {
      setEmailError(true)
      console.log("false Email")
      validation = false
     
    }

     if (PasswordRegEx.test(e.target[3].value) === false)
    {
      console.log("password not strong enough");
      validation = false
    }


     if (!(e.target[3].value === e.target[4].value) )
    {
      console.log("password not matching");
      validation = false
    }
 
  

    if (validation === true) { 
      console.log("subscribed!");
      
      const user = await createUser(UserArray)
  }
   

    // if (user.request.status === 400) {
    //   alert(user.response.data)
    //   return
    // }
    // navigate('/')
    // alert(`Bienvenue ${UserArray.firstname}`)
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <main className='Signin'>

        <form action="submit" onSubmit={(e) => {
          
          e.preventDefault();
          handleSubmit(e)
        }}>

          <h3>Inscription</h3>
          <input type="text" placeholder='Nom' />
          {firstNameError?<span className='NameMessage' style={{ margin: "0", padding: "0" }}>Veuillez rentrer un nom valide</span>:null}
          <input type="text" placeholder='Prénom' />
          {lastNameError?<span className='NameMessage' style={{ margin: "0", padding: "0" }}>Veuillez rentrer un prénom valide</span>:null}
          <input type="text" placeholder='Email' />
          {EmailError?<span className='NameMessage' style={{ margin: "0", padding: "0" }}>Veuillez rentrer un email valide</span>:null}
          <input type="password" placeholder='Mot de passe' />
          {Password1Error?<span className='NameMessage' style={{ margin: "0", padding: "0" }}>Votre mot de passe n'est pas assez robuste</span>:null}
          <input type="password" placeholder='Confirmer mot de passe' />
          {Password2Error?<span className='NameMessage' style={{ margin: "0", padding: "0" }}>Votre mot de passe ne correspond pas</span>:null}
          <button>Sign in</button>
        </form>
      </main>
    </>
  )
}

export default Signin;

