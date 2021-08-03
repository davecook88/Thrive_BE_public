import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Krishna from './krishna'
import PropTypes from 'prop-types'


export default function Home() {
  return (
    <div className={styles.container}>
      <Krishna title={"Krishna"} age={5} />
    </div>
  )
}


// Home.prototype ={
//   name:PropTypes.string,
// }


