import { useState } from "react";
import notImg from '../../assets/statics/no-image-found.png';
import * as MdIcon from 'react-icons/md';
import { environment } from "../../environments/environments.demo";
import { Col, Container, Row } from "react-bootstrap";

const ImgRotate = ({ img }) => {

    const baseUrl = environment.baseURL
    const nImg = notImg
    //rotate img
    const [rotate, setRotate] = useState(false);
    const [deg, setDeg] = useState(0);
    const rotateRigth = () => {
        setRotate(true)
        setDeg(deg + 90)
    }
    const rotateLeft = () => {
        setRotate(true)
        setDeg(deg - 90)
    }

    return (
        <Container className="mb-3 d-flex flex-column align-items-center">
            <Row>
                <Col>
                    <div className="admin-patient__img-container">
                        <img className={`admin-patient__img ${rotate ? 'rotate-img' : ''}`} style={{ transform: `rotate(${deg}deg)` }} src={img ? img : nImg} alt={`document patient`} />
                    </div>
                </Col>
                <Col className="d-flex">
                    <div className="my-tooltip" style={{height: 'fit-content'}}>
                        <button type="button" className='btn text-secondary btn-icon' onClick={(e) => rotateLeft()}><MdIcon.MdRotateLeft className="fs-3" /></button>
                        <span className="tiptext">
                            Girar a la izquierda
                        </span>
                    </div>
                    <div className="my-tooltip" style={{height: 'fit-content'}}>
                        <button type="button" className='btn text-secondary btn-icon' onClick={(e) => rotateRigth()}><MdIcon.MdRotateRight className="fs-3" /></button>
                        <span className="tiptext">
                            Girar a la derecha
                        </span>
                    </div>
                </Col>
            </Row>
            {/* <div className="d-flex w-100 justify-content-end">

            </div> */}

        </Container>
    )
}

export default ImgRotate