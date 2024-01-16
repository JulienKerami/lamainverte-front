import React from 'react';

const Logout = () => {
    console.log('Déconnexion');
    navigate('/')
};

return (
    <div>
      <p>Vous êtes déconnecté.</p>
      <Link to="/">Accueil</Link>
    </div>
);
