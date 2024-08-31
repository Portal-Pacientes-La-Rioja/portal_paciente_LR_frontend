import { useCallback, useEffect, useState } from "react";
import { Col, Table } from "react-bootstrap";
import DataNotFound from "../../../../components/DataNotFound";
import Loader from "../../../../components/Loader";
import Swal from "sweetalert2";
import * as MdIcon from "react-icons/md";
import * as FaIcon from 'react-icons/fa';
import { error } from "../../../../components/SwalAlertData";
import { Link, } from "react-router-dom";
import { getUsersAdminList } from "../../../../services/adminServices";
import AutocompleteComponent from "../../../../components/AutocompleteComponent";

export default function ManageAdmin() {

  const [loading, setLoading] = useState(true);
  const [usersAdmin, setUsersAdmin] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [variants, setVariants] = useState([])

  const getData = useCallback(
    () => {
      getUsersAdminList()
        .then((res) => {
          if (res) {
            let users = res
            setUsersAdmin(users)
            setDataTable(users)
            handleVariants(users)
            setLoading(false)
          } else {
            throw new Error(res)
          }
        })
        .catch((err) => {
          console.log('error', err)
          Swal.fire(error('Hubo un error al cargar usuarios'));
          setLoading(false)
        })
    },
    [],
  )

  const handleVariants = (data) => {
    setVariants(data.map((user) =>{
      return {
        id: user.id,
        name: user.username
      }
    }))
  }

  const handleChangeSearch = (selected) => {
    if (typeof selected === 'string' && selected !== '') {
        let value = selected.toLowerCase()
        let search = usersAdmin.filter((item) => {
            return item.username.toLowerCase().includes(value)
        });
        setDataTable(search);
    } else if (selected.username) {
        let search = usersAdmin.filter((item) => {
            return item.username.toLowerCase() === selected.username.toLowerCase()
        });
        setDataTable(search)
    } else if (selected === '') {
        setDataTable(usersAdmin)
    }
}


  useEffect(() => {
    getData()
  }, []
  )

  return (
    <>
      <Col className="w-100 pr-3 pb-3 d-flex justify-content-end">
        <Col>
          <AutocompleteComponent
            variants={variants}
            handleChange={handleChangeSearch}
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <Link to="/admin/panel/registrar">
            <button className='btn btn-danger'><FaIcon.FaUserPlus className='me-2' style={{ fontSize: '1.5rem' }} />Agregar administrador</button>
          </Link>
        </Col>
      </Col>
      {loading ?
        <Loader isActive={loading}></Loader>
        : <>
          {dataTable.length > 0 ?
            <>
              <Table striped bordered borderless hover>
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Estado</th>
                    <th style={{ width: "20px" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((a, i) => {
                    return (
                      <tr key={i}>
                        <td>{a.username}</td>
                        <td>{a.is_admin_activate ? 'Activo' : 'Inactivo'}</td>
                        <td>
                          <div className="my-tooltip">
                            <Link className="text-dark" to={`/admin/panel/editar?id=${a.id}`} >
                              <button className='btn text-secondary btn-icon'><MdIcon.MdEditNote style={{ fontSize: '1.5rem' }} /></button>
                              <span className="tiptext">
                                Editar
                              </span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </>
            :
            <DataNotFound text="administradores" />
          }
        </>
      }
    </>
  )
}