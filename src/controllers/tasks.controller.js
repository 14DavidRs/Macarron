import prisma from "../prismaClient.js";

// GET /tasks (solo tareas del usuario logueado)
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id }
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving tasks" });
  }
};

// POST /tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId: req.user.id  // Asociar al usuario autenticado
      }
    });

    res.status(201).json(newTask);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating task" });
  }
};

// PUT /tasks/:id
export const updateTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validar que la tarea pertenezca al usuario
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task || task.userId !== req.user.id) {
      return res.status(403).json({ error: "Not allowed to update this task" });
    }

    const { title, description, status } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, status }
    });

    res.json(updatedTask);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating task" });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({ where: { id } });

    if (!task || task.userId !== req.user.id) {
      return res.status(403).json({ error: "Not allowed to delete this task" });
    }

    await prisma.task.delete({ where: { id } });

    res.json({ message: "Task deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting task" });
  }
};
