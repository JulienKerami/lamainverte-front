import { useState, useEffect } from 'react';
import Navbar from './Component/Navbar/Navbar';
import Todo from './Component/Todo/Todo';
import Login from './Component/login/Login';
import Potager from './Component/Potager/Potager';
import './App.css';
import SignIn from './Component/SignIn/SignIn';
import Home from './Component/Home/Home';
import { Routes, Route, Link, useLocation } from 'react-router-dom';3000
import { useDispatch } from 'react-redux';
import { GetAllZones, getFamily, getTasks } from './Component/Apicall/Apicall';
import { jwtDecode } from 'jwt-decode';
import { editZone } from './Component/store/slices/zonesSlice';
import { addFamily } from './Component/store/slices/vegetableSlice';
import { addTask } from './Component/store/slices/todoSlice';

function App() {
  const [isNavbarOn, setIsNavbarOn] = useState(true);
  const [showNavbarToggle, setShowNavbarToggle] = useState(window.innerWidth > 600);
  const [pathLocation, setPathLocation] = useState('');
  const location = useLocation();

  useEffect(() => {
    GetZonesFromBDD();
    getTask();
    getFamilies();
  }, []);

  useEffect(() => {
    
    setPathLocation(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600;
      setShowNavbarToggle(isMobile);
      setIsNavbarOn(isMobile ? false : true);
      console.log("test");
    };

    handleResize(); 
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dispatch = useDispatch();

  const getTask = async () => {
    const tasks = await getTasks();
    const sortedTasks = tasks.data
    sortedTasks.sort((a,b) => Date.parse(new Date(a.start_date_period)) - Date.parse(new Date(b.start_date_period)) )
    dispatch(addTask(tasks.data));
  };

  const GetZonesFromBDD = async () => {
    const token = localStorage.getItem('name');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    console.log(localStorage.getItem('name'));
    const zones = await GetAllZones(userId);
    console.log('zones: ', zones);
    dispatch(editZone(zones.data.zones));
  };

  const getFamilies = async () => {
    const legumes = await getFamily();
    console.log('family: ', legumes);
    let legumesArray = legumes.data;
    dispatch(addFamily(legumesArray));
  };

  const toggleNavbar = () => {
    setIsNavbarOn((prev) => !prev);
  };

  return (
    <>
      <header className={`header ${pathLocation === '/' ? 'header_home' : ''}`}>
        <Link to='/'>
          <div className={`logo ${pathLocation === '/' ? 'logo_home' : ''}`}>
            <img
              src="logo.png"
              alt="logo laMainVerte"
              className={`logo-img ${pathLocation === '/' ? 'logo-img_home' : ''}`}
            />
            <div
              className={`logo-title ${pathLocation === '/' ? 'logo-title_home' : ''}`}
            >
              <span>la</span>
              <span>main</span>
              <span className="logo-title_text">verte</span>
            </div>
          </div>
        </Link>
        {showNavbarToggle && (
          <div
            className={`navbarToggle ${pathLocation === '/' ? 'navbarToggle_home' : ''}`}
            onClick={() => toggleNavbar()}
          >
            <div
              className={`navbarToggle-img ${pathLocation === '/' ? 'navbarToggle-img_home' : ''}`}
            ></div>
            <div
              className={`navbarToggle-img ${pathLocation === '/' ? 'navbarToggle-img_home' : ''}`}
            ></div>
            <div
              className={`navbarToggle-img ${pathLocation === '/' ? 'navbarToggle-img_home' : ''}`}
            ></div>
          </div>
        )}
      </header>
      {isNavbarOn && <Navbar />}
      <Routes>
        <Route path='/potager' element={<Potager />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/' element={<Home setPathLocation={() => setPathLocation('/')} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </>
  );
}

export default App;
