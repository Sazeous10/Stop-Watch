import React, {useState, useEffect, useRef} from 'react'
import styles from './StopWatch.module.css'
function StopWatch(){
    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
        if (isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            },10)
        }
        return () => {
            clearInterval(intervalIdRef.current)
        }

    }, [isRunning])

    function start(){
        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsedTime
    }

    function stop(){
        setIsRunning(false)
    } 

    function reset(){
        setElapsedTime(0)
        setIsRunning(false)
    }

    function formatTime(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
        let minutes = Math.floor(elapsedTime / (1000 * 60))
        let seconds = Math.floor(elapsedTime / (1000))
        let milliseconds = Math.floor((elapsedTime %1000) / 100)

        hours = String(hours).padStart(2, "0")
        minutes = String(minutes).padStart(2, "0")
        seconds = String(hours).padStart(2, "0")
        milliseconds = String(milliseconds).padStart(2, "0")

        return `${hours}:${minutes}:${seconds}:${milliseconds}`
    }

    return(<div className={styles.StopWatchContainer}>
            <h1>StopWatch</h1>
            <div className={styles.StopWatch}>
                <div className={styles.Timer}>{formatTime()}</div>
                <div className={styles.Buttons}>
                    <button className={styles.StartButton} onClick={() => start()}>Start</button>
                    <button className={styles.ResetButton} onClick={() => reset()}>Reset</button>
                    <button className={styles.StopButton} onClick={() => stop()}>Stop</button>
                </div>
            </div>
        </div>)
}

export default StopWatch