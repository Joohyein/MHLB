function ArrowNext({size, fill, onClick, cursor}:{size: string, fill: string, onClick:()=>void, cursor: string}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} onClick={onClick} cursor={cursor} viewBox="0 96 960 960"><path d="m321 976-71-71 329-329-329-329 71-71 400 400-400 400Z"/></svg>
}

export default ArrowNext;