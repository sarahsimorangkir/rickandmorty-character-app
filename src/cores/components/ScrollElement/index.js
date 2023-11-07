import React, {useState} from "react";
import styles from "./index.module.css";

export function ScrollElement({height, characters, canScroll, doOnScrollBottom, onClickCard,isLoading, page, ...props}) {
    const [isBottom, setIsBottom] = useState(false);

    function handleOnScroll(e) {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && canScroll) {
            doOnScrollBottom(e);
            setIsBottom(true)
        } else if (isBottom) {
            setIsBottom(false);
        }
    }


    return (
        <div onScroll={handleOnScroll}
             className={`col-12 d-flex justify-content-between flex-wrap shadow-sm ${styles.wrapScroll}`}
             style={{height: `${height}`}}>
            {characters.map((item, index) => (
                <div onClick={()=> {onClickCard(item.id)}} role={"button"} key={`card-${index}`} className={"col-5 shadow-sm bg-dark mb-3 rounded"}>
                    <div className={"col-12"}>
                        <img src={item.image} alt={"Image"}/>
                    </div>
                    <div className={"text-center text-white"}>
                        {item.name} - {item.gender}
                    </div>
                </div>
            ))}

            <div className={`${styles.wrapInfoScroll}`}>
                {isLoading && <span>Loading....</span>}
                {canScroll && isBottom && page === 1
                    && <button onClick={doOnScrollBottom} className={"btn btn-info"}>Load More</button>}
            </div>
        </div>
    )
}