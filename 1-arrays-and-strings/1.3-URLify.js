// replace spaced with %20 
export function URLify(string) {
  return string.split(" ").join("%20")
} 