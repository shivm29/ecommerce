import './App.css';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';

function App() {

  const [theme, setTheme] = useState("light")

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add("dark");
    }
    else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme])

  const handleTheme = () => {
    setTheme(theme === 'dark' ? "light" : "dark")
  }

  return (
    <>
      <Layout> <h1 className='font-Poppins'  >hey</h1> </Layout>
    </>
  );
}

export default App;
