import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask } from '../store/slices/todoSlice';
import './Todo.scss'; 

const Todo = () => {
  const dispatch = useDispatch();
  const zones = useSelector((state) => state.zones.value); 
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim() !== '') {
      dispatch(addTask({ text: task }));
      setTask('');
    }
  };

  const handleRemoveTask = (index) => {
    dispatch(removeTask(index));
  };

  return (
    <div className="todo--container">
      <h2 className="title">ToDo </h2>

      <div className="todo-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nouvelle tâche..."
        />
        <button onClick={handleAddTask}>Ajouter</button>
      </div>
      <ul className="task-">
        {zones &&
          zones.map((zone, index) => (
            <li key={index} className="task">
              {zone.name}
              <button onClick={() => handleRemoveTask(index)}>Supprimer</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todo;