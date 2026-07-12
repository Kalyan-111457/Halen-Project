"use client"

import { Provider } from "react-redux"
import { store } from "./store"

interface ChilderenProps{
    children:React.ReactNode
}

function Providers({children}:ChilderenProps){

    return(

        <Provider store={store}>

        {children}

        </Provider>

    )


}


export default Providers;