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
`