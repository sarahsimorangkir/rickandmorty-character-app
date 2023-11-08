import {ApolloError} from "@apollo/client";
import {handleQuery} from "../../../cores/utils/apollo";
import {GetAllCharacters, GetByCharacterID, GetAllLocations} from "../../../cores/constant/gql";

export async function getAllCharacters(page) {
    try {
        let resultApollo = await handleQuery(GetAllCharacters, {
            page: page
        });
        return resultApollo.characters;
    }catch (e){
        if(e instanceof ApolloError){

        }
    }
}

export async function getByCharacterID(page) {
    try {
        let resultApollo = await handleQuery(GetByCharacterID, {
            page: page
        });
        return resultApollo.character;
    }catch (e){
        if(e instanceof ApolloError){

        }
    }
}



export async function getAllLocations(page) {
    try {
        let resultApollo = await handleQuery(GetAllLocations, {
            page: page
        });
        return resultApollo.locations;
    }catch (e){
        if(e instanceof ApolloError){

        }
    }
}