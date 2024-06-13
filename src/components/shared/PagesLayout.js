import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
//import { Contribute, Register } from '../../pages'
import {Home, Contact, Login, Register, Reset, Contribute, Apply} from "../../pages"


const PagesLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default PagesLayout
