import { Container, Row, } from "react-bootstrap";
import {AltaUsers} from "./charts/AltaUsers/AltaUsers";
// import { FamilyGroupChart } from "./charts/FamilyGroupChart/FamilyGroupChart";
// import { HSIChart } from "./charts/HSIChart/HSIChart";
// import { SumarChart } from "./charts/SumarChart/SumarChart";
import { ActiveUsers } from "./charts/ActiveUsers/ActiveUsers";
import * as MdIcon from "react-icons/md";

export default function AdminDashboard() {

    return (
        <Container className='p-3'>
            <div className="d-flex">
                <MdIcon.MdOutlineDashboard className="menu-icon text-danger me-1" style={{fontSize: 'x-large'}}/>
                <h5 className='section-title'>Indicadores</h5>
            </div>
            <Row className="p-3">
                <AltaUsers/>
            </Row>
            <Row className="p-3">
                <ActiveUsers/>
            </Row>
        </Container>
    )
}
