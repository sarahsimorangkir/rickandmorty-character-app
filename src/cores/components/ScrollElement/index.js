import React, { useState } from "react";
import styles from "./index.module.css";

export function ScrollElement({ height, characters, canScroll, doOnScrollBottom, onClickCard, isLoading, page, ...props }) {
  const [isBottom, setIsBottom] = useState(false);

  function handleOnScroll(e) {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && canScroll) {
      doOnScrollBottom(e);
      setIsBottom(true);
    } else if (isBottom) {
      setIsBottom(false);
    }
  }

  return (
    <div
      onScroll={handleOnScroll}
      className={`col-12 d-flex justify-content-center flex-wrap shadow-sm ${styles.wrapScroll}`}
      style={{ height: `${height}` }}
    >
      {characters.map((item, index) => (
        <div
          onClick={() => {
            onClickCard(item.id);
          }}
          role={"button"}
          key={`card-${index}`}
          className={"col-md-5 col-10 shadow-sm bg-dark m-2 rounded flex"}
        >
          <div className={"col-12 mt-3 mb-3 d-flex"}>
            <img src={item.image} className={`${styles.cardImage}`} alt={"character pics"} />
            <div className={`text-left ml-3 text-white ${styles.cardText}`}>
              <h3 className={`${styles.nameText}`}>{item.name}</h3>
              <span>{item.status} - {item.species}</span>
              <p>Gender: {item.gender}</p>
            </div>
          </div>
        </div>
      ))}

      <div className={`${styles.wrapInfoScroll}`}>
        {isLoading && <button className={"btn btn-warning"}>Loading....</button>}
        {canScroll && isBottom && page === 1 && (
          <button onClick={doOnScrollBottom} className={"btn btn-info"}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
