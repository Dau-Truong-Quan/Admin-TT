import "./App.css";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  Switch,
  useHistory,
} from "react-router-dom";
import { HomeTemplate } from "./template/HomeTemplate/HomeTemplate";
import Login from "./template/Page/Login/Login";
import { LoginTemplate } from "./template/HomeTemplate/LoginTemplate";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { CycberBugTemplate } from "./template/HomeTemplate/CycberBugTemplate";
import CreateProject from "./template/Page/Cycberbug/CreateProject/CreateProject";

import ProjectManager from "./template/Page/ProjectManager/ProjectManager";
import DrawerCycberbug from "./HOC/CyberBug/DrawerCycberbug";
import IndexCycberbug from "./template/HomeTemplate/indexCycberbug";
import TabOrder from "./template/Page/OrderManager/TabOrder";
import Dashboard from "./template/Page/Dashboard/Dashboard";
function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);
  return (
    <>
      <DrawerCycberbug />
      <Switch>
        <LoginTemplate exact path="/login" Component={Login} />
        <CycberBugTemplate
          exact
          path="/projectManager/:idProduct"
          Component={IndexCycberbug}
        />
        <CycberBugTemplate
          exact
          path="/projectManager"
          Component={ProjectManager}
        />
        <CycberBugTemplate
          exact
          path="/createProject"
          Component={CreateProject}
        />
        <CycberBugTemplate exact path="/" Component={Dashboard} />
        <CycberBugTemplate exact path="/order" Component={TabOrder} />
      </Switch>
    </>
  );
}

export default App;
