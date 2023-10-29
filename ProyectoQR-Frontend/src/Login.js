import React,{useState} from 'react'
import { useNavigate } from "react-router-dom"




function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  
  // User Login info
  const database = [
      {
        username: "user1",
        password: "pass1"
      },
      {
        username: "user2",
        password: "pass2"
      }
    ];
  
    const errors = {
      usernameE: "invalid username",
      passwordE: "invalid password"
    };
  
    const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();
  
      var { usernameE, passwordE } = document.forms[0];
      // Find user login info
      const userData = database.find((user) => 
      
      user.username === usernameE.value
      
      );
      // Compare user info
      if (userData) {
        console.log(userData.password)
        if (userData.password !== passwordE.value) {
          // Invalid password
          setErrorMessages({ name: "passwordE", message: errors.passwordE });
        } else {
          console.log('submit activado')
          setIsSubmitted(true);
          navigate("/portal")
        }
      } else {
        // Username not found
        setErrorMessages({ name: "usernameE", message: errors.usernameE });
      }
    };
  
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
      );
  
    const renderForm = (
      <form class="user" onSubmit={handleSubmit}>
            <div class="form-group">
                <input type="text" name="usernameE" class="form-control form-control-user" aria-describedby="emailHelp"
                    placeholder="Enter Username..." />
                    {renderErrorMessage("username")}
            </div>
            <div class="form-group">
                <input type="password" name="passwordE" class="form-control form-control-user" placeholder="Password" />
                    {renderErrorMessage("password")}
            </div>
            <div class="form-group">
                <div class="custom-control custom-checkbox small">
                    <input type="checkbox" class="custom-control-input" id="customCheck" />
                    <label class="custom-control-label" for="customCheck">Remember
                        Me</label>
                </div>
            </div>
            <button type="submit" variant="primary" class="btn btn-primary btn-user btn-block" >Login</button>
            <hr />
        </form>
    )

    const redirect = (
     <div>holi</div> 
    )


    return (
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        {/* <!-- Nested Row within Card Body --> */}
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    {isSubmitted ? redirect : renderForm}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login