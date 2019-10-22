export function checkIsMoveAble (direction, zeroIndex) {
  switch (direction) {
    case 'left':
      if (zeroIndex === 0 || zeroIndex === 3 || zeroIndex === 6) return false;
      break;
    case 'up':
      if (zeroIndex === 0 || zeroIndex === 1 || zeroIndex === 2) return false;
      break;
    case 'right':
      if (zeroIndex === 2 || zeroIndex === 5 || zeroIndex === 8) return false;
      break;
    case 'down':
      if (zeroIndex === 6 || zeroIndex === 7 || zeroIndex === 8) return false;
      break;
    default: break;
  }
  return true;
}
