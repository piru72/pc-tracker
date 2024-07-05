import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Index from './features/index';

function App() {
  

  return (
    <>
      <Routes>

        <Route path="/" element={<Index />} />
      
      </Routes>
    </>
  )
}

export default App
