import Router from "express-promise-router";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { updatePerfilSchema } from "../schemas/productos.schema.js";
import {
  actualizarVenta,
  createVenta,
  eliminarVenta,
  getVenta,
  getVentaDelMes,
  getVentas,
} from "../controllers/ventas.controller.js";

const router = Router();

router.get("/ventas", isAuth, getVentas);

router.get("/ventas/mes", isAuth, getVentaDelMes);

router.get("/ventas/:id", isAuth, getVenta);

router.post("/ventas", isAuth, createVenta);

router.put(
  "/ventas/:id",
  isAuth,
  validateSchema(updatePerfilSchema),
  actualizarVenta
);

router.delete("/ventas/:id", isAuth, eliminarVenta);

export default router;
