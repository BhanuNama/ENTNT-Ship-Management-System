import React, { useState, useEffect } from 'react';
import { X, ClipboardList } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface JobModalProps {
  job?: any;
  shipId?: string;
  componentId?: string;
  onClose: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, shipId, componentId, onClose }) => {
  const { addJob, updateJob, ships, components, users } = useData();
  const [formData, setFormData] = useState({
    shipId: shipId || '',
    componentId: componentId || '',
    type: 'Inspection' as const,
    priority: 'Medium' as const,
    status: 'Open' as const,
    assignedEngineerId: '',
    scheduledDate: '',
    description: '',
    estimatedHours: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const engineers = users.filter(u => u.role === 'Engineer');
  const availableComponents = formData.shipId 
    ? components.filter(c => c.shipId === formData.shipId)
    : components;

  useEffect(() => {
    if (job) {
      setFormData({
        shipId: job.shipId || '',
        componentId: job.componentId || '',
        type: job.type || 'Inspection',
        priority: job.priority || 'Medium',
        status: job.status || 'Open',
        assignedEngineerId: job.assignedEngineerId || '',
        scheduledDate: job.scheduledDate || '',
        description: job.description || '',
        estimatedHours: job.estimatedHours ? job.estimatedHours.toString() : ''
      });
    }
  }, [job]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.shipId) {
      newErrors.shipId = 'Ship is required';
    }

    if (!formData.componentId) {
      newErrors.componentId = 'Component is required';
    }

    if (!formData.assignedEngineerId) {
      newErrors.assignedEngineerId = 'Assigned engineer is required';
    }

    if (!formData.scheduledDate) {
      newErrors.scheduledDate = 'Scheduled date is required';
    }

    if (formData.estimatedHours && (isNaN(Number(formData.estimatedHours)) || Number(formData.estimatedHours) <= 0)) {
      newErrors.estimatedHours = 'Please enter a valid number of hours';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const jobData = {
      ...formData,
      estimatedHours: formData.estimatedHours ? Number(formData.estimatedHours) : undefined
    };

    if (job) {
      updateJob(job.id, jobData);
    } else {
      addJob(jobData);
    }

    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear component selection if ship changes
    if (name === 'shipId' && value !== formData.shipId) {
      setFormData(prev => ({ ...prev, shipId: value, componentId: '' }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="modal-container max-w-2xl">
        <div className="modal-header">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mr-3">
              <ClipboardList size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-header text-display-md text-gray-900 dark:text-white">
              {job ? 'Edit Job' : 'Create New Job'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="shipId" className="form-label form-label-required">
                Ship
              </label>
              <select
                id="shipId"
                name="shipId"
                value={formData.shipId}
                onChange={handleChange}
                className={`form-select ${errors.shipId ? 'form-input-error' : ''}`}
              >
                <option value="">Select a ship</option>
                {ships.map(ship => (
                  <option key={ship.id} value={ship.id}>{ship.name}</option>
                ))}
              </select>
              {errors.shipId && <p className="form-error-message">{errors.shipId}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="componentId" className="form-label form-label-required">
                Component
              </label>
              <select
                id="componentId"
                name="componentId"
                value={formData.componentId}
                onChange={handleChange}
                className={`form-select ${errors.componentId ? 'form-input-error' : ''}`}
                disabled={!formData.shipId}
              >
                <option value="">Select a component</option>
                {availableComponents.map(component => (
                  <option key={component.id} value={component.id}>{component.name}</option>
                ))}
              </select>
              {errors.componentId && <p className="form-error-message">{errors.componentId}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="type" className="form-label form-label-required">
                Job Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Inspection">Inspection</option>
                <option value="Repair">Repair</option>
                <option value="Replacement">Replacement</option>
                <option value="Preventive">Preventive</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority" className="form-label form-label-required">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status" className="form-label form-label-required">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="assignedEngineerId" className="form-label form-label-required">
                Assigned Engineer
              </label>
              <select
                id="assignedEngineerId"
                name="assignedEngineerId"
                value={formData.assignedEngineerId}
                onChange={handleChange}
                className={`form-select ${errors.assignedEngineerId ? 'form-input-error' : ''}`}
              >
                <option value="">Select an engineer</option>
                {engineers.map(engineer => (
                  <option key={engineer.id} value={engineer.id}>{engineer.name}</option>
                ))}
              </select>
              {errors.assignedEngineerId && <p className="form-error-message">{errors.assignedEngineerId}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="scheduledDate" className="form-label form-label-required">
                Scheduled Date
              </label>
              <input
                type="date"
                id="scheduledDate"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                className={`form-input font-temporal ${errors.scheduledDate ? 'form-input-error' : ''}`}
              />
              {errors.scheduledDate && <p className="form-error-message">{errors.scheduledDate}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="estimatedHours" className="form-label">
                Estimated Hours
              </label>
              <input
                type="number"
                id="estimatedHours"
                name="estimatedHours"
                value={formData.estimatedHours}
                onChange={handleChange}
                className={`form-input font-numeric ${errors.estimatedHours ? 'form-input-error' : ''}`}
                placeholder="Hours"
                min="0"
                step="0.5"
              />
              {errors.estimatedHours && <p className="form-error-message">{errors.estimatedHours}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="form-textarea"
              placeholder="Job description and notes..."
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {job ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;