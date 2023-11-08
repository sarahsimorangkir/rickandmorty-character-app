import React, {useEffect, useState} from "react";
import {useStoreDispatch, useStoreState} from "../../../cores/context/store";
import {useParams} from "react-router-dom";
import {getAllLocations} from "../../characters/data/characters";
import {APPEND_VALUE_MAP, appendMap, SET_VALUE} from "../../../cores/context/actions";
import {onValue, ref, set} from "firebase/database";
import {firebaseDB} from "../../../cores/utils/firebase";
import {Row} from "react-bootstrap";
import {getCharacterByID} from "../data/character";

export function Locations() {
    const {locations, locationsGetInfo, characterMap} = useStoreState();
    const dispatch = useStoreDispatch();
    const [page, setPage] = useState(locationsGetInfo != null ? locationsGetInfo.next - 1 : 1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("-");
    const [shownData, setShownData] = useState([]);

    useEffect(() => {
        let fetchData = true;
        if (locationsGetInfo != null) {
            if (locationsGetInfo.next !== page) {
                fetchData = false;
            }
        }
        if (fetchData) {
            setIsLoading(true);
            getAllLocations(page).then((c) => {
                dispatch({
                    type: SET_VALUE, payload: {
                        name: "locationsGetInfo", value: c.info
                    }
                });
                dispatch({
                    type: SET_VALUE, payload: {
                        name: "locations", value: [...locations, ...c.results]
                    }
                });
                mappedData(c.results);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [page]);

    async function mappedData(cResult) {
        let mapped = {};
        cResult.forEach(item => {
            mapped[item.id] = item;
        })
        dispatch({
            type: APPEND_VALUE_MAP, payload: {
                name: "locationsMap", value: mapped,
            }
        });
    }

    function nextData() {
        if (locationsGetInfo != null) {
            if (page < locationsGetInfo.pages) {
                setPage(locationsGetInfo.next);
            }
        } else {
            setPage(page + 1);
        }
    }

    function handleOnScroll(e) {
        console.log("Scroll...")
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            nextData();
        }
    }

    // Use in location page
    function getAllAssignedLocation(locationID) {
        if (selectedLocation !== "-") {
            onValue(ref(firebaseDB, `assign/location-${locationID}`), async (snapshot) => {
                let data = snapshot.val()
                if (!!data) {
                    let keys = Object.keys(data);
                    let result = [];
                    for (let i = 0; i < keys.length; i++) {
                        result.push(await getData(keys[i]));
                    }
                    console.log(result);
                    setShownData(result);
                } else {
                    setShownData([]);
                }
            })
        }
    }

    async function getData(characterID) {
        console.log(`Start Checking ${characterID}`);
        if (characterMap[characterID] !== undefined) {
            console.log("From MAP");
           return characterMap[characterID];
        } else {
            console.log("FROM API")
            let result = await getCharacterByID(characterID);
            let mapped = {
                [result.id]: result
            };
            dispatch({
                type: APPEND_VALUE_MAP, payload: {
                    name: "characterMap", value: mapped,
                }
            });
            return result;
        }
    }


    return (
        <div className={"bg-dark col-12 d-flex vh-100"}>
            <Row>
                <div className={"col-12"}>
                    <select className={"col-12"} name={"locations"} onChange={(e) => {
                        const {value} = e.currentTarget;
                        setSelectedLocation(value);
                        getAllAssignedLocation(value);
                    }} value={selectedLocation} onScroll={handleOnScroll}>

                        <option value={"-"} disabled={true}>Select Location</option>
                        {locations.length > 0 && locations.map((location, index) => (
                            <option value={location.id} key={`location-${index}`}>{location.name}</option>
                        ))}
                    </select>
                </div>
                <div className={"col-12 d-flex flex-wrap"}>
                    {shownData.length > 0 && shownData.map((item, index) => (
                        <div key={`card-shown-${index}`}><img src={item.image} alt={"test"}/></div>
                    ))}
                </div>
            </Row>
        </div>
    );
}