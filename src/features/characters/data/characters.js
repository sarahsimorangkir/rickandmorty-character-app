import {ApolloError} from "@apollo/client";
import {handleQuery} from "../../../cores/utils/apollo";
import {GetAllCharacters} from "../../../cores/constant/gql";

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