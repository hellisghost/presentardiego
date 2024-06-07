import { Router } from "express";
import { actualizarcliente, crearcliente, eliminarcliente, listarcliente, mostarcliente } from "../controller/usuario.controller.js";

const router = Router();

router.get("/listar", listarcliente);
router.post("/crear", crearcliente);
router.put("/actualizar/:cedulacliente", actualizarcliente);
router.get("/listar/:cedulacliente", mostarcliente);
router.delete("/eliminar/:cedulacliente", eliminarcliente);

export default router;
