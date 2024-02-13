import { pool } from "../db.js";

export const getGastos = async (req, res, next) => {
  //obtener perfiles
  const result = await pool.query(
    "SELECT * FROM productos WHERE user_id = $1",
    [req.userId]
  );
  return res.json(result.rows);
};

export const getGasto = async (req, res) => {
  const result = await pool.query("SELECT * FROM productos WHERE id = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe ningun gasto con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const createGasto = async (req, res, next) => {
  const { detalle, tipo, numero, total } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO productos (detalle, tipo , numero, total, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [detalle, tipo, numero, total, req.userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe un gasto con ese nombre",
      });
    }
    next(error);
  }
};

export const actualizarGasto = async (req, res) => {
  const id = req.params.id;
  const { detalle, tipo, numero, total } = req.body;

  const result = await pool.query(
    "UPDATE productos SET detalle = $1, tipo = $2 ,numero = $3, total = $4 WHERE id = $5",
    [detalle, tipo, numero, total, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un gasto con ese id",
    });
  }

  return res.json({
    message: "gasto actualizado",
  });
};

export const eliminarGasto = async (req, res) => {
  const result = await pool.query("DELETE FROM productos WHERE id = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe ningun gasto con ese id",
    });
  }

  return res.sendStatus(204);
};

export const getGastosDelMes = async (req, res, next) => {
  // Obtener la fecha de inicio y fin del mes actual
  const fechaInicioMes = new Date();
  fechaInicioMes.setDate(1);
  fechaInicioMes.setHours(0, 0, 0, 0);

  const fechaFinMes = new Date();
  fechaFinMes.setMonth(fechaFinMes.getMonth() + 1, 0);
  fechaFinMes.setHours(23, 59, 59, 999);

  // Consulta SQL para obtener los gastos del mes actual
  const result = await pool.query(
    "SELECT * FROM productos WHERE user_id = $1 AND created_at BETWEEN $2 AND $3",
    [req.userId, fechaInicioMes, fechaFinMes]
  );

  return res.json(result.rows);
};
