function ArrowBack({size, fill, cursor, onClick}:{size: string, fill: string, cursor: string, onClick?:()=>void}) {
    return <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} fill={fill} onClick={onClick} viewBox="0 0 24 24" cursor={cursor}><path d="M10 22 0 12 10 2l1.775 1.775L3.55 12l8.225 8.225Z"/></svg>
}

export default ArrowBack;