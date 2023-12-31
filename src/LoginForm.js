import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import "./LoginForm.css";

/** Login form
 *
 * Shows form and manages state update on change
 *
 * Props: login function passed from parent
 *
 * State: formData
 *
 * RouteList --> LoginForm
 */

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  /** Update form */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Redirect to home page on form close */

  function handleCloseClick() {
    navigate("/");
  }

  /** Call parent function to filter */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (errs) {
      setFormErrors(errs);
    }
  }

  return (
    <div className="LoginForm">
      <div className="overlay"></div>
      <div className="container col-sm-6 col-md-6 offset-md-3 col-lg-4 offset-lg-4">

        <div className="card LoginForm-card">
        <button className="LoginForm-close" onClick={handleCloseClick}>X</button>
          <div className="card-body mt-2">

          <h4 className="mb-2 LoginForm-h4">Log In</h4>
            <form className="LoginForm-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;;