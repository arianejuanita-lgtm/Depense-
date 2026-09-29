import axios from 'axios';

export  const ApiUrl = axios.create({
    baseURL:"https://api.jsonbin.io/v3/b/6abb74a5ffd5d160533ab187",
    timeout:1000,
    headers:{
        'Content-Type': 'application/json',
    }
});