 
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Email from './Email';

function App() {
  return (
      <div>
         <Router>
        <Routes>

        <Route path="/signup" element={<Email/>}></Route>
        <Route path="/" element={<Email/>}></Route>

        </Routes>
       
       </Router>
      </div>
  );
}

export default App;
