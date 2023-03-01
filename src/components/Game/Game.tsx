import styles from '@/styles/Game.module.css'
import { useEffect, useState } from 'react'

function Game() {
  const [cardArray, setCardArray] = useState<any>([])
  const [flip, setFlip] = useState<any>([])
  const [count, setCount] = useState(0)
  const showCard = (index: number) => {
    let tempArr = flip
    tempArr[index] = !flip[index]
    setFlip([...tempArr])
    setCount(count + 1)
    if (count >= 2) {
      setFlip(Array.from({ length: 6 }, () => false))

      setCount(0)
    }
    console.log(index)
    console.log(flip)
  }

  useEffect(() => {
    setFlip(Array.from({ length: 6 }, () => false))
    setCardArray(Array.from({ length: 6 }, (_, i) => i))
  }, [])
  return (
    <>
      <main className={styles.main}>
        <div className={styles.cardContainer}>
          {cardArray.map((value: number, index: number) => (
            <div className={styles.card} key={value}>
              <div
                className={styles.cardContent}
                onClick={() => showCard(index)}
              >
                <div
                  className={flip[index] ? styles.cardShow : styles.cardHide}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Game
