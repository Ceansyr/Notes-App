import React from 'react'
import style from './home.module.css'
import img from "../assets/pocket-notes-svg.png"
import lock from '../assets/lock.png'

function home() {
  return (
    <div className={style.container}>
        <div>
            <div className={style.img}>
            <img src={img} style={{width: 'auto',height: 'auto'}} alt='pocketnotes' />
            </div>
            <div style={{fontSize:'larger', fontWeight: '500'}}><h1> Pocket Notes</h1></div>
            <p>
          Send and receive messages without keeping your phone online. 
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
        </div>
      <p><img className='lock' alt='' src={lock}/>
        end-to-end encrypted</p>
    </div>
  );
}

export default home