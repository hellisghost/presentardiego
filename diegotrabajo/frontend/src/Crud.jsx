import React, { useEffect, useState } from "react";
import axios from "axios";
import './crud.css'; // Agrega un archivo CSS para estilos personalizados

function Crud() {
    const [clientes, setClientes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [registroModalOpen, setRegistroModalOpen] = useState(false);
    const [clienteEditar, setClienteEditar] = useState(null);
    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: "",
        producto: "",
        precio: "",
    });

    useEffect(() => {
        listarClientes();
    }, []);

    function listarClientes() {
        axios.get("http://localhost:3000/listar")
            .then((response) => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.error("Error al listar clientes:", error);
            });
    }

    function toggleModal() {
        setModalOpen(!modalOpen);
    }

    function toggleRegistroModal() {
        setRegistroModalOpen(!registroModalOpen);
    }

    function editarCliente(cliente) {
        setClienteEditar(cliente);
        toggleModal();
    }

    function actualizarCliente(e) {
        e.preventDefault();
        axios.put(`http://localhost:3000/actualizar/${clienteEditar.cedulacliente}`, clienteEditar)
            .then((response) => {
                alert("Cliente actualizado:", response.data);
                listarClientes();
                toggleModal();
            })
            .catch((error) => {
                console.error("Error al actualizar cliente:", error);
            });
    }

    function eliminarCliente(cedulacliente) {
        axios.delete(`http://localhost:3000/eliminar/${cedulacliente}`)
            .then((response) => {
                alert("Eliminado con éxito");
                listarClientes();
            })
            .catch((error) => {
                console.error("Error al eliminar cliente:", error);
            });
    }

    function registrarCliente(e) {
        e.preventDefault();
        axios.post("http://localhost:3000/crear", nuevoCliente)
            .then((response) => {
                alert("Cliente registrado:", response.data);
                listarClientes();
                toggleRegistroModal();
            })
            .catch((error) => {
                console.error("Error al registrar cliente:", error);
            });
    }

    return (
        <div className="container">
            <h1 className="text-center">CRUD de Cliente</h1>
            <div className="buttons">
                <button type="button" className="btn btn-success" onClick={toggleRegistroModal} style={{ marginBottom: "20px", marginLeft: "20px" }}>
                    Registrar Cliente
                </button>
            </div>
            <div className="table-responsive">
                <h2 className="text-center mb-4">Nuestra Lista de Clientes</h2>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID Cliente</th>
                            <th>Nombres</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.cedulacliente}>
                                <td>{cliente.cedulacliente}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.producto}</td>
                                <td>{cliente.precio}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={() => editarCliente(cliente)}
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => eliminarCliente(cliente.cedulacliente)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalOpen && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Cliente</h5>
                                <button type="button" className="close" aria-label="Close" onClick={toggleModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={actualizarCliente}>
                                    <label>Nombres:</label>
                                    <input type="text" className="form-control" value={clienteEditar.nombre} onChange={(e) => setClienteEditar({ ...clienteEditar, nombre: e.target.value })} />
                                    <label>Producto:</label>
                                    <input type="text" className="form-control" value={clienteEditar.producto} onChange={(e) => setClienteEditar({ ...clienteEditar, producto: e.target.value })} />
                                    <label>Precio:</label>
                                    <input type="text" className="form-control" value={clienteEditar.precio} onChange={(e) => setClienteEditar({ ...clienteEditar, precio: e.target.value })} />
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>Actualizar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {registroModalOpen && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Registrar Cliente</h5>
                                <button type="button" className="close" aria-label="Close" onClick={toggleRegistroModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={registrarCliente}>
                                    <label>Nombres:</label>
                                    <input type="text" className="form-control" value={nuevoCliente.nombre} onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })} />
                                    <label>Producto:</label>
                                    <input type="text" className="form-control" value={nuevoCliente.producto} onChange={(e) => setNuevoCliente({ ...nuevoCliente, producto: e.target.value })} />
                                    <label>Precio:</label>
                                    <input type="text" className="form-control" value={nuevoCliente.precio} onChange={(e) => setNuevoCliente({ ...nuevoCliente, precio: e.target.value })} />
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>Registrar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Crud;
