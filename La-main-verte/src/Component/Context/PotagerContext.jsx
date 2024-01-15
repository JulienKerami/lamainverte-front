import { createContext, useState } from "react";


// on initialise la creation de notre context
export const PotagerContext = createContext('')


export const PotagerController = ({children}) => {

    const [vegetables,setVegetables] = useState([
    ])


    return(
        // On passe la value ici a tous nos enfants via children
        <PotagerContext.Provider value={[vegetables,setVegetables]}>
        {children}
        </PotagerContext.Provider>
    )

}
