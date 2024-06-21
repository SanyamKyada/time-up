import React, { useRef, useState } from 'react'
import ResultModal from './ResultModal';

export default function TimerChallange({ title, targetTime }) {

    const dialog = useRef();
    const timer = useRef();
    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    if (remainingTime <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    const handleStart = () => {
        timer.current = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 10);
        }, 10); //10 mili seconds
    }

    const handleReset = () => {
        setRemainingTime(targetTime * 1000);
    }

    const handleStop = () => {
        clearInterval(timer.current);
        dialog.current.open();
    }

    return (
        <>
            <ResultModal dialogRef={dialog} onReset={handleReset} targetTime={targetTime} remainingTime={remainingTime} />
            <section className='challenge'>
                <h2>{title}</h2>
                <p className='challange-time'>
                    {targetTime} second{targetTime > 1 ? 'S' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}
