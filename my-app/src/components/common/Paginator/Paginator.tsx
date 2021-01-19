import React, {useState} from "react";
import s from './Paginator.module.css';

type PropsType={
    totalUsersCount:number
    pageSize: number
    portionSize?:number
    currentPage:number
    onPageChanged:(pageNumber:number)=>void
}

let Paginator: React.FC<PropsType> = ({portionSize=10, ...props}) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount=Math.ceil(pagesCount/portionSize);
    let [portionNumber, setPortionNumber]=useState(1);
    let leftPortionNumber=(portionNumber-1)*portionSize+1;
    let rightPortionNumber=portionNumber*portionSize;


    return (
        
        <div className={s.paginator}>
            {portionNumber>1&& <button onClick={()=>{setPortionNumber(portionNumber-1)}}>Prev</button>}
            {pages
            .filter(p=>p>=leftPortionNumber&&p<=rightPortionNumber)
            .map(p => {

                return <span
                    // @ts-ignore
                    className={props.currentPage === p && s.activePage}

                    onClick={() => props.onPageChanged(p)}
                >
                    {p}
                </span>
            })}
            {portionCount>portionNumber&&<button onClick={()=>{setPortionNumber(portionNumber+1)}}>Next</button>}

        </div>

    )

}

export default Paginator