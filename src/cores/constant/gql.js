import {gql} from "@apollo/client";

export const GetAllCharacters = gql`
query Characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter:$filter) {
        info {
            count
            pages
            next
            prev
        }
        results {
            id
            name
            status
            species
            type
            gender
            image
            created
        }
    }
}
`;

export const GetAllLocations = gql`
query Locations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
        info {
            count
            pages
            next
            prev
        }
        results {
            id
            name
            type
            dimension
            created
            residents {
                id
                name
                status
                species
                type
                gender
                image
                created
            }
        }
    }
}
`;

export const GetByCharacterID = gql`
query Character($id: ID!) {
    character(id: $id) {
        id
        name
        status
        species
        type
        gender
        image
        created
    }
}
`;