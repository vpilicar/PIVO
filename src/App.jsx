import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { IME_APLIKACIJE, RouteNames } from './constants'
import Home from './pages/Home'
import VarivanjePregled from './pages/varenja/VarivanjePregled'
import VarivanjeNovo from './pages/varenja/VarivanjeNovo'
import VarivanjePromjena from './pages/varenja/VarivanjePromjena'

function App() {
  return (
    <Container>
      <Izbornik />
      <Container className='app'>
        <Routes>
          <Route path={RouteNames.HOME}             element={<Home />} />
          <Route path={RouteNames.VARENJA}          element={<VarivanjePregled />} />
          <Route path={RouteNames.VARENJA_NOVO}     element={<VarivanjeNovo />} />
          <Route path={RouteNames.VARENJA_PROMJENA} element={<VarivanjePromjena />} />
        </Routes>
      </Container>
      <hr />
      &copy; {IME_APLIKACIJE} | Vladimir Pilicar
    </Container>
  )
}

export default App
