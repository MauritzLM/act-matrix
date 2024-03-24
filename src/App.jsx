
import './App.scss'
// import { useState, useEffect } from 'react'
import Matrix from './components/matrix'
import Nav from './components/navigation';
import Description from './components/description';
import { Route, Routes, useLocation } from 'react-router-dom';


function App() {
  let location = useLocation();

  // logged in state*
  // if user logged in render dashboard*
  return (
    <>
      <header>
        <Nav location={location.pathname}/>
      </header>
      <main id='main'>
        <Routes>
          <Route path='/' element={<Description />} />
          <Route path='/act-matrix' element={<Matrix />} />
        </Routes>
      </main>
    </>
  )
}

export default App