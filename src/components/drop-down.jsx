import React, { useState } from 'react'
import { genres } from '../data/data'
import { Link } from 'react-router-dom'

function DropDown() {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <div className='flex flex-col'>
            <div>
            <button  onClick={handleClick} className='text-center  hover:underline sm:text-left'>genre</button>
            </div>
            {open &&
                <div className=' text-yellow-600'>
                    <ul>
                        {
                            genres.map((genre) => (
                                <li key={genre} className=''>
                                    <Link to={`/movies/${genre}`}>{genre}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }

        </div>
    )
}

export default DropDown