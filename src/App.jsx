
import './App.scss'
import { useState } from 'react'
import Matrix from './components/matrix'
import Nav from './components/navigation';
import Description from './components/description';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Userpanel from './components/userPanel';
import SampleMatrix from './components/sampleComponents/sampleMatrix';
import ErrorPage from './pages/error-page';
import Footer from './components/footer';


function App() {
  let location = useLocation();
  let storedTheme = window.localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  const [theme, setTheme] = useState(storedTheme)

  function switchTheme() {
    setTheme('light' === theme ? 'dark' : 'light')
    window.localStorage.setItem('theme', theme)
  }

  return (
    <>
      <div className='app' data-theme={theme}>
        <header>
          <Nav location={location.pathname} theme={theme} switchTheme={switchTheme} />
        </header>
        <main id='main'>
          <Routes>
            <Route path='/' element={<Description />} />
            <Route path='/act-matrix' element={<SampleMatrix />} />
            <Route path='/dashboard' element={
              <Dashboard>
                <Userpanel />
                <Matrix />
              </Dashboard>} errorElement={<ErrorPage />}>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App