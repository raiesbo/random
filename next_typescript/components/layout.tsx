import React from 'react'
import styles from '../styles/Home.module.css'
import NavBar from './navBar'
import Footer from './footer'

export default function Layout({ children }: any) {
  return (
    <div className="content">
        <NavBar />
        { children }
        <Footer />
    </div>
  )
}