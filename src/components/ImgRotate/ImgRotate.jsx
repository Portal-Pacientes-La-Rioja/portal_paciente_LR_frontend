import { useEffect, useState } from "react";
import notImg from '../../assets/statics/no-image-found.png';
import * as MdIcon from 'react-icons/md';
import { environment } from "../../environments/environments.demo";
import { Col, Container, Row } from "react-bootstrap";
import { useRef } from "react";

const ImgRotate = ({ img }) => {

    const baseUrl = environment.baseURL
    const nImg = notImg
    //rotate img
    const [rotate, setRotate] = useState(false);
    const [deg, setDeg] = useState(0);
    const [zoom, setZoom] = useState(1);
    const draggableRef = useRef()
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [cursor, setCursor] = useState('auto');
    const [position, setPosition] = useState({x: '0', y: '0'});
    const [clientPosition, setClientPosition] = useState({x: '0', y: '0'});

    const rotateRight = () => {
        setRotate(true)
        setDeg(deg + 90)
    }
    const rotateLeft = () => {
        setRotate(true)
        setDeg(deg - 90)
    }

    const addZoom = () => {
        let add = zoom
        if (add++ < 5) setZoom(add++)
        setPosition({x: '0', y: '0'})
    }
    const removeZoom = () => {
        let remove = zoom
        if (remove-- > 1) setZoom(remove--)
        setPosition({x: '0', y: '0'})
    }

    const handleMouseDown = (event) => {
        if (zoom > 1) {
            setIsMouseDown(true);
            const containerRect = draggableRef.current.parentElement.getBoundingClientRect();
            setClientPosition({
              x: event.clientX - containerRect.left,
            });
        }
    }

    const handleMouseMove = (event) => {
        if (isMouseDown && zoom > 1) {
            const containerRect = draggableRef.current.parentElement.getBoundingClientRect();
            setPosition({
              x: (event.clientX - containerRect.left - clientPosition.x)
            });
          }
    }

    const handleMouseUp = () => {
        if (zoom > 1) setIsMouseDown(false)
    }

    useEffect(() => {
        if (zoom > 1) setCursor('grab') 
        else setCursor('auto')
    }, [zoom])


    return (
        <Container className="mb-3 d-flex flex-column align-items-center">
            <Row>
                <Col>
                    <div className="admin-patient__img-container position-relative">
                        <img className={`admin-patient__img`}
                            style={{
                                transform: `rotate(${deg}deg) scale(${zoom})`,
                                position: 'absolute',
                                left: position.x,
                                cursor: cursor
                            }}
                            src={img ? img : nImg}
                            ref={draggableRef}
                            draggable={false}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseOut={handleMouseUp}
                            onMouseUp={handleMouseUp}
                            alt={`document patient`}
                        />
                    </div>
                </Col>
                <Col className="d-flex d-md-block">
                    <div className="my-tooltip" style={{ height: 'fit-content' }}>
                        <button type="button" className='btn text-secondary btn-icon' onClick={(e) => rotateLeft()}><MdIcon.MdRotateLeft className="fs-3" /></button>
                        <span className="tiptext">
                            Girar a la izquierda
                        </span>
                    </div>
                    <div className="my-tooltip" style={{ height: 'fit-content' }}>
                        <button type="button" className='btn text-secondary btn-icon' onClick={(e) => rotateRight()}><MdIcon.MdRotateRight className="fs-3" /></button>
                        <span className="tiptext">
                            Girar a la derecha
                        </span>
                    </div>
                    <div className="my-tooltip" style={{ height: 'fit-content' }}>
                        <button type="button" className='btn text-secondary btn-icon' onClick={(e) => addZoom()}><MdIcon.MdOutlineZoomIn  className="fs-3"  /></button>
                        <span className="tiptext">
                            Zoom +
                        </span>
                    </div>
                    <div className="my-tooltip" style={{ height: 'fit-content' }}>
                        <button type="button" className='btn text-secondary btn-icon' onClick={(e) => removeZoom()}><MdIcon.MdOutlineZoomOut  className="fs-3"  /></button>
                        <span className="tiptext">
                            Zoom -
                        </span>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ImgRotate