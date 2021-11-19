import React from "react"
import { AuthUserProvider } from "../context/AuthContext"
import {Navigation } from './'
export const App = ({ children, location }) => {
  return (
    <AuthUserProvider>
        <Navigation/>
        {children}
    </AuthUserProvider>
  )
}
