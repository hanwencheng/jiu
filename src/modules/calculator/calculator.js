import { units } from '../../constants/brewConstants'
const Gallon2Liter = 3.7854

export const calculate = (gallon, liter, value, unit) => {
  const scale = liter / gallon / Gallon2Liter
  const rate = units[unit.toLowerCase()].rate
  return value * rate * scale
}

