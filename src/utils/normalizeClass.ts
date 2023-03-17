export const normalizeClass = <T extends string | undefined>(
  className: T
): T => {
  if (className === undefined) return className

  return className
    .split(' ')
    .filter(name => !name.startsWith('astro-'))
    .join(' ') as T
}
