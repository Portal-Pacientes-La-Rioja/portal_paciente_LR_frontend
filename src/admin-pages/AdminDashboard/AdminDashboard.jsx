import { Container, Row, } from "react-bootstrap";
// import {LoginChart} from "./charts/LoginChart/LoginChart";
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
                {/* <LoginChart reasults={data1} handleSearch={handleSearch}/> */}
                <ActiveUsers/>
                {/* <FamilyGroupChart reasults={data2} handleSearch={handleSearch}/> */}
                {/* <HSIChart reasults={data3} handleSearch={handleSearch}/>
                <SumarChart reasults={data4} handleSearch={handleSearch}/> */}
            </Row>
        </Container>
    )
}
