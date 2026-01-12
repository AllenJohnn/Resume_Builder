import React from 'react';
import { ProjectItem } from '../../types/resume';

interface ProjectsFormProps {
  data: ProjectItem[];
  onChange: (data: ProjectItem[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const addProject = () => {
    const newProject: ProjectItem = {
      id: Date.now().toString(),
      title: '',
      description: '',
      points: [''],
      technologies: ['']
    };
    onChange([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof ProjectItem, value: any) => {
    onChange(
      data.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  const removeProject = (id: string) => {
    onChange(data.filter(proj => proj.id !== id));
  };

  const updatePoint = (projectId: string, pointIndex: number, value: string) => {
    const project = data.find(p => p.id === projectId);
    if (!project) return;

    const newPoints = [...project.points];
    newPoints[pointIndex] = value;
    
    while (newPoints.length > 1 && newPoints[newPoints.length - 1] === '') {
      newPoints.pop();
    }
    
    updateProject(projectId, 'points', newPoints);
  };

  const addPoint = (projectId: string) => {
    const project = data.find(p => p.id === projectId);
    if (!project) return;
    
    updateProject(projectId, 'points', [...project.points, '']);
  };

  const updateTechnology = (projectId: string, techIndex: number, value: string) => {
    const project = data.find(p => p.id === projectId);
    if (!project) return;

    const newTechs = [...project.technologies];
    newTechs[techIndex] = value;
    
    while (newTechs.length > 1 && newTechs[newTechs.length - 1] === '') {
      newTechs.pop();
    }
    
    updateProject(projectId, 'technologies', newTechs);
  };

  const addTechnology = (projectId: string) => {
    const project = data.find(p => p.id === projectId);
    if (!project) return;
    
    updateProject(projectId, 'technologies', [...project.technologies, '']);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">💼 Projects</h3>
        <button
          onClick={addProject}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      <div className="space-y-6">
        {data.map((project, index) => (
          <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-700">Project #{index + 1}</h4>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., E-commerce Website"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the project..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Key Achievements/Points</label>
                  <button
                    onClick={() => addPoint(project.id)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Point
                  </button>
                </div>
                <div className="space-y-2">
                  {project.points.map((point, pointIndex) => (
                    <input
                      key={pointIndex}
                      type="text"
                      value={point}
                      onChange={(e) => updatePoint(project.id, pointIndex, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Implemented responsive design using React"
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Technologies Used</label>
                  <button
                    onClick={() => addTechnology(project.id)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Technology
                  </button>
                </div>
                <div className="space-y-2">
                  {project.technologies.map((tech, techIndex) => (
                    <input
                      key={techIndex}
                      type="text"
                      value={tech}
                      onChange={(e) => updateTechnology(project.id, techIndex, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., React, Node.js, MongoDB"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;