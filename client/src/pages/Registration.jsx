
import React, { useState } from "react";
import { Alert, Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    batch: "",
    contact: "",
    email: "",
    linkedin: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.batch.trim()) newErrors.batch = "Batch is required";
    const contactRegex = /^[0-9]{10}$/;
    if (!formData.contact.trim()) newErrors.contact = "Contact number is required";
    else if (!contactRegex.test(formData.contact)) newErrors.contact = "Invalid contact number";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }

    if (errors.image) setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const form = new FormData();
    form.append("name", formData.name);
    form.append("batch", formData.batch);
    form.append("contact", formData.contact);
    form.append("email", formData.email);
    form.append("linkedin", formData.linkedin || "");
    form.append("image", formData.image);

    try {
      const response = await fetch("http://your-server-endpoint/register", {
        method: "POST",
        body: form,
      });

      if (!response.ok) throw new Error("Registration failed");

      setMessage({ type: "success", text: "Registration successful!" });
      setFormData({
        name: "",
        batch: "",
        contact: "",
        email: "",
        linkedin: "",
        image: null,
      });
      setPreviewImage(null);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to register. Please try again." });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg" style={{ backgroundColor: "#101010", borderColor: "#444" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#fff" }}>Registration Form</h2>

              {message && (
                <Alert variant={message.type === "success" ? "success" : "danger"} className="text-center">
                  {message.text}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label style={{ color: "#c0c0c0" }}>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    style={{ backgroundColor: "#333", color: "#fff", borderColor: "#555" }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="batch" className="mb-3">
                  <Form.Label style={{ color: "#c0c0c0" }}>Batch</Form.Label>
                  <Form.Control
                    type="text"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    isInvalid={!!errors.batch}
                    style={{ backgroundColor: "#333", color: "#fff", borderColor: "#555" }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.batch}</Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="contact" className="mb-3">
                      <Form.Label style={{ color: "#c0c0c0" }}>Contact</Form.Label>
                      <Form.Control
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        isInvalid={!!errors.contact}
                        style={{ backgroundColor: "#333", color: "#fff", borderColor: "#555" }}
                      />
                      <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="email" className="mb-3">
                      <Form.Label style={{ color: "#c0c0c0" }}>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        style={{ backgroundColor: "#333", color: "#fff", borderColor: "#555" }}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="linkedin" className="mb-3">
                  <Form.Label style={{ color: "#c0c0c0" }}>LinkedIn URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    isInvalid={!!errors.linkedin}
                    style={{ backgroundColor: "#333", color: "#fff", borderColor: "#555" }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.linkedin}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="image" className="mb-3">
                  <Form.Label style={{ color: "#c0c0c0" }}>Transaction Screenshot</Form.Label>
                  <div>
                    <img src="https://picsum.photos/300/300" alt="Preview" 
                    width={300} />
                    <p style={{ color: "#c0c0c0" }}>
                      THE PAYMENT per person is 15000
                      <br />
                      For each additional person, the payment is 5000
                    </p>
                  </div>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    isInvalid={!!errors.image}
                    style={{ backgroundColor: "#333", color: "#fff", borderColor: "#555" }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                </Form.Group>

                {previewImage && (
                  <div className="mb-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="img-fluid rounded"
                      style={{ maxWidth: "150px" }}
                    />
                  </div>
                )}

                <Button variant="secondary" type="submit" className="w-100" style={{ backgroundColor: "#555", borderColor: "#444" }}>
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;

