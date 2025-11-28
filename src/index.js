import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import tasksRoutes from "./src/routes/tasks.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: "*", // Cambiar por el front real
    credentials: true,
  })
);

const tasksLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 60, // Máximo 60 requests por minuto
});

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5,
  message: {
    error: "Too many login attempts, please try again later",
  },
});

app.use(express.json()); // Para leer JSON
app.use("/tasks", tasksLimiter, tasksRoutes); // Registrar rutas
app.use("/auth", authLimiter, authRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando con Prisma");
});

app.listen(3000, () => {
  console.log("Servidor listo en puerto 3000");
});
