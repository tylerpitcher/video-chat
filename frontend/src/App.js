import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import useUserStore from './features/user';

function App() {
  const { darkMode } = useUserStore();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
