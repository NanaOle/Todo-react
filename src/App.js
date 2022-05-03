import './App.css'
import React, { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from 'firebase/firestore'
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from '@material-ui/core'
import TodoList from './TodoList'
import db from './firebase'

function App() {
  const [input, setsinput] = useState('')
  const [todos, settodos] = useState([])

  // when the app loads, we want to listen to the database and fetch new todos as they get added/ removed

  // collection ref
  const colref = collection(db, 'todos')
  useEffect(() => {
    const q = query(colref, orderBy('timestamp', 'desc'))
    // get collection data
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        let todos = snapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
        }))
        settodos(todos)
      },
      (err) => {
        console.log(err.message)
      },
    )
    return unsub
  }, [])

  const addtodos = async (event) => {
    // add the code here
    event.preventDefault()
    // settodos([...todos, input])
    setsinput('')
    await addDoc(colref, { todo: input, timestamp: serverTimestamp() })
  }

  return (
    <div className="App">
      <div className="theTotal">
        <h1 style={{ textAlign: 'center', marginTop: '-5px' }}>GLOBAL POST</h1>
        <form>
          <FormControl className="fix">
            <InputLabel htmlFor="my-input">✔️ Enter a post</InputLabel>
            <Input
              id="my-input"
              type="text"
              onChange={(e) => setsinput(e.target.value)}
              value={input}
              aria-describedby="my-helper-text"
            />
            <FormHelperText id="my-helper-text">
              Share your post with us
            </FormHelperText>
          </FormControl>
          <Button
            className="btn"
            type="submit"
            disabled={!input}
            onClick={addtodos}
            variant="contained"
            color="primary"
          >
            Add post
          </Button>
        </form>
      </div>
      <ul className="theListElement">
        {todos.map((todo, index) => {
          return <TodoList key={index} todo={todo} />
        })}
      </ul>
    </div>
  )
}

export default App
