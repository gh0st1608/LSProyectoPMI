import './App.css';
import "./sb-admin-2.min.css";
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Upload from './Upload';
import Personlist from './Personlist';
import Portal from './Portal';
import PersonCreate from './PersonCreate';
import PersonView from './PersonView';
import PersonEdit from './PersonEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/portal' element={<Portal />}>
          <Route path='upload' element={<Upload />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='person-list' element={<Personlist />} />
          <Route path='person-create' element={<PersonCreate />} />
          <Route path='person-view/:id' element={<PersonView />} />
          <Route path='person-edit/:id' element={<PersonEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
