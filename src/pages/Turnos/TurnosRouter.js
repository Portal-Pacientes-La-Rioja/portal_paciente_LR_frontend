import { Switch, Route, Redirect } from 'react-router-dom';
import MisTurnos from './pages/MisTurnos';
import SolicitarTurnos from './pages/SolicitarTurnos';
import NotFound from '../NotFound';
import SolicitarEmail from './pages/SolicitarEmail';

export default function TurnosRouter() {
    return (
             <Switch>
                <Route exact path='/usuario/turnos/mis-turnos' component={MisTurnos}/>
                <Route exact path='/usuario/turnos/solicitar-turnos' component={SolicitarTurnos}/>
                <Route exact path='/usuario/turnos/solicitar-turnos-email' component={SolicitarEmail}/>
                <Route path='/usuario/turnos/404' component={NotFound}/>   
                <Route path='/usuario/turnos/*'><Redirect to='/usuario/404'/></Route>
            </Switch>
    )
}