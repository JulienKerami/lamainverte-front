import axios from 'axios';

const url = 'http://localhost:3000/api'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {'Authorization': 'Bearer ' + localStorage.getItem('name')}

})

export async function fetchUser(userData) {
 


    
  try {
    console.log(localStorage.getItem('name'));
 const httpResponse = await axios.post(`${url}/login`, userData);
 
   return httpResponse;
   

} catch (error) {
 console.error(error);
 
 return error;
}
}


export async function createUser(user) {
    try {
        console.log(user);
      const httpResponse = await axios.post(`${url}/user`, user);
      
      return httpResponse;
      
  
    } catch (error) {
      
      return error;
    }
  }


  export async function createZone(userId, name) {
    try {
        let nameObj = {name: name}
      const httpResponse = await axios.post(`${url}/users/${userId}/zones`, nameObj, {
        'headers': {
          'Authorization': 'Bearer ' + localStorage.getItem('name')
        }});
      
      return httpResponse;
      
  
    } catch (error) {
      
      return error;
    }
  }


  export async function GetAllZones(userId) {

    try {
      const httpResponse = await axios.get(`${url}/users/${userId}/zones`, {
        'headers': {
          'Authorization': 'Bearer ' + localStorage.getItem('name')
        }});
      
      return httpResponse;
      
  
    } catch (error) {
      
      return error;
    }

    }



  export async function deleteOneZone(userId, zoneId) {

   try {
    const httpResponse = await instance.delete(`/users/${userId}/zones/${zoneId}`)
    return httpResponse
   }

   catch (error) 
   {return error;}
  }