import { useEffect, useState } from 'react'



function useCountdown(items) {

  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {}
        items.forEach(item => {
          if (item.expiryDate === null) return
          const secLeft = Math.floor((item.expiryDate - Date.now()) / 1000)
          const s = secLeft % 60
          const m = Math.floor(secLeft / 60 % 60)
          const h = Math.floor(secLeft / 3600)
          updated[item.id] = `${h}h ${m}m ${s}s`
          if (secLeft <= 0) return
        })
        setTimeLeft(updated)
    }, 1000)
    return () => clearInterval(interval)
  }, [items])
  return timeLeft
}


export default useCountdown