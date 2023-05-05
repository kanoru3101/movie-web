import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";

import {BaseLayout} from "./layouts";
import { Home, Auth, Login, Profile, Movie, Person } from './pages'
const App = () => {
  return (
    <>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:imdbId" element={<Movie />} />
          <Route path="/person/:imdbId" element={<Person />} />
        </Routes>
      </BaseLayout>
    </>
  )
}

export default App;
