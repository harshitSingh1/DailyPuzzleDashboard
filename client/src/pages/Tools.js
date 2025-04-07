// client\src\pages\Tools.js
import { useState, useEffect } from 'react';
import ToolForm from '../components/ToolForm';
import ToolList from '../components/ToolList';
import { getTools, createTool, deleteTool, updateTool } from '../api';

const Tools = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const { data } = await getTools();
      setTools(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTool = async (tool) => {
    try {
      await createTool(tool);
      fetchTools();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTool(id);
      fetchTools();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, updatedTool) => {
    try {
      await updateTool(id, updatedTool);
      fetchTools();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <h1>Tools Management</h1>
      <ToolForm onSubmit={handleAddTool} />
      <ToolList 
        tools={tools} 
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Tools;

