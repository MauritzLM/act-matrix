
import './App.css'
import { useState } from 'react'
import Matrix from './components/matrix'
import Nav from './components/navigation';
import Description from './components/description';

function App() {
  const [currentPage, setCurrentPage] = useState("description");

  function changePage(text) {
    setCurrentPage(text)
  }

  //  add conditional rendering for matrix / description(theory)

  if (currentPage === "matrix") {
    return (
      <>
        <header>
          <Nav currentPage={currentPage} changePage={changePage} />
        </header>
        <main id="main">
          <h1>Act matrix</h1>
          <Matrix />
        </main>
      </>
    )
  }

  else {
    return (
      <>
        <header>
          <Nav currentPage={currentPage} changePage={changePage} />
        </header>
        <main id="main">

          <h1>Description / instructions / example</h1>
          <Description />
        </main>
      </>
    )
  }


}

export default App
