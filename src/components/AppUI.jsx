/* eslint-disable react/prop-types */

import { db } from '../config/firebase.config'
import { 
  getDocs, 
  doc, 
  collection, 
  addDoc, 
  updateDoc,
  deleteDoc,
  query,
  where, 
  orderBy
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { Counter } from './UI/counter/Counter'
import { Search } from './UI/search/Search'
import { List } from './UI/list/List'
import { Empty } from './UI/list/Empty'
import { Item } from './UI/list/Item'
import { Create } from './UI/create/Create'
import { HeadProfile } from './UI/profile/HeadProfile'
import { Loading } from './UI/loading/Loading'

export function AppUI({
  userObj,
  errorObj
}) {
  const [todos, setTodos] = useState([])
  const todosCollectionRef = collection(db, 'todos')
  const [activeModal, setActiveModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const userId = userObj.uid

  const getTodos = async () => {
    const q = query(todosCollectionRef, where('createdBy', '==', userId), orderBy('createdAt', 'desc'))
    try {
      const data = await getDocs(q)
      const dataArr = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setTodos(dataArr)
      console.log(dataArr)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTodos()
  },[])

  const searchTodo = todos.filter((todo) => {
    const noTildes = (text) => {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    const todoTextToLowerCase = noTildes(todo.text.toLowerCase());
    const searchValueToLowerCase = noTildes(searchValue.toLowerCase());
    return todoTextToLowerCase.includes(searchValueToLowerCase);
  })

  const onSubmitTodo = async (e, text, level) => {
    e.preventDefault()
    const newTodo = {
      text: text,
      level: level,
      completed: false,
      createdBy: userObj.uid,
      createdAt: Date.now()
    }
    await addDoc(todosCollectionRef, newTodo)
      .then(
        setActiveModal(false)
      )
      .then(
        getTodos()
      )
      .catch((error) => {
        console.log(error)
      })
  }

  // estas funciones se dispara en Item.jsx
  const onCompleteTodo = async (id) => {
    const todoDoc = doc(db, 'todos', id)
    await updateDoc(todoDoc, {completed: true})
      .then(
        getTodos()
      )
  }
  const onEditTodo = async (id, text, level) => {
    setEditModal(true)
    const todoId = document.getElementById('todoId')
    const todoText = document.getElementById('todoText')
    const todoLevel = document.getElementById('todoLevel')
    todoId.value = id
    todoText.value = text
    todoLevel.value = level
    
    setActiveModal(true)
  }
  const editTodo = async (e, text, level) => {
    e.preventDefault()
    const todoId = document.getElementById('todoId')
    const todoDoc = doc(db, 'todos', todoId.value)
    await updateDoc(todoDoc, {
      text: text,
      level: level
    })
      .then(
        setEditModal(false)
      )
      .then(
        setActiveModal(false)
      )
      .then(
        getTodos()
      )
  }
  const onDeleteTodo = async (id) => {
    const todoDoc = doc(todosCollectionRef, id)
    await deleteDoc(todoDoc)
      .then(
        getTodos()
      )
  }

  const openModal = (e) => {
    e.preventDefault()
    const todoText = document.getElementById('todoText')
    const todoLevel = document.getElementById('todoLevel')
    todoText.value = ''
    todoLevel.value = '0'
    setEditModal(false)
    setActiveModal(true)
  }
  const closeModal = (e) => {
    e.preventDefault()
    setActiveModal(false)
  }

  return (
    <>
      <Header userObj={userObj} errorObj={errorObj} />
      <main className="main">
        <div className="main__content">
          <div className="todo">
            <HeadProfile userObj={userObj} />
            <Counter totalTodos={todos.length} completedTodos={todos.filter(todo => !!todo.completed).length} />
            <Search 
              searchValue={searchValue} 
              setSearchValue={setSearchValue} 
            />
            <List>
              {
                todos.length > 0 ?
                <>
                  {
                    searchTodo.map((todo) => {
                      return (
                        <Item 
                          key={todo.id}
                          text={todo.text}
                          level={todo.level}
                          completed={todo.completed}
                          createdAt={todo.createdAt}
                          onCompleteTodo={() => onCompleteTodo(todo.id)}
                          onEditTodo={() => onEditTodo(todo.id, todo.text, todo.level)}
                          onDeleteTodo={() => onDeleteTodo(todo.id)}
                        />
                      )
                    })
                  }
                </> :
                <Loading />
              }              
            </List>            
            <Create 
              editModal={editModal}
              activeModal={activeModal} 
              editTodo={editTodo}
              onSubmitTodo={onSubmitTodo} 
              openModal={openModal} 
              closeModal={closeModal} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}