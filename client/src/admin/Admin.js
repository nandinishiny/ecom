import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
        <nav className='flex'>
            <Link to='/admin/product/creation'><p className='m-1 p-2 font-bold'>
              Product Authority</p></Link>
            <Link to={'/admin/users'}><p className='m-1 p-2 font-bold'>users</p></Link>
        </nav>
    </div>
  )
}

export default Admin