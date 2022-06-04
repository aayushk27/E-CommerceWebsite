import React, {useState} from "react";
import Base from "../core/Base";
import {Link, Redirect} from "react-router-dom"
import {signin, isAuthenticated, authenticate} from "../auth/helper"

const Signin = () => {

    const [values, setValues] = useState({
        email : "aditya@gmail.com",
        password : "123456789",
        error : "",
        loading : false,
        didRedirect : false
    })

    const {email, password, error, loading, didRedirect} = values

    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error : false, loading : true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error : data.error, loading : false})
            }
            else { 
                authenticate(data, () => {
                    setValues({...values, didRedirect : true})
                })
            }
        })
        .catch(console.log("signin request fail"))
    }


    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }
            else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to='/' />
        }
    }


    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
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

    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">

                        <div className="form-group">
                            <label className="text-dark">
                                Email
                            </label>
                            <input className="form-control" type="email" value={email} onChange = {handleChange("email")}/>
                        </div>
                        <div className="form-group">
                            <label className="text-dark">
                                Password
                            </label>
                            <input className="form-control" type="password" value={password} onChange = {handleChange("password")}/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return(


        <Base title="Signin Page" description>
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signin;