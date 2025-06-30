import React, { useState, useEffect } from 'react';
import { X, Ship } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface ShipModalProps {
  ship?: any;
  onClose: () => void;
}

const ShipModal: React.FC<ShipModalProps> = ({ ship, onClose }) => {
  const { addShip, updateShip } = useData();
  const [formData, setFormData] = useState({
    name: '',
    imo: '',
    flag: '',
    status: 'Active' as const,
    type: '',
    yearBuilt: '',
    lastInspection: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (ship) {
      setFormData({
        name: ship.name || '',
        imo: ship.imo || '',
        flag: ship.flag || '',
        status: ship.status || 'Active',
        type: ship.type || '',
        yearBuilt: ship.yearBuilt ? ship.yearBuilt.toString() : '',
        lastInspection: ship.lastInspection || ''
      });
    }
  }, [ship]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ship name is required';
    }

    if (!formData.imo.trim()) {
      newErrors.imo = 'IMO number is required';
    } else if (!/^\d{7}$/.test(formData.imo)) {
      newErrors.imo = 'IMO number must be 7 digits';
    }

    if (!formData.flag.trim()) {
      newErrors.flag = 'Flag state is required';
    }

    if (formData.yearBuilt && (isNaN(Number(formData.yearBuilt)) || Number(formData.yearBuilt) < 1800 || Number(formData.yearBuilt) > new Date().getFullYear())) {
      newErrors.yearBuilt = 'Please enter a valid year';
    }

    if (formData.lastInspection && new Date(formData.lastInspection) > new Date()) {
      newErrors.lastInspection = 'Last inspection date cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const shipData = {
      ...formData,
      yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : undefined
    };

    if (ship) {
      updateShip(ship.id, shipData);
    } else {
      addShip(shipData);
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
              <Ship size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-header text-display-md text-gray-900 dark:text-white">
              {ship ? 'Edit Ship' : 'Add New Ship'}
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
              Ship Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'form-input-error' : ''}`}
              placeholder="Enter ship name"
            />
            {errors.name && <p className="form-error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="imo" className="form-label form-label-required">
              IMO Number
            </label>
            <input
              type="text"
              id="imo"
              name="imo"
              value={formData.imo}
              onChange={handleChange}
              className={`form-input font-technical ${errors.imo ? 'form-input-error' : ''}`}
              placeholder="7-digit IMO number"
              maxLength={7}
            />
            {errors.imo && <p className="form-error-message">{errors.imo}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="flag" className="form-label form-label-required">
              Flag State
            </label>
            <input
              type="text"
              id="flag"
              name="flag"
              value={formData.flag}
              onChange={handleChange}
              className={`form-input ${errors.flag ? 'form-input-error' : ''}`}
              placeholder="Country of registration"
            />
            {errors.flag && <p className="form-error-message">{errors.flag}</p>}
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
              <option value="Active">Active</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Docked">Docked</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Ship Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Container Ship, Tanker, etc."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="yearBuilt" className="form-label">
                Year Built
              </label>
              <input
                type="number"
                id="yearBuilt"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleChange}
                className={`form-input font-numeric ${errors.yearBuilt ? 'form-input-error' : ''}`}
                placeholder="Year"
                min="1800"
                max={new Date().getFullYear()}
              />
              {errors.yearBuilt && <p className="form-error-message">{errors.yearBuilt}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="lastInspection" className="form-label">
                Last Inspection Date
              </label>
              <input
                type="date"
                id="lastInspection"
                name="lastInspection"
                value={formData.lastInspection}
                onChange={handleChange}
                className={`form-input font-temporal ${errors.lastInspection ? 'form-input-error' : ''}`}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.lastInspection && <p className="form-error-message">{errors.lastInspection}</p>}
            </div>
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
              {ship ? 'Update Ship' : 'Add Ship'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipModal;