import { Switch, Route, Redirect } from "react-router-dom";
import AdminMain from "../admin-pages/AdminMain/AdminMain";
import AdminMessages from "../admin-pages/AdminMessages";
import AdminPatients from "../admin-pages/AdminPatients";
import Establecimientos from "../admin-pages/Establecimientos";
import NotFound from "../pages/NotFound/NotFound";
import AdminPanel from "../admin-pages/AdminPanel";

export default function AdminRouter() {
  return (
    <div className="user-container">
      <div className="admin-container">
        <Switch>
          <Route exact path="/admin" component={AdminMain} />
          <Route path="/admin/panel" component={AdminPanel} />
          <Route path="/admin/alta-de-pacientes" component={AdminPatients} />
          <Route path="/admin/mensajeria" component={AdminMessages} />
          <Route path="/admin/establecimientos" component={Establecimientos} />
          <Route path="/admin/404" component={NotFound} />
          <Route path="/admin/*">
            <Redirect to="/admin/404" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
