import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'

const AdminDashboard = () => {

  const { user: { name, email, role } } = isAuthenticated()

  const adminLeftside = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-success text-black">
          Admin Navigation
        </h4>
        <ul className="list-group text-left">
          <li className="list-group-item">
            <Link to = "/admin/create/category"className='nav-link text-success'>Create Categoies</Link>
            <Link to = "/admin/category"className='nav-link text-success'>Manage Categoies</Link>
            <Link to = "/admin/create/product"className='nav-link text-success'>Create Product</Link>
            <Link to = "/admin/products"className='nav-link text-success'>Manage Products</Link>
            <Link to = "/admin/orders"className='nav-link text-success'>Manage Orders</Link>
          </li>
        </ul>
      </div>
    )
  }

  const adminRightside = () => {
    return(
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group text-left">
          <li className="list-group-item ">
            <span className="badge badge-success mr-4">Name : </span>{name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-4">Email : </span>{email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    )
  }


  return (
    <div>
      <Base 
        title='Welcome to admin area' 
        description='manage all of your products and orders here'
        className='container bg-dark p-4'
      >
        <div className="row">
          <div className="clo-3">{adminLeftside()}</div>
          <div className="col-9">{adminRightside()}</div>
        </div>
        
      </Base>
    </div>
  )
}


export default AdminDashboard