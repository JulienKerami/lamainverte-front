import axios from 'axios';

const url = 'https://la-main-verte-back-end.onrender.com/api'



const instance = axios.create({
  baseURL: 'https://la-main-verte-back-end.onrender.com/api',
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

    console.log(localStorage.getItem('name'));
    try {
        let nameObj = {name: name, userId: userId}
        console.log(nameObj);
      const httpResponse = await axios.post(`${url}/zones`, nameObj, {
        'headers': {
          'Authorization': 'Bearer ' + localStorage.getItem('name')
        }});
      
      return httpResponse;
      
  
    } catch (error) {
      
      return error;
    }
}


export async function GetAllZones(userId) {

  let token = localStorage.getItem('name')
  console.log(userId);

try {
  const httpResponse = await instance.get('/vegetables')
  console.log(httpResponse);
  return httpResponse
  
}

catch(error) {
  return error
}



}


export async function deleteOneZone(userId, zoneId) {

   try {
    const httpResponse = await instance.delete(`/zones/${zoneId}`)
    return httpResponse
   }

   catch (error) 
   {return error;}
}


export async function modifyOneZone(zoneId, name) {
  console.log(zoneId, name);
    try{ 
      const httpResponse = await instance.patch(`/zones/${zoneId}`, {name: name})
      return httpResponse
    }

    catch (error) {
      return error
    }
}


export async function getFamily () {
  try {
    const httpResponse = await instance.get("/families")
    return httpResponse

  }

  catch(error) {
    return error
  }
}

export async function createVegetable (vegeObj){

  let newVegeObj = {}
  console.log(vegeObj);
  if(vegeObj.start_date_period_seeding === 1)
  { newVegeObj = {...vegeObj, start_date_period_seeding: null, end_date_period_seeding: null}}
  else { newVegeObj = vegeObj}

  
  try {const httpResponse = await instance.post("/vegetables", newVegeObj)
return httpResponse
}

catch(error) 
{return error}
}

export async function deleteVegetable (vegeId) {
  console.log(vegeId);
try { const httpResponse = await instance.delete(`/vegetables/${vegeId}`)
return httpResponse
}

catch (error) {
  return error
}
}

export async function getTasks() {
  try { const Httpresponse = await instance.get('/tasks')
return Httpresponse}

  catch(err)
  {return err}
}

export async function updateTask(id, obj) {

  console.log(id, obj);
  try { const Httpresponse = await instance.get(`/tasks/${id}`, obj)
  return Httpresponse}
  
    catch(err)
    {return err}

}