import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/taskApi";

function TaskList() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getAllTasks();
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    return (
        <div>
            <h2>Tasks</h2>

            {tasks.map((task) => (
                <div key={task.id}>
                    <p>{task.title}</p>
                </div>
            ))}
        </div>
    );
}

export default TaskList;