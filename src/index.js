import express from "express";
import tasksRoutes from "./src/routes/tasks.routes.js";

const app = express();

app.use(express.json()); // Para leer JSON
app.use(tasksRoutes);    // Registrar rutas

app.get("/", (req, res) => {
  res.send("API funcionando con Prisma");
});

app.listen(3000, () => {
  console.log("Servidor listo en puerto 3000");
});
