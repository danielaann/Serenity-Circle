import React from 'react'
import { assets } from '../assets_doc/assets_frontend/assets';

const Contact = () => {
  return (
    <div>
        <div className='w-[80%] text-center text-2xl pt-10 text-gray-500'>
            <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
        </div>

        <div>
            <img src={assets.contact_image}/>

            <div>
                <p>Serenity Circle</p>
                <p></p>
                <p>by Daniela Pereira</p>
                <p></p>
                <p></p>

                <button></button>
            </div>
        </div>
    </div>
  )
}

export default Contact;