import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Layout/Main";
import { useEffect, useState } from "react";
import MainNoAuth from "./components/Layout/MainNoAuth";
import { Provider } from "react-redux";
import store from "./store";
import { authRoutes, noAuthRoutes } from "./common/routes";
import { ConfigProvider } from "antd";
import esES from "antd/lib/locale-provider/es_ES";
import CONFIG from "./common/environment";
import "moment/locale/es-mx";

function App() {
  useEffect(() => {
    document.title = CONFIG.TITLE;
  });
  return (
    <>
      <Provider store={store}>
        <ConfigProvider locale={esES}>
          <Routes>
            <Route element={<Main />}>
              {authRoutes.map((a, index) => (
                <Route key={`${index}-a`} path={a.path} element={a.element} />
              ))}
            </Route>
            <Route element={<MainNoAuth />}>
              {noAuthRoutes.map((na, index) => (
                <Route
                  key={`${index}-na`}
                  path={na.path}
                  element={na.element}
                />
              ))}
            </Route>
          </Routes>
        </ConfigProvider>
      </Provider>
    </>
  );
}

export default App;
