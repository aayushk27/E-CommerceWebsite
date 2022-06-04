import React from 'react'
import Menu from './Menu'

const Base = ({
    title = "My title",
    description = "My description",
    className = "p4",
    children
}) => (
    <div>
        <Menu></Menu>
        <div className='jumbotron container-fluid'>
            <div className='text-center'>
                <h2 className='display-4'>{title}</h2>
                <p className='lead'>{description}</p>

                <div className={className}>{children}</div>
            </div>

        </div>

        <footer className='footer mt-auto py-3'>
            <div className='container-fuid bg-success text-white text-center'>
                <h4>If you got any questions feel free to reach out</h4>
                <button className='btn btn-warning btn-lg'>Contact Ud</button>
            </div>

            <div className='container'>
                <span className='text-muted'>
                    An amazing <span className="text-dark">MERN</span> Bootcamp
                </span>
            </div>
        </footer>
    </div>
)

export default Base
