import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../../pages/NotFound'
import ManageAdmin from './pages/ManageAdmin';
import RegisterAdmin from './pages/RegisterAdmin';


export default function AdminPanelRouter() {
    return (
             <Switch>
                <Route exact path='/admin/panel/registrar' component={RegisterAdmin}/>
                <Route exact path='/admin/panel/editar' component={RegisterAdmin}/>
                <Route exact path='/admin/panel/listado' component={ManageAdmin}/>
                <Route path='/usuario/turnos/404' component={NotFound}/>   
                <Route path='/usuario/turnos/*'><Redirect to='/404'/></Route>
            </Switch>
    )
}