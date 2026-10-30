import {httpRequest} from './http';
export const baseUrl=(import.meta.env.VITE_API_URL??'').replace(/\/$/,'');
export const request=<T>(path:string,options:RequestInit={})=>httpRequest<T>(baseUrl,path,options);
