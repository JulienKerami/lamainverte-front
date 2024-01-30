import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router';
import './Navbar.scss'

const Navbar = () => {
  
  let navigate = useNavigate()
  
  const logout = () => {localStorage.removeItem('name')
  navigate(`/`)
  window.location.reload();
  }

    return(

          <nav className="navbar">
            {localStorage.name?<>
            <Link to='/potager' className="navbar-link">Potager</Link>
            <Link to='/todo' className="navbar-link">Todo</Link>
            <Link className="navbar-link" onClick={()=> {logout()}}>Deconnexion</Link></>
            :<><Link to='/' className="navbar-link">Accueil</Link>
            <Link to='/signin'className="navbar-link">Créer un compte </Link> 
            <Link to='/login' className="navbar-link">Connexion</Link></>
            }
          </nav>
    )
}

export default Navbar