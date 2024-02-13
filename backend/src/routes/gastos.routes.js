import Router from "express-promise-router";
import {
  actualizarGasto,
  createGasto,
  eliminarGasto,
  getGasto,
  getGastos,
  getGastosDelMes,
} from "../controllers/gastos.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { updatePerfilSchema } from "../schemas/productos.schema.js";

const router = Router();

router.get("/gastos", isAuth, getGastos);

router.get("/gastos/mes", isAuth, getGastosDelMes);

router.get("/gastos/:id", isAuth, getGasto);

router.post("/gastos", isAuth, createGasto);

router.put(
  "/gastos/:id",
  isAuth,
  validateSchema(updatePerfilSchema),
  actualizarGasto
);

router.delete("/gastos/:id", isAuth, eliminarGasto);

export default router;
