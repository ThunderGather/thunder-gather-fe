import styles from './App.module.css';
import { URL } from './utils/static';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
// import Layout from './components/layout/Layout';
import GlobalStyle from './styles/GlobalStyles';
import Profile from "./pages/Profile.tsx";
import Footer from "./components/layout/Footer.tsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup.tsx";


function App() {
  return (
    <>
      <GlobalStyle />
        <Router>
            <div className={styles.container}>
                {/*<Layout>*/}
                <Routes>
                    <Route path={URL.home} element={<Home/>}/>
                    <Route path={URL.post} element={<Post/>}/>
                    <Route path={URL.profile} element={<Profile/>}/>
                    <Route path={URL.signin} element={<Login/>}/>
                    <Route path={URL.signup} element={<Signup/>}/>
                    {/* Add more routes here as needed */}
                </Routes>

                {/*</Layout>*/}
                {/*<div className={styles.footerContainer}>*/}
                    <Footer/>
                {/*</div>*/}
            </div>

        </Router>
    </>
  );
}

export default App;
