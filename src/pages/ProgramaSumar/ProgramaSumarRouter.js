import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../NotFound';
import ProgramaSumar from './pages/ProgramaSumar';
import CredencialSumar from './pages/CredencialSumar';

export default function ProgramaSumarRouter() {
    return (
             <Switch>
                <Route path='/usuario/programa-sumar/hc' component={ProgramaSumar}/>
                <Route path='/usuario/programa-sumar/ceb' component={CredencialSumar}/>
                <Route path='/usuario/programa-sumar/404' component={NotFound}/>   
                <Route path='/usuario/programa-sumar/*'><Redirect to='/404'/></Route> 
            </Switch>
    )
}
