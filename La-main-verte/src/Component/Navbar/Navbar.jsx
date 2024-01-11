import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router';

const Navbar = () => {
  
  const logout = () => {localStorage.removeItem('name')
  navigate(`/`)}
  

    return(
        <header className="header">
        <section className="header__title">
          <div>
          <h1>oFig</h1>
          <div><h2>Figurines et statuettes</h2></div>
          </div>
          <nav className="header__nav">

            {localStorage.name?<div><Link to='/profil' className="header__nav__h2">Profil</Link>
            <Link className="header__nav__h2" onClick={logout}>deconnexion</Link>
            </div>:<div><Link to='/signin'className="header__nav__h2">Créer un compte </Link> 
            <Link to='/login' className="header__nav__h2">Connexion</Link> </div>}
            
           <div>
           <Link to='/' className="header__nav__h2">Catalogue</Link>
           <Link to='/panier' className="header__nav__h2">Panier</Link>
           </div>
           
          </nav>
        </section>
        <section className="header__subtitle">
          <h2>Figurines sur le thème <em>Final Fantasy</em></h2>
        </section>
       
      </header>
    )
}

export default Navbar