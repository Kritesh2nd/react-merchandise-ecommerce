import React from 'react'
import Navbar from '../general/Navbar'
import Footer from '../general/Footer'
import ContactPage from './contact/ContactPage'

const Contact = () => {
  return (
    <div className='bg-[#F4EAE6]'>
       <section className="h-[90px] bor overflow-hidden">
        <Navbar />
      </section>
      <section>
        <ContactPage/>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default Contact
