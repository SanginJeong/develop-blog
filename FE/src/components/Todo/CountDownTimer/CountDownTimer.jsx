import React, {useState, useEffect} from 'react'

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours : 0,
    minutes : 0,
    seconds : 0,
  })

  useEffect(()=>{
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(24,0,0,0);

      const difference = target - now;
      
      setTimeLeft({
        hours: ~~(difference / (1000 * 60 * 60) % 24),
        minutes: ~~(difference / (1000 * 60) % 60),
        seconds: ~~(difference / (1000) % 60),
      })
    }
    
    const timerId = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timerId);
  },[])
  return (
    <div>
      {`${String(timeLeft.hours).padStart(2,'0')}:${String(timeLeft.minutes).padStart(2,'0')}:${String(timeLeft.seconds).padStart(2,'0')}`}
    </div>
  )
}
export default CountDownTimer