import React from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import classes from './BaseLayout.module.css'
import { useModal } from '../providers/Modal'
type Props = {
  children?: React.ReactNode
}

const BaseLayout: React.FC<Props> = ({ children }) => {
  const { modalContent } = useModal()
  return (
    <div className={classes.mainContainer}>
      {modalContent}
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default BaseLayout
