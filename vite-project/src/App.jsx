import './App.css';
import Home from './Component/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StateProvider } from '../src/Component/StateContext'; // Import the StateProvider
import { ApiProvider } from './Component/ApiContext';
import Profilr from './Component/Profilr'; // Import the Profilr component
import ChatInterface from './Component/ChatInterface';
import Fetchlawyer from './Component/Fetchlawyer';
if (typeof global === 'undefined') {
    window.global = window;
}

function App() {
  return (
    <ApiProvider>
      <StateProvider>
        <Router>
          <Routes>
            {/* Main route for home page */}
            <Route path="/" element={<Home />} />
            <Route path="/fetchlawyer" element={<Fetchlawyer />} />


            {/* Route for viewing a specific lawyer profile */}
            <Route path="/lawyer/:id" element={<Profilr />} />

            {/* Route for the chat interface */}
            <Route path="/chat" element={<ChatInterface />} />
          </Routes>
        </Router>
      </StateProvider>
    </ApiProvider>
  );
}

export default App;
