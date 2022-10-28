import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';

function TaskItem({ task, deleteTask }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/api/tasks/${task._id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      toast.success('Task updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <td className="py-4 px-6">
        <div className="flex items-center mb-4" onChange={handleCheckboxClick} role="checkbox" aria-checked>
          <input className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={isCompleted} disabled={isLoading} readOnly tabIndex={-1} />
        </div>
      </td>
      <td className="py-4 px-6">
        <p>{task.title}</p>
      </td>
      <td className="py-4 px-6">{isCompleted ? 'Complete' : 'Incomplete'}</td>
      <td className="py-4 px-6">{moment(task.createdAt).format('MMM Do YY')}</td>
      <td className="py-4 px-6">
        <button
          type="button"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
