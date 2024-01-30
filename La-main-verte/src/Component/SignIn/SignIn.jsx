import { useState, useEffect } from 'react';
// import axios from 'axios'
import './Signin.scss'
import { createUser } from '../Apicall/Apicall';
import { useNavigate } from 'react-router';


function Signin() {
  // const [user, setUser] = useState([]);
  // const [FormCheck, setFormCheck] = useState(true)
  let navigate = useNavigate()
  const [error, setError] = useState("aaa")
  const [EmailErrorText, setEmailErrorText] = useState("")
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [EmailError, setEmailError] = useState(false)
  const [Password1Error, setPassword1Error] = useState(false)
  const [Password2Error, setPassword2Error] = useState(false)

  useEffect(() => {
    return () => {
    }
  }, []);





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
      
    }

    
    let validation = true

  
    //La regex permets d'utiliser une method nativ à nodeJS qui permets de verifier si certains caractères sont présent dans une chaîne de caractères.
    // const EmailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      
    const EmailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const NameRegex = /^[-a-zA-Zzéèà\s]+$/
    
 
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

  
////////////////////// REGEX POUR LES MOT DE PASSE ///////////////////
  
    // if (e.target[3].value.length < 8) {
    //   console.log("doit contenir au moins 8 caractères");
    //   validation = false
    //   setError("doit contenir au moins 8 caractères")
    //   setPassword1Error(true)
    // }

    // if (!/(?=.\d)/.test(e.target[3].value)) {
    //   console.log("doit contenir au moins un chiffre");
    //   validation = false
    //   setError("doit contenir au moins un chiffre");
    //   setPassword1Error(true)
    // }

    // if (!/(?=.*[A-Z])/.test(e.target[3].value)) {
    //   console.log("doit contenir au moins une lettre majuscule")
    //   validation = false
    //   setError("doit contenir au moins une lettre majuscule")
    //   setPassword1Error(true)
    // }

    // if (!/(?=.[!@#$%^&*(),.?":{}|<>])/.test(e.target[3].value)) {
    //   console.log("doit contenir au moins un caractère spécial")
    //   validation = false
    //   setError("doit contenir au moins un caractère spécial")
    //   setPassword1Error(true)
    // }

    if (e.target[3].value.length < 8) {
      console.log("doit contenir au moins 8 caractères");
      setPassword1Error(true)
      setError("doit contenir au moins 8 caractères")
      validation = false
    }

    /////////////////////////////////////////////////

  
    if (NameRegex.test(e.target[1].value) === false) {
        console.log("false LastName")
       validation = false
       setLastNameError(true)
     }
  
     if (EmailRegEx.test(e.target[2].value) === false) {
      console.log("false Email")
      validation = false
      setEmailErrorText("veuillez rentrer un email valide")
      setEmailError(true)
      EmailErrorText
    }
 
     if (!(e.target[3].value === e.target[4].value) )
    {
      console.log("password not matching");
      setPassword1Error(true)
      setError('les mots de passe ne correspondent pas')
      validation = false
    }
 
    if (validation === true) { 
      console.log("subscribed!");
      
     const httpResponse = await createUser(UserArray)
     if(httpResponse.request.status === 200)
     {console.log("test");
      navigate('/')
      alert(`Bienvenue ${UserArray.firstname}, vous pouvez vous connecter à votre compte`)}

      else if(httpResponse.request.statusText !== "ok"){
        console.log(httpResponse);
        setEmailErrorText("cet email est déja utilisé par un utilisateur")
        e.target[3].value = ""
      e.target[4].value = ""
      setEmailError(true)}

  }
   

if (validation === false) {
      e.target[3].value = ""
      e.target[4].value = ""
    }
   
    
  }



  
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
          {EmailError?<span className='NameMessage' style={{ margin: "0", padding: "0" }}>{EmailErrorText}</span>:null}
          <input type="password" placeholder="Mot de passe" />
          {Password1Error?<span className='NameMessage' style={{ margin: "0", padding: "0" }}>{error}</span>:null}
          <input type="password" placeholder="Confimer mot de passe" />
          {Password2Error?<span className='NameMessage' style={{ margin: "0", padding: "0" }} >Votre mot de passe ne correspond pas</span>:null}
          <button>Sign in</button>
        </form>
      </main>
    </>
  )
}

export default Signin;