import axios from 'axios';

export async function fetchUser(userData) {
    console.log(userData);
    // const user = {email: e.target[0].value, password: e.target[1].value}
  
//   try {
//  const httpResponse = await axios.post(`http://localhost:3000/log`, user);
   
//    return httpResponse;

// } catch (error) {
//  console.error(error);
 
//  return error;
// }
}


export async function createUser(user) {
    try {
        console.log(user);
      const httpResponse = await axios.post(`http://localhost:3000/signin`, user);
      
      return httpResponse;
      
  
    } catch (error) {
      console.error(error);
      return error;
    }
  }