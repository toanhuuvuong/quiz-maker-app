import axios from 'axios';
import Endpoint from './endpoints';

export const opendbAxios = axios.create({
  baseURL: Endpoint.OpenDBBaseUrl,
  timeout: 5000,
});
