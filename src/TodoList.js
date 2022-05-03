import React, { useState } from 'react'
import './Todo.css'
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Modal,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from '@material-ui/core'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import db from './firebase'
import { red } from '@material-ui/core/colors'

const useStyle = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    width: 300,
    height: 200,
    bgcolor: red,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
}))

function TodoList({ todo }) {
  // update
  const [open, setopen] = useState(false)
  const [input, setinput] = useState('')
  const classes = useStyle()

  const updateTodo = async (event) => {
    setopen(false)
    event.preventDefault()
    const userDoc = doc(db, 'todos', todo.id)
    const newFields = { todo: input }
    await updateDoc(userDoc, newFields, { merge: true })

    setinput('')
  }

  // delete
  const deleteTodo = async (id) => {
    const userDoc = doc(db, 'todos', id)
    await deleteDoc(userDoc)
  }

  return (
    <>
      <Modal open={open} onClose={(e) => setopen(false)}>
        <div className={classes.paper}>
          <form>
            <FormControl className="fix">
              <InputLabel htmlFor="my-input">✔️ Update post</InputLabel>
              <Input
                id="my-input"
                type="text"
                onChange={(e) => setinput(e.target.value)}
                value={input}
                aria-describedby="my-helper-text"
              />
              <FormHelperText id="my-helper-text">
                You changed your mind!
              </FormHelperText>
            </FormControl>
            <Button
              disabled={!input}
              className="newBtn"
              color="primary"
              variant="contained"
              type="submit"
              onClick={updateTodo}
            >
              🗳️Update
            </Button>
          </form>
        </div>
      </Modal>
      <List className="todo">
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText secondary={`Recent on list ⏫ `} primary={todo.todo} />
        </ListItem>
        <Button
          style={{ backgroundColor: ' lightcoral' }}
          className="btn2"
          onClick={() =>
            setTimeout(() => {
              deleteTodo(todo.id)
            }, 500)
          }
        >
          ❌Delete
        </Button>
        <Button
          className="btn3"
          variant="contained"
          color="primary"
          onClick={(e) => setopen(true)}
        >
          {' '}
          ✏️ Edit{' '}
        </Button>
      </List>
    </>
  )
}

export default TodoList

// const updateTodo = async (id, ans) => {
//   const todoDoc = doc(db, 'todos', id)
//   const newFields = { todo: ans + 1 }
//   await updateDoc(todoDoc, newFields)
// }
