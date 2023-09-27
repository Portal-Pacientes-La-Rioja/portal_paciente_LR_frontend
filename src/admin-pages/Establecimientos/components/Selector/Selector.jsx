import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import Swal from "sweetalert2";
import { warning } from "../../../../components/SwalAlertData";


const Selector = (props) => {
    const { show, tipo, close, values, dataList } = props;
    const [data, setData] = useState([]);
    const [dataSelected, setDataSelected] = useState([]);
    const [allSelected, setAllSelected] = useState(false);

    useEffect(() => {
        let checkBoxList = dataList.map((item) => {
            let isSelected = values[tipo]?.find((dato) => dato === item.id)
            item.selected = isSelected ? true : false;
            return item;
        })
        let selected = checkBoxList.filter((item) => item.selected);
        setData(checkBoxList);
        setDataSelected(selected);
        if (selected.length === checkBoxList.length) setAllSelected(true);

    }, [])

    const handleSelected = (id, index, add) => {
        let isSelected = data.find((item) => item.id === id)
        let idx = dataSelected.indexOf(isSelected)
        let newData = [...data]
        newData[index].selected = add;
        setData(newData)
        if (add) {
            dataSelected.push(isSelected)
        } else {
            if (idx !== -1) {
                dataSelected.splice(idx, 1)
                setDataSelected(dataSelected)
            }
        }
    }

    const handleSelectedAll = (addAll) => {
        setAllSelected(addAll);
        data.forEach((item, index) => {
            handleSelected(item.id, index, addAll);
        })
    }

    const handleChangeSearch = (selected) => {
        if (typeof selected === 'string' && selected !== '') {
            let search = data.filter((item) => {
                return item.name.toLocaleUpperCase().includes(selected.toLocaleUpperCase())
            });
            setData(search);
        } else if (selected.name) {
            let search = data.filter((item) => {
                return item.name === selected.name
            });
            setData(search)
        } else if (selected === '') {
            setData(dataList)
        }
    }

    const submit = () => {
        if (dataSelected.length === 0) {
            Swal.fire(warning('Debe seleccionar al menos un elemento'))
        } else {
            close(tipo, dataSelected);
        }
    }

    return (
        <Modal
            show={show}
            onHide={close}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdropClassName='backdrop-class'>
            <Modal.Header><h5>Seleccionar {tipo}</h5></Modal.Header>
            <Modal.Body className="modal-body-height">
                <div>
                    <input type="text" className="form-control mb-2" placeholder="Buscar..." onChange={(event) => handleChangeSearch(event.target.value)} />
                </div>
                <div className="selector">
                    <ul className="list-group">
                    <li className="list-group-item selector-li">
                                <label htmlFor='all' className="w-100">
                                    <input type="checkbox" id='all' checked={allSelected} onChange={(event) => handleSelectedAll(event.currentTarget.checked)} className="me-1" />
                                    Todas</label>
                            </li>
                        {data.length > 0 ? data.map((item, index) => {
                            return (<li className="list-group-item selector-li" key={index}>
                                <label htmlFor={item.id} className="w-100">
                                    <input type="checkbox" id={item.id} checked={item.selected} onChange={(event) => handleSelected(item.id, index, event.currentTarget.checked)} className="me-1" />
                                    {item.name}</label>
                            </li>)
                        })
                            : <></>
                        }
                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="submit" className="btn btn-primary" onClick={() => submit()}>Aplicar selección</button>
            </Modal.Footer>
        </Modal>
    )
}

export default Selector