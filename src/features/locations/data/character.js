import {handleQuery} from "../../../cores/utils/apollo";
import {GetByCharacterID} from "../../../cores/constant/gql";
import {ApolloError} from "@apollo/client";

export async function getCharacterByID(id) {
    try {
        //handle logic or manage or mapping data to our expected data
        let resultApollo = await handleQuery(GetByCharacterID, {
            id: id
        });
        return resultApollo.character;
    }catch (e){
        if(e instanceof ApolloError){

        }
    }
}