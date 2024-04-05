
import './App.scss'
// import { useState, useEffect } from 'react'
import Matrix from './components/matrix'
import Nav from './components/navigation';
import Description from './components/description';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Userpanel from './components/userPanel';
import SampleMatrix from './components/sampleComponents/sampleMatrix';


function App() {
  let location = useLocation();

  return (
    <>
      <header>
        <Nav location={location.pathname} />
      </header>
      <main id='main'>
        <Routes>
          <Route path='/' element={<Description />} />
          <Route path='/act-matrix' element={<SampleMatrix />} />
          <Route path='/dashboard' element={
            <Dashboard>
              <Userpanel />
              <Matrix />
            </Dashboard>}>
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App