import { useCallback, useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
// import DataNotFound from "../../../../components/DataNotFound";
import Loader from "../../../../components/Loader";
// import { getPersons } from "../../../../services/adminServices";
// import { getAdminStatus } from "../../../../services/personServices";
import Swal from "sweetalert2";
import { error, confirm, success } from "../../../../components/SwalAlertData";
import { useForm } from "react-hook-form";
import { ValuesRegisterAdminForm } from "../../../../components/RegisterForm/Forms/FormData";
import FormGroup from "../../../../components/RegisterForm/Forms/FormGroup";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { Link, useHistory, useLocation } from "react-router-dom";
import { deleteUserAdmin, getUserAdminById, postCreateUserAdmin, putUpdateUserAdmin, putUpdateUserAdminPassword } from "../../../../services/adminServices";
import * as FaIcon from 'react-icons/fa'

export default function RegisterAdmin() {

    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const userName = localStorage.getItem('userName');
    const action = location.pathname.split('/panel/')[1];
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const editId = params.id;
    const [values, setValues] = useState(ValuesRegisterAdminForm); //Get and set values form
    const [changePassword, setChangePassword] = useState(true);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    // SI EL FORMULARIO ES DE EDICION, BUSCA DATOS DE USUARIo
    useEffect(() => {
        if (action === 'editar' && editId) {
            let data = { user_id: editId }
            getUserData(data);
            setChangePassword(false);
        }
    }, [])


    const getUserData = useCallback((id) => {
        getUserAdminById(id)
            .then(
                (res) => {
                    let user = {
                        id: res.id,
                        username: res.username,
                        password: res.password,
                        confirmPassword: res.password,
                        id_person: 0,
                        id_user_status: 1,
                        id_role: 1,
                        is_admin: 1
                    }
                    // SETEA EN VALUES
                    setValues(user);
                    setPassword(user.password)
                    setConfirmPassword(user.password)
                    // SETEA EN FORM
                    Object.entries(user).forEach(([key, value]) => {
                        setValue(`${key}`, value);
                    })
                }
            )
            .catch(
                (err) => {
                    console.error(err);
                    Swal.fire(error('Error al cargar datos de usuario administrador'))
                    history.push('/admin/panel/listado')
                }
            )
    }, [])

    // set values 
    const handleChange = (e) => {
        if (e.target?.name) {
            let targetName = e.target.name
            setValues({
                ...values,
                [targetName]: e.target?.value,
            }
            );
            // SETVALUE DE REACT FORM SIRVE PARA QUE EL FORM DETECTE LOS CAMBIOS
            setValue(`${targetName}`, e.target.value);
        }
    }
    const handleChangePassword = () => {
        setChangePassword(true);
        setPassword("");;
        setConfirmPassword("");
        // SETVALUE DE REACT FORM SIRVE PARA QUE EL FORM DETECTE LOS CAMBIOS
        setValue('password', "");

    }

    const onPasswordChange = (value) => {
        setPassword(value);
        setValue('password', value)
    }
    const onConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        setValue('confirmPassword', value)
    }
    const buildBody = () => {
        let body = values
        delete body.confirmPassword
        if (action === 'registrar') {
            body.password = password;
            registerNewUserAdmin(body);
        }
        else if (action === 'editar') {
            if (changePassword) {
                body.password = password;
                editUserAdminPassword(body)
            } else {
                delete body.password
                editUserAdmin(body);
            }
        }
    }

    const onSubmit = () => {
        Swal.fire(confirm(`¿Confirma ${action === 'registrar' ? 'registro' : 'edición'} de usuario administrador?`, false)).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                buildBody();
            }
        })
    }

    const registerNewUserAdmin = useCallback((body) => {
        postCreateUserAdmin(body)
            .then((res) => {
                if (res.ok) {
                    return res.text().then(text => {
                        let readeble = JSON.parse(text)
                        if (readeble.status) {
                            Swal.fire(success('Usuario administrador creado'))
                            history.push('/admin/panel/listado')
                        } else {
                            Swal.fire(error('Hubo un error al crear usuario'))
                            throw new Error(text)
                        }
                    })
                }
            })
            .catch((err) => {
                console.error('error', err)
                Swal.fire(error('Hubo un error al crear usuario'))
                setLoading(false)
            })
    }, []);

    const editUserAdmin = useCallback((body) => {
        putUpdateUserAdmin(body)
            .then((res) => {
                if (res.ok) {
                    return res.text().then(text => {
                        let readeble = JSON.parse(text)
                        if (readeble.status) {
                            Swal.fire(success('Usuario administrador editado'))
                            history.push('/admin/panel/listado')
                        } else {
                            Swal.fire(error('Hubo un error al editar usuario'))
                            throw new Error(text)
                        }
                    })
                }
            })
            .catch((err) => {
                console.error('error', err)
                Swal.fire(error('Hubo un error al editar usuario'))
                setLoading(false)
                let data = { user_id: editId }
                getUserData(data)
            })
    }, [])

    const editUserAdminPassword = useCallback((body) => {
        putUpdateUserAdminPassword(body)
            .then((res) => {
                if (res.ok) {
                    return res.text().then(text => {
                        let readeble = JSON.parse(text)
                        if (readeble.status) {
                            Swal.fire(success('Usuario administrador editado'))
                            history.push('/admin/panel/listado')
                        } else {
                            Swal.fire(error('Hubo un error editar usuario'))
                            throw new Error(text)
                        }
                    })
                }
            })
            .catch((err) => {
                console.error('error', err)
                Swal.fire(error('Hubo un error al editar usuario'))
                setLoading(false)
                let data = { user_id: editId }
                getUserData(data)
            })
    }, [])

    const submitDelete = (idUser) => {
        Swal.fire(confirm(`¿Desea eliminar usuario administrador?`, false)).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                let data = { person_id: idUser }
                deleteUser(data);
            }
        })
    }

    const deleteUser = useCallback(
        (idUser) => {
            deleteUserAdmin(idUser)
                .then(
                    (res) => {
                        if (res.ok) {
                            history.push('/admin/panel/listado');
                            Swal.fire(success('El administrador ha sido eliminado'));
                        } else {
                            throw new Error('Hubo un error al eliminar usuario administrador')
                        }
                    }
                )
                .catch(
                    (err) => {
                        console.error(err);
                        Swal.fire(error('Hubo un error al eliminar usuario administrador'));
                        history.push('/admin/panel/listado');
                    }
                )
        }, []
    )

    return (
        <>
            {loading ?
                <Loader isActive={loading}></Loader>
                : <>
                    <Col xs={12} sm={7} lg={5} className="border border-secundary p-3 rounded mb-2 border-opacity-50">
                        <h5 className="text-capitalize">{action} usuario</h5>
                        <Form className="form-group form_register" onSubmit={handleSubmit(() => onSubmit())}>
                            {/* <Col xs={12}>
                                <FormGroup inputType='input' label='Nombre' name='name' value={values.name}
                                    {...register('name', {
                                        required: { value: true, message: "El campo es requerido." }
                                    })}
                                    onChange={handleChange}
                                />
                                {errors.name && <ErrorMessage><p>{errors.name.message}</p></ErrorMessage>}
                            </Col>
                            <Col xs={12}>
                                <FormGroup inputType='input' label='Apellido' name='surname' value={values.surname}
                                    {...register('surname', {
                                        required: { value: true, message: "El campo es requerido." },
                                    })}
                                    onChange={handleChange}
                                />
                                {errors.surname && <ErrorMessage><p>{errors.surname.message}</p></ErrorMessage>}
                            </Col> */}
                            <Col xs={12} sm={6}>
                                <FormGroup inputType='input' label='Nombre de Usuario' name='username' value={values.username}
                                    {...register('username', {
                                        required: { value: true, message: "El campo es requerido." },
                                    })}
                                    onChange={handleChange}
                                />
                                {errors.username && <ErrorMessage><p>{errors.username.message}</p></ErrorMessage>}
                            </Col>
                            {!changePassword &&
                                <Col>
                                    <p className="text-primary mt-2 cursor"
                                        onClick={() => handleChangePassword()} ><FaIcon.FaKey /> Cambiar contraseña
                                    </p>
                                </Col>
                            }
                            {changePassword &&
                                <Col xs={12} sm={6}>
                                    <FormGroup inputType='input' type='password' label='Contraseña' name='password'
                                        value={password}
                                        {...register('password', {
                                            required: { value: true, message: "El campo es requerido." },
                                        })}
                                        onChange={(e) => onPasswordChange(e.target.value)}
                                    />

                                    {errors.password && <ErrorMessage><p>{errors.password.message}</p></ErrorMessage>}
                                </Col>
                            }
                            {changePassword &&
                                <Col xs={12} sm={6} >
                                    <FormGroup inputType='input' type='password' label='Confirmar Contraseña' name='confirmPassword'
                                        value={confirmPassword}
                                        {...register('confirmPassword', {
                                            validate: (value) => value === getValues("password") || 'Las contraseñas no coinciden'
                                        })}
                                        onChange={(e) => onConfirmPasswordChange(e.target.value)}
                                    />
                                    {errors.confirmPassword && <ErrorMessage><p>{errors.confirmPassword.message}</p></ErrorMessage>}
                                </Col>
                            }
                            {/* <Col>
                                <FormGroup inputType='radio' label='Activo' name='status' value={values.status} type='radio'
                                    onChange={handleChange}
                                />
                            </Col> */}
                            <Col xs={12} className="my-3">
                                <div className="d-flex w-100 justify-content-end align-items-center">
                                    {values.username && action === 'editar' && values.username !== userName &&
                                        <Button variant="danger" type="button" className="text-capitalize me-3" onClick={() => { submitDelete(values.id) }}>Eliminar</Button>
                                    }
                                    <Link to="/admin/panel/listado">
                                        <button className='btn btn-secondary me-3'>Cancelar</button>
                                    </Link>
                                    <Button variant="primary" type="submit" className="text-capitalize">{action}</Button>
                                </div>
                            </Col>
                        </Form>
                    </Col>
                </>
            }
        </>
    )
}
