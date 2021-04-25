import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.5:3333',
})

export default api;

/**
 * script pra usar json-serve
 * json-server ./plantmanager/src/services/server.json --host 192.168.1.5 --port 3333 --delay 700
 */