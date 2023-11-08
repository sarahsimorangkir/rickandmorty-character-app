import React, {useEffect, useState} from "react";
import {useStoreDispatch, useStoreState} from "../../../cores/context/store";
import {getAllCharacters, getAllLocations} from "../data/characters";
import {APPEND_VALUE_MAP, SET_VALUE} from "../../../cores/context/actions";
import {useNavigate, useParams} from "react-router-dom";
import {Row} from "react-bootstrap";
import {assignLocation, firebaseDB} from "../../../cores/utils/firebase";
import {onValue, ref, set} from "firebase/database";


export default function CharacterDetail({...props}) {
    const navigate = useNavigate();
    const {locations, locationsGetInfo} = useStoreState();
    const dispatch = useStoreDispatch();
    const [page, setPage] = useState(locationsGetInfo != null ? locationsGetInfo.next - 1 : 1);
    const [isLoading, setIsLoading] = useState(false);
    const {character_id} = useParams();
    const [selectedLocation, setSelectedLocation] = useState("-");
    

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
    function getAllAssignedLocation(){
        if(selectedLocation !== "-"){
            onValue(ref(firebaseDB, `assign/location-${selectedLocation}`), snapshot => {
                let data = snapshot.val()
                if(!!data){
                    // Character -> Get Key
                    console.log(data);
                }else{
                   // TODO: Location Not Have Character
                }
            })
        }
    }

    async function handleOnClickAssign(e) {
        if (selectedLocation !== "-") {
            setIsLoading(true);
            let param = {
                characterID: character_id,
                locationID: selectedLocation,
            };
            let characterRef = ref(firebaseDB, `assign/character-${param.characterID}`)
            onValue(characterRef, async (snapshot) => {
                const data = snapshot.val();
                if (!!data) {
                   alert("Character Already Assigned")
                } else {
                    await set(ref(firebaseDB, `assign/character-${param.characterID}`), param).catch(err => console.log(err))
                    await set(ref(firebaseDB, `assign/location-${param.locationID}/${param.characterID}`), true).catch(err => console.log(err))
                }
                setIsLoading(false)
            }, {
                onlyOnce: true,
            })
        }
    }


    return (
        <div className={"bg-dark col-12 d-flex vh-100"}>
            <Row>
                <div className={"col-12"}>
                    <select className={"col-12"} name={"locations"} onChange={(e) => {
                        const {value} = e.currentTarget;
                        setSelectedLocation(value);
                        getAllAssignedLocation()
                    }} value={selectedLocation} onScroll={handleOnScroll}>

                        <option value={"-"} disabled={true}>Select Location</option>
                        {locations.length > 0 && locations.map((location, index) => (
                            <option value={location.id} key={`location-${index}`}>{location.name}</option>
                        ))}
                    </select>
                </div>
                <div className={"col-12"}>
                    <button onClick={handleOnClickAssign} className={"btn btn-info"}>{isLoading ? "Loading..." : "Assign Location"}</button>
                </div>
            </Row>
            <div>
                
            </div>
        </div>
    );
}
