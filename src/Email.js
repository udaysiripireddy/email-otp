import React from 'react'
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 

function Email() {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        username: '',
        password: '',
        confirmPassword: '',
        otp: ''
      });
    
      const [generatedOtp, setGeneratedOtp] = useState(null);
      const [isVerified, setIsVerified] = useState(false);
      const [showVerifyModal, setShowVerifyModal] = useState(false);
      const [showResendButton, setShowResendButton] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
       const generateOTP = () =>{
        return Math.floor(100000+Math.random()*900000).toString();
    }
      const sendEmail = (e) => {
        e.preventDefault();
        const generatedOtp = generateOTP();
        setGeneratedOtp(generatedOtp);
    
        const templateParams = {
          to_email: formData.email,
          email: formData.email,
          otp: generatedOtp,
        };
    
        emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        ).then(
          (response) => {
            console.log('Email sent successfully:', response);
            setShowVerifyModal(true);
            setShowResendButton(true);
            toast.success(`OTP sent to ${formData.email}!`);
          },
          (error) => {
            console.error('Email sending failed:', error);
            toast.error('Failed to send OTP, please try again.');
          }
        );
      };
    
      const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (formData.otp === generatedOtp) {
          setIsVerified(true);
          toast.success('Email verified successfully!');
          setShowVerifyModal(false);
        } else {
          toast.error('Invalid OTP, please try again.');
        }
      };
    
      const handleResendOtp = () => {
        const generatedOtp = generateOTP();
        setGeneratedOtp(generatedOtp);
    
        const templateParams = {
          to_email: formData.email,
          email: formData.email,
          otp: generatedOtp,
        };
    
        emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        ).then(
          (response) => {
            console.log('Email sent successfully:', response);
            toast.success(`New OTP sent to ${formData.email}!`);
          },
          (error) => {
            console.error('Email sending failed:', error);
            toast.error('Failed to resend OTP, please try again.');
          }
        );
    };

          const [formErrors, setFormErrors] = useState({ });

          const validateForm = () => {
        
            const newErrors = {};
        
            const namePattern = /^[A-Z a-z]+$/;
            if (!formData.fullName|| formData.fullName.length < 4 || !namePattern.test(formData.fullName) ) {
                newErrors.fullName = 'Enter Min. 4 characters and Only Alphabets';
            }
            if (!formData.username|| formData.username.length < 4 || !namePattern.test(formData.username) ) {
                newErrors.username = 'Enter Min. 4 characters and Only Alphabets';
            }
            
            
        
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.email)) {
                newErrors.email = 'Invalid email format';
            }
        
            const mobileNoPattern = /^[789]\d{9}$/;
            if (!mobileNoPattern.test(formData.phoneNumber)) {
                newErrors.phoneNumber = 'Mobile No. must be 10 digits';
            }
            
            const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])*([a-z])*([A-Z])/;
            if (formData.password.length < 6 || !passwordPattern.test(formData.password)) {
                newErrors.password = 'Use Strong password Include Number and Symbols ';
            }
        
        
            return newErrors;
        
        
        
        }
        
          
        
        const handleSignIn = (e) => {
            e.preventDefault();
        
            const errors = validateForm();
            if (Object.keys(errors).length === 0) {
              const userData = {
                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                username: formData.username,
                password: formData.password
              };
        
              localStorage.setItem('formData', JSON.stringify(userData));
              console.log('formdata saved', userData);
              setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                username: '',
                password: '',
              
                otp: ''
              });
              setIsVerified(false);
              toast.success('Form submitted successfully!');
            } else {
              toast.error('Please fill out the form correctly.');
              setFormErrors(errors);
            }
          };
          

  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        <div className="col-md-6 image-container d-none d-md-block">
           
        </div>
        <div className="col-md-6 form-container">
          <div className="form-wrapper">
            <h3>Registration form</h3>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Full Name"
                  required
                />
                {formErrors.fullName && <span className="error">{formErrors.fullName}</span>}

              </div>
              <div className="mb-3" style={{width:'400px'}}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Email"
                  required
                />
                {formErrors.email && <span className="error">{formErrors.email}</span>}

              </div>
              <div className="mb-3">
                {!isVerified ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={sendEmail}
                  >
                    Verify
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled
                  >
                    Verified
                  </button>
                )}
              </div>
               
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Username"
                  required
                />
                {formErrors.username && <span className="error">{formErrors.username}</span>}

              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                  required
                />
                {formErrors.password && <span className="error">{formErrors.password}</span>}

              </div>
              
              {showVerifyModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Verify OTP</h5>
                        <button type="button" className="btn-close" onClick={() => setShowVerifyModal(false)}></button>
                      </div>
                      <div className="modal-body">
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter OTP"
                          required
                        />
                      </div>
                      <div className="modal-footer">
                        {showResendButton && (
                          <button className="btn btn-link" onClick={handleResendOtp}>
                            Resend OTP
                          </button>
                        )}
                        <button className="btn btn-primary" onClick={handleVerifyOtp}>
                          Verify OTP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <button type="submit" className="btn btn-primary" disabled={!isVerified} onClick={handleSignIn}>
                Sign In
              </button>
              <div className="mt-3">
                <p>
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Email