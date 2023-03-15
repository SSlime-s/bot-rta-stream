import { useCallback, useRef, useState } from 'react'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

type TimerState = 'idle' | 'running' | 'paused'

export const Timer: React.FCX = ({ className }) => {
  const [timeMs, setTimeMs] = useState(0)
  const [timerState, setTimerState] = useState<TimerState>('idle')
  const [requestId, setRequestId] = useState<number | null>(null)
  const lastDate = useRef<Date | null>(null)

  const onTick = useCallback(() => {
    if (lastDate.current === null) {
      lastDate.current = new Date()
    }

    const now = new Date()
    const delta = now.getTime() - lastDate.current.getTime()
    setTimeMs(prev => prev + delta)
    lastDate.current = now

    const id = window.requestAnimationFrame(onTick)
    setRequestId(id)
  }, [lastDate])

  const onClick = useCallback(() => {
    if (timerState === 'idle') {
      setTimerState('running')
      lastDate.current = new Date()
      onTick()
    } else if (timerState === 'running') {
      setTimerState('paused')
      if (requestId !== null) {
        window.cancelAnimationFrame(requestId)
      }
      if (lastDate.current !== null) {
        setTimeMs(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          prev => prev + new Date().getTime() - lastDate.current!.getTime()
        )
      }
    } else if (timerState === 'paused') {
      setTimerState('running')
      lastDate.current = new Date()
      onTick()
    }
  }, [lastDate, onTick, requestId, timerState])

  const onReset = useCallback(() => {
    setTimerState('idle')
    setTimeMs(0)
    if (requestId !== null) {
      window.cancelAnimationFrame(requestId)
    }
  }, [requestId])

  const hours = Math.floor(timeMs / 1000 / 60 / 60)
  const minutes = Math.floor((timeMs / 1000 / 60) % 60)
  const seconds = Math.floor((timeMs / 1000) % 60)

  const formattedTime = `${hours.toString().padStart(1, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return (
    <div
      className={twMerge(
        classNames(
          'inline-flex',
          'flex-col',
          'border-black',
          'border-x-8',
          'm-4',
          'p-4',
          'px-8',
          'w-auto'
        ),
        className
      )}
    >
      <button
        onClick={onClick}
        className={classNames('font-mono', 'cursor-pointer', 'text-9xl', {
          'text-black': timerState !== 'paused',
          'text-puce': timerState === 'paused',
        })}
      >
        {formattedTime}
      </button>
      <button
        onClick={onReset}
        className={classNames(
          'cursor-pointer',
          'text-black',
          'hover:text-puce',
          'ml-auto',
          'justify-self-end'
        )}
      >
        Reset
      </button>
    </div>
  )
}
