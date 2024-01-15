import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router';
import './Navbar.scss'

const Navbar = () => {
  
  const logout = () => {localStorage.removeItem('name')
  navigate(`/`)}
  

    return(
        <header className="header">
        <section className="header__title">
          
          <nav className="header__nav">

            <Link to='/' className="header__nav__h2">Accueil</Link>
            <Link to='/signin'className="header__nav__h2">Créer un compte </Link> 
            <Link to='/login' className="header__nav__h2">Connexion</Link>
            
          </nav>
        </section>
       
      </header>
    )
}

export default Navbar