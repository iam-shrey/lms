import React from 'react';
import Routing from './components/Routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from './assets/back.png';

function App() {

  return (
    <div className="App mx-auto" style={{
                    backgroundImage: `url(${backgroundImage})`,
                    minHeight: "100vh",
                    backgroundSize: "cover",
                }}>
      <Routing/>
      <ToastContainer position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
    </div>
  );
}

export default App;