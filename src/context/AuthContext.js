import { navigate } from "gatsby"
import React, { createContext, useEffect, useState } from "react"
import { user as UserObserver } from "rxfire/auth"
import { useUser, useFirebase, useDocumentWithAccount } from "../firebase"
export const AuthContext = createContext({
  user: null,
  ready: false,
  logout: () => {},
})
export const AuthUserProvider = ({ children }) => {
  let [state, setState] = useState({
    ready: false,
    user: null,
    logout: () => {},
  })
  let { auth, firebase } = useFirebase()

  let { user } = useUser()
  let { uid } = user || {}
  let { data: account } = useDocumentWithAccount("")
  const logout = async () => {
    auth && await firebase.auth().signOut();
    navigate("/")
  }
  useEffect(() => {
    if (!auth) {
      return
    }
    let subscription = UserObserver(auth)
      .pipe(u => u)
      .subscribe(user => {
        setState(state => ({
          ...state,
          user: user,
          ready: true,
          logout: logout,
        }))

  console.log(state)
      })
    return () => {
      subscription.unsubscribe()
    }
  }, [auth, account])
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
