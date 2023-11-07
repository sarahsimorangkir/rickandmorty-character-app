import React, {useEffect, useState} from "react";
import {useStoreDispatch, useStoreState} from "../../../cores/context/store";
import {APPEND_VALUE_MAP, SET_VALUE} from "../../../cores/context/actions";
import {getAllCharacters} from "../data/characters";
import {ScrollElement} from "../../../cores/components/ScrollElement";
import {useNavigate} from "react-router-dom";

export function Character({...props}) {
    const {characters, charactersGetInfo, characterMap} = useStoreState();
    const dispatch = useStoreDispatch();
    const [page, setPage] = useState(charactersGetInfo != null ? charactersGetInfo.next - 1 : 1);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let fetchData = true;
        if (charactersGetInfo != null) {
            if (charactersGetInfo.next !== page) {
                fetchData = false;
            }
        }
        if (fetchData) {
            setIsLoading(true);
            getAllCharacters(page).then((c) => {
                dispatch({
                    type: SET_VALUE, payload: {
                        name: "charactersGetInfo", value: c.info
                    }
                });
                dispatch({
                    type: SET_VALUE, payload: {
                        name: "characters", value: [...characters, ...c.results]
                    }
                });
                mappedData(c.results);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [page]);

    async function mappedData(cResult){
        let mapped = {};
        cResult.forEach(item=>{
            mapped[item.id] = item;
        })

        console.log(cResult);
        dispatch({
            type: APPEND_VALUE_MAP, payload: {
                name: "characterMap", value: mapped,
            }
        });
    }


    function handleOnScroll(event) {
        if (charactersGetInfo != null) {
            if (page < charactersGetInfo.pages) {
                setPage(charactersGetInfo.next);
            }
        } else {
            setPage(page + 1);
        }
    }

    return (<div>
        {characters.length > 0 &&
            <ScrollElement 
            doOnScrollBottom={handleOnScroll}
            page={page}
            onClickCard={(paramID)=>{navigate(`/${paramID}`)}}
            isLoading={isLoading}
            canScroll={charactersGetInfo == null ? true : charactersGetInfo.next > page}
            characters={characters} height={"100vh"}/>}
    </div>);
}

