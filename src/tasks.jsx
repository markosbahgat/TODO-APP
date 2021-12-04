/*==============================================Importing Libraries=================================================*/


import React, { useReducer, useState, useEffect } from 'react'
import {
  Link
} from "react-router-dom";

/*==========================================Importing Assets And Files=================================================*/

import logo from './Images/unnamed.png';
import background from './Images/5282d04a5446e70d3851fca036b7a0f9.jpg'
import './taskstyles.css';




// ================= initialize the  state with the data in the local storage if there was.! ========================

const intialDate = new Date();

const initialState = JSON.parse(localStorage.getItem("todos")) != null ? JSON.parse(localStorage.getItem("todos")) : [];

const ACTIONS = { ADD_TODO : 'add_todo', TOGGLE_TODO : 'toggle_todo', DELETE_TODO : 'delete_todo' }




//======================================== initialize the main Tasks function ============================================


export default function Tasks() {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo , setNewTodo] = useState('');
  const [newDate , setNewDate] = useState('');




  function reducer(state, action){
      
    switch (action.type) {
      
        case ACTIONS.ADD_TODO:
          return [...state, addNewTodo(action.payload.newtodo, action.payload.mydate)]
      
        case ACTIONS.TOGGLE_TODO:
          return state.map(todo => {
              if(todo.id === action.payload.id){
                return {...todo, complete: !todo.complete};
              
              }
              return todo;
              })
      
        case ACTIONS.DELETE_TODO:
            return state.filter(todo => todo.id !== action.payload.id)
        default:
            return state
    }
  }

//============================================================================================================================

  function addNewTodo(newTodo,newDate) {
    const createdTodo = {id : Date.now(), name:newTodo , complete : false , dateandtime:newDate};
    return createdTodo
  }
  

  function handleAddTodo(e) {
    e.preventDefault();
    dispatch({type: ACTIONS.ADD_TODO, payload: {newtodo:newTodo, newDate:newDate}})
    setNewTodo('')
    setNewDate('')
    e.target.parentElement.children[1].lastChild.style.left = "80%";
    e.target.classList.add("form-input");
    e.target.parentElement.children[2].style.left = "";
    e.target.parentElement.children[3].style.left = "";
  }


  function handleToggleTodo(todo) {
    dispatch({payload:{id: todo.id}, type:ACTIONS.TOGGLE_TODO})
  }
  
  useEffect(
    () => {
      localStorage.setItem("todos", JSON.stringify(state));
    },
    [state]
    );


    
  //===========================================================================================================================



  function handleShowInput(e) {
    e.target.style.left = "-500px";
    e.target.parentElement.parentElement.children[0].classList.remove("form-input");
    e.target.parentElement.parentElement.children[2].style.left = "-1000px";
    e.target.parentElement.parentElement.children[3].style.left = "-1000px";
  }
  
  setTimeout(function(){
    document.querySelector('input[type="checkbox"]').setAttribute('checked',true);
  },100);
  

//===================================================================================================================


  return (
       <div>
            <div className="mynavbar" style={{marginLeft:"130px", marginTop:"-40px",marginBottom:"100px", width:"100%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                <Link to="/"><img src={logo} width="60%"  alt="#"/></Link>
            </div>
            {/*=================================================================================================================================*/}
            <div className="tasks-container"> 
                  <svg viewBox="0 0 0 0" style={{ position: "absolute", zIndex: -1, opacity: 0 }}>
                      <defs>
                          <linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25">
                            <stop offset="0%" stopColor="#27FDC7" />
                            <stop offset="100%" stopColor="#0FC0F5" />
                          </linearGradient>
                          <linearGradient id="lineGradient">
                            <stop offset="0%" stopColor="#0FC0F5" />
                            <stop offset="100%" stopColor="#27FDC7" />
                          </linearGradient>
                          <path id="todo__line" stroke="url(#lineGradient)" d="M21 12.3h168v0.1z" />
                          <path id="todo__box" stroke="url(#boxGradient)" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"/>
                          <path id="todo__check" stroke="url(#boxGradient)" d="M10 13l2 2 5-5" />
                          <circle id="todo__circle" cx="13.5" cy="12.5" r="10" />
                      </defs>
                  </svg>
            {/*=================================================================================================================================*/}
                  <div className="todo-list">
                      <form onSubmit={handleAddTodo} className="form-input">
                            <input value={newTodo} placeholder='Add New Todo , Then Press "Enter" To Save It.....' type="text" onChange={e => setNewTodo(e.target.value)} className="input-text" autoFocus/>
                            <input type="date" className="input-date" value={newDate} onChange={event => setNewDate(event.target.value)} />
                      </form>
                      <button className="add-button" onClick={e => handleShowInput(e)}><i className="fas fa-plus"></i></button>
                      <span className="main-span">{intialDate.toLocaleDateString( "en-US" ,{ weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}</span>
                      <p className="main-p">{state.length} tasks</p>
                      <hr style={{height:"2px"}}/>
                      <label className="todo">
                          <input className="todo__state" type="checkbox" onClick={e => handleToggleTodo(e)}/>
                          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" className="todo__icon">
                            <use xlinkHref="#todo__line" className="todo__line" />
                            <use xlinkHref="#todo__box" className="todo__box" />
                            <use xlinkHref="#todo__check" className="todo__check" />
                            <use xlinkHref="#todo__circle" className="todo__circle" />
                          </svg>
                          <div className="todo__text" onClick={e => handleToggleTodo(e)}>Do a very important task</div>
                      </label>
                      {state.map(todo => { 
                          return  <label className="todo" key={todo.id}>
                            <input className="todo__state" type="checkbox" onClick={todo => handleToggleTodo(todo)}/>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" className="todo__icon">
                              <use xlinkHref="#todo__line" className="todo__line" />
                              <use xlinkHref="#todo__box" className="todo__box" />
                              <use xlinkHref="#todo__check" className="todo__check" />
                              <use xlinkHref="#todo__circle" className="todo__circle" />
                            </svg>
                            <div className="todo__text">{todo.name} {todo.dateandtime}<i className="far fa-edit ms-5" hidden></i>
                            <i onClick={() => dispatch({payload:{id: todo.id}, type:ACTIONS.DELETE_TODO})} className="far fa-trash-alt" style={{zIndex:"10000", position:"relative", float:"right"}}></i>
                            </div>
                          </label>
                      })}
              </div>
            </div>
            {/*=================================================================================================================================*/}
          <div className="bg-container" ><img src={background} alt="#"/></div>
      </div>
    )
}
