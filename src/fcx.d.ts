import * as _React from 'react'
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  type FCX<P = {}> = FunctionComponent<P & { className?: string }>
}
