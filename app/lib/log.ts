export function devLog(): any {
  if (process.env.NODE_ENV !== 'production') console.log(arguments)
  return arguments[0]
}
