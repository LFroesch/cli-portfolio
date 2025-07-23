import { useState } from 'react';
import apiService from '../services/api';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear status when user starts typing
    if (status.isError || status.isSuccess) {
      setStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: false,
        message: ''
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.subject.trim()) errors.push('Subject is required');
    if (!formData.message.trim()) errors.push('Message is required');
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (formData.name.length > 100) errors.push('Name must be less than 100 characters');
    if (formData.subject.length > 200) errors.push('Subject must be less than 200 characters');
    if (formData.message.length > 2000) errors.push('Message must be less than 2000 characters');
    
    return errors;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: validationErrors.join(', ')
      });
      return;
    }

    setStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: 'Sending your message...'
    });

    try {
      const response = await apiService.sendContactMessage(formData);
      
      if (response.success) {
        setStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: response.message || 'Message sent successfully! I\'ll get back to you soon.'
        });
        resetForm();
      } else {
        throw new Error(response.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: error.message || 'Failed to send message. Please try again.'
      });
    }
  };

  return {
    formData,
    status,
    handleInputChange,
    submitForm,
    resetForm
  };
};