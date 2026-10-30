import {createContext,useContext,useState,type ReactNode} from 'react';
const Preferences=createContext({onlyActive:true,toggle:()=>{}});
export function PreferencesProvider({children}:{children:ReactNode}){const [onlyActive,set]=useState(true);return <Preferences.Provider value={{onlyActive,toggle:()=>set(v=>!v)}}>{children}</Preferences.Provider>}
export const usePreferences=()=>useContext(Preferences);
