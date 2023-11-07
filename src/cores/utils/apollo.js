import {ApolloClient, ApolloError, createHttpLink, InMemoryCache} from "@apollo/client";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
})
const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    }
)

async function handleQuery(query, variables){
    try {
        let result = await client.query({
            query: query,
            variables: variables,
        });
        return result.data;
    }
    catch (e){
        throw e;
    }
}

export {client as default, handleQuery};