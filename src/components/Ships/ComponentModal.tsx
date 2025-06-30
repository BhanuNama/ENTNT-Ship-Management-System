import React, { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface ComponentModalProps {
  component?: any;
  shipId: string;
  onClose: () => void;
}

const ComponentModal: React.FC<ComponentModalProps> = ({ component, shipId, onClose }) => {
  const { addComponent, updateComponent } = useData();
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: '',
    nextMaintenanceDate: '',
    status: 'Good' as const
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (component) {
      setFormData({
        name: component.name || '',
        serialNumber: component.serialNumber || '',
        installDate: component.installDate || '',
        lastMaintenanceDate: component.lastMaintenanceDate || '',
        nextMaintenanceDate: component.nextMaintenanceDate || '',
        status: component.status || 'Good'
      });
    }
  }, [component]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Component name is required';
    }

    if (!formData.serialNumber.trim()) {
      newErrors.serialNumber = 'Serial number is required';
    }

    if (!formData.installDate) {
      newErrors.installDate = 'Installation date is required';
    }

    if (!formData.lastMaintenanceDate) {
      newErrors.lastMaintenanceDate = 'Last maintenance date is required';
    }

    if (formData.installDate && formData.lastMaintenanceDate) {
      if (new Date(formData.lastMaintenanceDate) < new Date(formData.installDate)) {
        newErrors.lastMaintenanceDate = 'Last maintenance date cannot be before installation date';
      }
    }

    if (formData.nextMaintenanceDate && formData.lastMaintenanceDate) {
      if (new Date(formData.nextMaintenanceDate) <= new Date(formData.lastMaintenanceDate)) {
        newErrors.nextMaintenanceDate = 'Next maintenance date must be after last maintenance date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const componentData = {
      ...formData,
      shipId
    };

    if (component) {
      updateComponent(component.id, componentData);
    } else {
      addComponent(componentData);
    }

    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="modal-container">
        <div className="modal-header">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mr-3">
              <Settings size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-header text-display-md text-gray-900 dark:text-white">
              {component ? 'Edit Component' : 'Add New Component'}
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
          <div className="form-group">
            <label htmlFor="name" className="form-label form-label-required">
              Component Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'form-input-error' : ''}`}
              placeholder="e.g., Main Engine, Radar System"
            />
            {errors.name && <p className="form-error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="serialNumber" className="form-label form-label-required">
              Serial Number
            </label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className={`form-input font-technical ${errors.serialNumber ? 'form-input-error' : ''}`}
              placeholder="Component serial number"
            />
            {errors.serialNumber && <p className="form-error-message">{errors.serialNumber}</p>}
          </div>

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
              <option value="Good">Good</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="installDate" className="form-label form-label-required">
                Installation Date
              </label>
              <input
                type="date"
                id="installDate"
                name="installDate"
                value={formData.installDate}
                onChange={handleChange}
                className={`form-input font-temporal ${errors.installDate ? 'form-input-error' : ''}`}
              />
              {errors.installDate && <p className="form-error-message">{errors.installDate}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="lastMaintenanceDate" className="form-label form-label-required">
                Last Maintenance Date
              </label>
              <input
                type="date"
                id="lastMaintenanceDate"
                name="lastMaintenanceDate"
                value={formData.lastMaintenanceDate}
                onChange={handleChange}
                className={`form-input font-temporal ${errors.lastMaintenanceDate ? 'form-input-error' : ''}`}
              />
              {errors.lastMaintenanceDate && <p className="form-error-message">{errors.lastMaintenanceDate}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nextMaintenanceDate" className="form-label">
              Next Maintenance Date
            </label>
            <input
              type="date"
              id="nextMaintenanceDate"
              name="nextMaintenanceDate"
              value={formData.nextMaintenanceDate}
              onChange={handleChange}
              className={`form-input font-temporal ${errors.nextMaintenanceDate ? 'form-input-error' : ''}`}
            />
            {errors.nextMaintenanceDate && <p className="form-error-message">{errors.nextMaintenanceDate}</p>}
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
              {component ? 'Update Component' : 'Add Component'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComponentModal;