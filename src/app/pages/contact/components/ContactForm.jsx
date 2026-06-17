import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form className="flex flex-col gap-5 max-w-xl" onSubmit={handleSubmit}>
      <Input
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Subject"
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <div className="form-group">
        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          id="message"
          className="textarea-field"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        />
      </div>
      <Button variant="primary" type="submit">
        Send Message
      </Button>
    </form>
  );
}
