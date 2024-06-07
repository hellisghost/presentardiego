import { pool } from "../database/conexion.js";

export const listarcliente = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM cliente');
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                "mensaje": "No se pudo listar, hay un error"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": "Error en el servidor listar: " + error
        });
    }
};

export const crearcliente = async (req, res) => {
    try {
        const { nombre, producto, precio } = req.body;
        const [resultado] = await pool.query("INSERT INTO cliente (nombre, producto, precio) VALUES (?, ?, ?)", [nombre, producto, precio]);
        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Cliente creado con éxito"
            });
        } else {
            res.status(400).json({
                "mensaje": "Hay un error, no se pudo guardar"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": "Error en servidor crear: " + error
        });
    }
};

export const actualizarcliente = async (req, res) => {
    try {
        const { cedulacliente } = req.params;
        const { nombre, producto, precio } = req.body;
        const [oldUser] = await pool.query("SELECT * FROM cliente WHERE cedulacliente = ?", [cedulacliente]);
        if (!oldUser.length) {
            return res.status(404).json({
                "mensaje": "Cliente no encontrado"
            });
        }
        const nuevosDatos = {
            nombre: nombre || oldUser[0].nombre,
            producto: producto || oldUser[0].producto,
            precio: precio || oldUser[0].precio,
        };
        const [resultado] = await pool.query("UPDATE cliente SET ? WHERE cedulacliente = ?", [nuevosDatos, cedulacliente]);
        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "El cliente ha sido actualizado"
            });
        } else {
            res.status(500).json({
                "mensaje": "No se pudo actualizar el cliente"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": "El servidor falló al actualizar: " + error.message
        });
    }
};

export const mostarcliente = async (req, res) => {
    try {
        const { cedulacliente } = req.params;
        const [resultado] = await pool.query("SELECT * FROM cliente WHERE cedulacliente = ?", [cedulacliente]);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(400).json({
                "mensaje": "No se encontró ese cliente con ese ID"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
};

export const eliminarcliente = async (req, res) => {
    try {
        const { cedulacliente } = req.params;
        const [resultado] = await pool.query("DELETE FROM cliente WHERE cedulacliente = ?", [cedulacliente]);
        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Haz eliminado con éxito al cliente"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró el cliente con ese ID y no se pudo eliminar"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
};
