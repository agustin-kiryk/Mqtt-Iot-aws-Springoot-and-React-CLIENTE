import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import { DarkModeContext } from "./context/darkModeContext";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import Single2 from "./pages/single2/Single";
import New from "./pages/new/New";
import New2 from "./pages/new2/New";
import Perfil from "./pages/perfil/Perfil";
import Histfac from "./pages/histfac/Histfac";
import Maquinas from "./pages/maquinas/Maquinas";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {/* Cambio aquí: Renderizar <Home /> en la ruta principal */}
          <Route path="/" element={<Home />} />

          <Route path="login" element={<Login />} />

          <Route path="perfil" element={<Perfil />} />

          <Route path="histfac" element={<Histfac />} />
          <Route path="maquinas" element={<Maquinas />} />
          <Route path="new" element={<New />} />
          <Route path="new2" element={<New2 />} />

          <Route path="users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route>

          <Route path="products">
            <Route index element={<List />} />
            <Route path=":productId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={productInputs} title="Add New Product" />}
            />
          </Route>

          <Route path="maquinas">
            <Route path=":userId" element={<Single2 />} />
            <Route
              path="new2"
              element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

