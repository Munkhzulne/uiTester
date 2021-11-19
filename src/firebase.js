import firebase from "firebase/app"
import { firestore } from "firebase/app"
import { useState, useEffect, useContext } from "react"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"
import { identity } from "lodash"
import { collectionData, docData } from "rxfire/firestore"
import { authState, user as UserObserver } from "rxfire/auth"
import { filter, switchMap, tap } from "rxjs/operators"

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
}
const ACCOUNT_HOME = "users"
const initializeFirebase = () => {
  let app
  if (!firebase.apps.length) {
    app = firebase.initializeApp(config)
  }
  const storage = firebase.storage(app)
  const firestore = firebase.firestore(app)
  const auth = firebase.auth(app)
  return { storage, firestore, app, firebase, auth }
}

export const useFirebase = () => {
  let [state, setState] = useState({
    firebase,
  })

  useEffect(() => {
    setState(initializeFirebase())
  }, [])

  return state
}

export const useUser = () => {
  let [user, setUser] = useState()
  let [loading, setLoading] = useState(true)
  let { auth } = useFirebase()
  useEffect(() => {
    if (!auth) {
      return
    }
    let subscription = UserObserver(auth)
      .pipe(filter(identity))
      .subscribe(u => setUser(u))
    return () => {
      subscription.unsubscribe()
    }
  }, [auth])

  return { user, loading }
}

export const createDoc = (path, data) => {
  firebase
    .firestore()
    .doc(`${path}`)
    .set({
      createdAt: firebase.firestore.FieldValue.serverTimestamp() || null,
      ...data,
    })
}

export const useDocumentWithAccount = path => {
  let [data, setData] = useState()
  let [loading, setLoading] = useState(true)
  let { auth, firestore } = useFirebase()
  useEffect(() => {
    if (!firestore || !auth) {
      return
    }
    let subscription = authState(auth)
      .pipe(
        filter(identity),
        switchMap(({ uid }) => {
          let query = firestore.doc(`${ACCOUNT_HOME}/${uid}/${path}`)
          return docData(query, "id")
        }),
        tap(() => setLoading(false))
      )
      .subscribe(setData)
    return () => {
      subscription.unsubscribe()
    }
  }, [path, auth, firestore])
  return { data, loading }
}
export const useDocument = path => {
  let [data, setData] = useState({})
  let [loading, setLoading] = useState(true)
  let { firestore } = useFirebase()

  useEffect(() => {
    if (!firestore) {
      return
    }
    let subscription = docData(firestore.doc(`${path}`), "uid").subscribe(d => {
      setData(d)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [firestore, path])
  return { data, loading }
}
export const createRecordWithAccount = (path, data) => {
  let { uid } = firebase.auth().currentUser
  return firebase
    .firestore()
    .collection(`${ACCOUNT_HOME}/${uid}/${path}`)
    .add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...data,
    })
}

export const createRecord = (path, data) => {
  return firebase
    .firestore()
    .collection(`${path}`)
    .add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...data,
    })
}

export const updateRecordWithAccount = (path, data) => {
  let { uid } = firebase.auth().currentUser
  data.createdAt = data.createdAt
    ? data.createdAt
    : firebase.firestore.FieldValue.serverTimestamp()
  return firebase
    .firestore()
    .doc(`${ACCOUNT_HOME}/${uid}/${path}`)
    .set(
      {
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        ...data,
      },
      {
        merge: true,
      }
    )
}
export const useCollectionWithAccount = path => {
  let [data, setData] = useState()
  let [loading, setLoading] = useState(true)
  let { firestore } = useFirebase()
  let { uid } = firebase.auth().currentUser
  useEffect(() => {
    if (!firestore) {
      return
    }
    let subscription = collectionData(
      firestore
        .collection(`${ACCOUNT_HOME}/${uid}/${path}`)
        .orderBy("createdAt", "desc"),
      "id"
    ).subscribe(d => {
      setData(d)
      setLoading(false)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [firestore, path])
  return { data, loading }
}
export const useCollection = path => {
  let [data, setData] = useState()
  let [loading, setLoading] = useState(true)
  let { firestore } = useFirebase()
  useEffect(() => {
    if (!firestore) {
      return
    }
    let subscription = collectionData(
      firestore.collection(`${path}`),
      "id"
    ).subscribe(d => {
      setData(d)
      setLoading(false)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [firestore, path])
  return { data, loading }
}
export const updateRecord = (path, data) => {
  let { uid } = firebase.auth().currentUser
  data.createdAt = data.createdAt
    ? data.createdAt
    : firebase.firestore.FieldValue.serverTimestamp()
  return firebase
    .firestore()
    .doc(`${path}`)
    .update({
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...data,
    })
}

export const addJobCount = () => {
  let { uid } = firebase.auth().currentUser
  firebase
    .firestore()
    .doc(`users/${uid}`)
    .get().then(e => {
      console.log(e.data())
      firebase
        .firestore()
        .doc(`users/${uid}`)
        .update({
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          jobs: e.data().jobs + 1,
        })
    })
}
