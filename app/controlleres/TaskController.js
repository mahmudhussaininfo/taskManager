import mongoose from "mongoose";
import Tasks from "../model/TaskModel.js";

//create task
export const createTask = async (req, res) => {
  try {
    const userId = req.headers.user_id;
    const { title, description, status } = req.body;

    // Ensure user_id is set from headers, not req.body
    if (!userId) {
      return res.status(400).json({
        status: "failed",
        message: "User ID is required in headers",
      });
    }

    // Ensure the required fields are present
    if (!title || !description || !status) {
      return res.status(400).json({
        status: "failed",
        message: "Title, description, and status are required",
      });
    }

    const tasks = await Tasks.create({
      title,
      description,
      status,
      user_id: userId,
    });
    return res.status(201).json({
      status: "success",
      message: "task created successfully done",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

//update task
export const updateTask = async (req, res) => {
  try {
    const userId = req.headers.user_id;
    const { id } = req.params;
    const { status } = req.params;

    const tasks = await Tasks.updateOne(
      { _id: id, user_id: userId },
      { status: status }
    );
    return res.status(201).json({
      status: "success",
      message: "task update successfully done",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

//task list by status (search Task list)
export const taskListByStatus = async (req, res) => {
  try {
    const userId = req.headers.user_id;
    const { status } = req.params;

    const tasks = await Tasks.find({ user_id: userId, status: status });

    if (!tasks) {
      return res.status(404).json({
        status: "failed",
        message: "task list not found",
      });
    } else {
      return res.status(201).json({
        status: "success",
        message: "task list done",
        tasks,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

//delete task
export const deleteTask = async (req, res) => {
  try {
    const userId = req.headers.user_id;
    const { id } = req.params;

    const tasks = await Tasks.deleteOne({ _id: id, user_id: userId });

    return res.status(201).json({
      status: "success",
      message: "task delete successfully done",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

//count task
export const countTasks = async (req, res) => {
  try {
    let objectId = mongoose.Types.ObjectId;
    const userId = new objectId(req.headers.user_id);
    const tasks = await Tasks.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: "$status", sum: { $count: {} } } },
    ]);

    return res.status(201).json({
      status: "success",
      message: "task count done",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }

  // Use `countDocuments` for more efficient task counting
  //   try {
  //     let objectId = mongoose.Types.ObjectId;
  //     const userId = new objectId(req.headers.user_id);
  //     const taskCounts = await Tasks.countDocuments({ user_id: userId })
  //       .then((count) => {
  //         return {
  //           status: "success",
  //           message: "Task count done",
  //           taskCounts: {
  //             total: count,
  //             // Add other task count categories if needed
  //           },
  //         };
  //       })
  //       .catch((error) => {
  //         return {
  //           status: "failed",
  //           message: error.message,
  //         };
  //       });

  //     res.status(201).json(taskCounts);
  //   } catch (error) {
  //     res.status(500).json({ status: "failed", message: error.message });
  //   }
};
