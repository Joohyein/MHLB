function ArrowUp({size, fill, onClick, cursor}:{size: string, fill: string, onClick?:()=>void, cursor: string}) {
    return <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} fill={fill} onClick={onClick} cursor={cursor} viewBox="0 96 960 960"><path d="m296 711-56-56 240-240 240 240-56 56-184-184-184 184Z"/></svg>
}

export default ArrowUp;