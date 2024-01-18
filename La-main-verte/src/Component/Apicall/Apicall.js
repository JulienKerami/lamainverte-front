import axios from 'axios';

const url = 'https://la-main-verte-back-end.onrender.com/api'

// url du back en ligne : https://la-main-verte-back-end.onrender.com/api



const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {'Authorization': 'Bearer ' + localStorage.getItem('name')}

})

export async function fetchUser(userData) {

  try {
    console.log(localStorage.getItem('name'));
 const httpResponse = await axios.post(`${url}/login`, userData);
    console.log(httpResponse);
   return httpResponse;
   

} catch (error) {
 console.error(error);
 
 return error;
}
}


export async function createUser(user) {
    try {
        console.log(user);
      const httpResponse = await axios.post(`${url}/signin`, user);
      
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


export async function modifyOneZone(userId, zoneId, name) {
    try{ 
      const httpResponse = await instance.patch(`/users/${userId}/zones/${zoneId}`, {name: name})
      return httpResponse
    }

    catch (error) {
      return error
    }
  }