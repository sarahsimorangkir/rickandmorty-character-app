import {createBrowserRouter} from "react-router-dom";
import {Character} from "../../features/characters/presentation/Character";
import CharacterDetail from "../../features/characters/presentation/CharacterDetail";
import { Locations } from "../../features/locations/presentation/Locations";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Character/>,
    },
    {
        path: "/:character_id",
        element: <CharacterDetail/>
    },
    {
        path : "/locations",
        element: <Locations/>
    }
]);

export default routes;