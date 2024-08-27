import { Container } from "react-bootstrap";
import DataNotFound from "../../components/DataNotFound";
import FilesDragAndDrop from "./DragAndDrop/drag_and_drop";

export default function Estudios() {
        
    return (
        <Container className='estudios p-3'>
            <h5 className='section-title'>Estudios</h5>
            <FilesDragAndDrop />
        </Container>
        
        
    )
}
