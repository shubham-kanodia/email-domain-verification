import './App.css';
import Form from "./components/Form";
import Verify from './components/Verify';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <div class="flex items-center justify-center h-screen">
        <BrowserRouter>
          <Routes>
              <Route path="/verify/:sig/:domain/:account" element={<Verify />} />
              <Route path="/" element={<Form />}>
              <Route index element={<Form />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
