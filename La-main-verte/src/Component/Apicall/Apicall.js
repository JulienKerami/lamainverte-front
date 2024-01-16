import axios from 'axios';

export async function fetchUser(userData) {
 
    
  try {
 const httpResponse = await axios.post(`http://localhost:3000/api/login`, userData);
 
   return httpResponse;
   

} catch (error) {
 console.error(error);
 
 return error;
}


}


export async function createUser(user) {
    try {
        console.log(user);
      const httpResponse = await axios.post(`http://localhost:3000/api/user`, user);
      
      return httpResponse;
      
  
    } catch (error) {
      
      return error;
    }
  }


  export async function createZone(userId) {
    try {
        console.log(userId);
      const httpResponse = await axios.get(`http://localhost:3000/api/${userId}/zones`, user);
      
      return httpResponse;
      
  
    } catch (error) {
      
      return error;
    }
  }
