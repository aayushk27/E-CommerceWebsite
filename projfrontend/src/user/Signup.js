import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom"
import { signup } from "../auth/helper";

const Signup = () => {

    //defining the state
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    //destructuring of the state values
    const { name, email, password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({ ...values, name: "", email: "", password: "", error: "", success: true })
                }
                // setValues({...values, name:"", email:"", password:"", error:"", success:true})
            })
            .catch(error => console.log(`Error is signup ${error}`))

    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label className="text-dark">
                                Name
                            </label>
                            <input className="form-control" type="text" value={name} onChange={handleChange("name")} />
                        </div>
                        <div className="form-group">
                            <label className="text-dark">
                                Email
                            </label>
                            <input className="form-control" type="email" value={email} onChange={handleChange("email")} />
                        </div>
                        <div className="form-group">
                            <label className="text-dark">
                                Password
                            </label>
                            <input className="form-control" type="password" value={password} onChange={handleChange("password")} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                New account was created successfully. Please{" "}
                <Link to="/signin">Login Here</Link>
              </div>
            </div>
          </div>
        );
      };


    const errorMessage = () => {
        var e = error

        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {JSON.stringify(e)}
              </div>
            </div>
          </div>
        );
      };



    return (
        <Base title="Sign up page" description="A page for user to sign up!">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
      </Base>
    )
}

export default Signup;