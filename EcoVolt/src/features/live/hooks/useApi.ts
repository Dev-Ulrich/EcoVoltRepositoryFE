import { useEffect, useState } from 'react';
import { request } from '../services/api';
export function useApi<T>(path:string) {
 const [data,setData]=useState<T|null>(null), [loading,setLoading]=useState(true), [error,setError]=useState(''), [version,setVersion]=useState(0);
 useEffect(()=>{const controller=new AbortController(); setLoading(true);setError('');setData(null);
 request<T>(path,{signal:controller.signal}).then(result=>{if(!controller.signal.aborted)setData(result)}).catch(e=>{if(!controller.signal.aborted)setError(e.message)}).finally(()=>{if(!controller.signal.aborted)setLoading(false)});
 return ()=>controller.abort();},[path,version]);
 return {data,loading,error,reload:()=>setVersion(v=>v+1)};
}
