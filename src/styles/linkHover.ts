export const linkHover = {
  '&': { pos: 'relative' },
  '&:hover': { textDecor: 'none' },
  '&::before': {
    content: "''",
    display: 'block',
    bg: 'var(--color)',
    pos: 'absolute',
    bottom: 0,
    left: '50%',
    right: '50%',
    height: '2px',
    transition: 'left 0.2s ease-in-out',
  },
  '&::after': {
    content: "''",
    display: 'block',
    bg: 'var(--color)',
    pos: 'absolute',
    bottom: 0,
    left: '50%',
    width: '0',
    height: '2px',
    transition: 'width 0.2s ease-in-out',
  },
  '&:hover::before': {
    left: 0,
  },
  '&:hover::after': {
    width: '50%',
  },
};
