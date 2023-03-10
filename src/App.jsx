import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, Footer } from './Components';
import GlobalContextProvider from './Contexts';
import { ErrorScreen, Home, AuthScreen } from './Pages';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <GlobalContextProvider>
        <Router>
          <Routes>
            <Route exact path="/auth" element={<AuthScreen />} />
            <Route path="/*" element={<Home />} />
            <Route path="error/:errorCode?" element={<ErrorScreen />} />
          </Routes>
        </Router>
      </GlobalContextProvider>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
