'use client'

import { FC, useContext, createContext, useState } from 'react'

// 


type ContextType = {
  path: string,
  setPath: any
}

export const Context = createContext<any | undefined>(undefined)


const RootContext = ({ children }: {children: React.ReactNode}) => {


  const [path, setPath] = useState('')

  return (

    <Context.Provider value={{path, setPath}}>
      {children}
    </Context.Provider>
  )
}

export default RootContext
