import React from 'react'
import Styles from './loding.module.scss'

const Loading = () => {
    return (

        <div className={Styles.mainContainer}>

            <div>
                <img className={Styles.img} src='https://i.imgur.com/98bZZyr.jpg' />
            </div>

            <div className={Styles.spinerContainer}>
                <div className={Styles.spiner}>
                    <div className={Styles.fullCircle}></div>
                    <div className={`${Styles.halfLeft} ${Styles.twoQuartersCircle}`}></div>
                    <div className={`${Styles.halfRight} ${Styles.twoQuartersCircle}`}></div>
                    <div className={Styles.threeQuartersCircle}></div>
                </div>
            </div>

        </div>
        


    )
}

export default Loading
