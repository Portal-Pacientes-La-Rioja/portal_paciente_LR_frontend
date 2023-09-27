import { useEffect, useState, useCallback } from "react";
import { getEspecialidadesAll, getInstitutionsAll, getServiciosAll } from '../../../../services/institutionsServices'
import Loader from '../../../../components/Loader'
import DataNotFound from "../../../../components/DataNotFound";
import Swal from "sweetalert2";
import { error } from "../../../../components/SwalAlertData";
import { Col, Row } from "react-bootstrap";
import AutocompleteComponent from "../../../../components/AutocompleteComponent";
import Paginador from "../../../../components/Paginador";
import InstitutionCard from "../components/InstitutionCard";
import SelectType from "../../../../components/SelectType";
import { variantsDepartment } from "../../../../components/ComponentsData";


export default function CentrosMedicos() {


    const [loading, setLoading] = useState(true);
    const [establecimientos, setEstablecimientos] = useState([]);
    const [data, setData] = useState([]);
    const itemsPagina = 10
    const [resetPaginator, setResetPaginator] = useState(false);
    const variantsSearch = [
        { id: "1", name: 'Buscar por Nombre de establecimiento' },
        { id: "2", name: 'Buscar por Departamento' },
        { id: "3", name: 'Buscar por Especialidad' },
        { id: "4", name: 'Buscar por Servicio' }
    ]
    const [selectedVariant, setSelectedVariant] = useState("1");
    const [variants, setVariants] = useState([]);
    const [services, setServices] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);

    const getData = useCallback(
        () => {
            getInstitutionsAll()
                .then((res) => {
                    if (res) {
                        setEstablecimientos(res);
                        setLoading(false)
                        setVariants(res);
                        return establecimientos
                    }
                })
                .catch((err) => {
                    console.error(err)
                    Swal.fire(error('Error al cargar los estableciemientos'))
                    setLoading(false)
                })
        },
        [establecimientos],
    )

    const getEspecialidades = useCallback(
        () => {
            getEspecialidadesAll()
                .then((res) => {
                    let ordenado = res.sort((a, b) => {
                        if (a.name === b.name) { return 0; }
                        if (a.name < b.name) { return -1; }
                        return 1;
                    });
                    return ordenado
                })
                .then((res) => {
                    if (res?.length > 0) {
                        let addIdArray = res.map((item) => {
                            item.id = parseInt(item.codigo)
                            return item
                        })
                        setEspecialidades(addIdArray);
                    }
                })
                .catch((err) => { console.error(err) })
        },
        [],
    )

    const getServicios = useCallback(
        () => {
            getServiciosAll()
                .then((res) => {
                    let ordenado = res.sort((a, b) => {
                        if (a.name === b.name) { return 0; }
                        if (a.name < b.name) { return -1; }
                        return 1;
                    });
                    return ordenado
                })
                .then((res) => {
                    if (res?.length > 0) setServices(res);
                })
                .catch((err) => { console.error(err) })
        },
        [],
    )

    const getDepartamentos = () => {
        setDepartamentos(variantsDepartment)
    }

    const handlePagination = (elementosEnPaginaActual) => {
        setData(elementosEnPaginaActual);
        setResetPaginator(false);
    }

    useEffect(() => {
        initData()
    }, [])

    const initData = () => {
        setLoading(true)
        getData()
        getEspecialidades()
        getServicios()
        getDepartamentos()
    }

    const handleChangeSearch = (selected) => {
        let variant
        if (selectedVariant === "1") variant = 'name'
        if (selectedVariant === "2") variant = 'departamento'
        if (selectedVariant === "3") variant = 'especialidades'
        if (selectedVariant === "4") variant = 'services'

        if (typeof selected === 'string' && selected !== '') {
            // BUSCA SI EL VALOR INGRESADO ES UN STRING 
            let value = selected.toLowerCase()
            let search
            if (variant === 'name' || variant === 'departamento') {
                search = establecimientos.filter(item => item[variant].toLowerCase().includes(value));
            } else {
                search = establecimientos.filter(item => {
                    let searchVariants = item[variant].filter(obj => obj.name.toLowerCase().includes(value))
                    if (searchVariants.length > 0) return item
                    else return false
                });
            }
            setData(search);
        } else if (selected.name) {
            // BUSCA SI EL VALOR INGRESADO ES UN OBJETO  
            let search
            if (variant === 'name' || variant === 'departamento') {
                search = establecimientos.filter(item => item[variant].toLowerCase() === selected.name.toLowerCase());
            } else {
                search = establecimientos.filter((item) => {
                    let searchVariants = item[variant].filter((obj) => {
                        return obj.name.toLowerCase() === selected.name.toLowerCase()
                    })
                    if (searchVariants.length > 0) return item
                    else return false
                });
            }
            setData(search)
        }

        else if (selected === '') {
            // BUSCA SI EL INPUT ESTÁ VACIO YA SEA POR BORRADO MANUAL O POR BOTTON DE BORRAR O AL INICIALIZAR BUSQUEDA
            setResetPaginator(true)
        }
    }

    const handleVariants = (event) => {
        let variant = event.target.value

        setSelectedVariant(variant)
        if (variant === "1") setVariants(establecimientos)
        if (variant === "2") setVariants(departamentos)
        if (variant === "3") setVariants(especialidades)
        if (variant === "4") setVariants(services)
    }


    return (
        <Row className="d-flex flex-wrap-reverse">
            {loading
                ? <Loader isActive={loading} />
                : <Col xs={12} lg={8} className='in'>
                    {data.length > 0 && data.map((establecimiento, index) => {
                        return (
                            <InstitutionCard key={index} institution={establecimiento} />
                        )
                    })}
                    {data.length === 0 && <DataNotFound text="establecimientos"></DataNotFound>}
                    {establecimientos.length > 0 && <Paginador datos={establecimientos} elementosPorPagina={itemsPagina} handlePagination={handlePagination} reset={resetPaginator} showItems={false}></Paginador>}
                </Col>
            }
            {!loading &&
                <Col xs={12} lg={4} className="ms-auto p-3 in">
                    <Row className="mb-2" style={{ position: 'sticky', top: '8rem' }}>
                        <Col className="select-institution">
                            <SelectType
                                name='select'
                                variants={variantsSearch}
                                selectValue={selectedVariant}
                                handleChange={handleVariants}
                            />
                        </Col>
                    </Row>
                    <Row style={{ position: 'sticky', top: '11rem' }}>
                        <Col>
                            <AutocompleteComponent
                                variants={variants}
                                handleChange={handleChangeSearch}
                            />
                        </Col>
                    </Row>
                </Col>
            }
        </Row>
    )
}
