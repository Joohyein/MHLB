function Close({size, fill, onClick, cursor}:{size: string, fill: string, onClick:()=>void, cursor: string}) {
    return <svg 
    xmlns="http://www.w3.org/2000/svg" 
    height={size} 
    width={size} 
    fill={fill} 
    viewBox="0 0 48 48"
    onClick={onClick}
    cursor={cursor}
    ><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
}

export default Close;
