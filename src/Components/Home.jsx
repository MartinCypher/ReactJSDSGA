import React from 'react'
import"../Css/Home.css"
import NavBar from './NavBar'
import Juegos from './Juegos'


const Home = ({user}) => {
  return (
    <div className='wrapper'>
      <NavBar user={user}/>
      <Juegos/>
    </div>
  )
}

export default Home
