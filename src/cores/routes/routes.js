import {createBrowserRouter} from "react-router-dom";
import {Character} from "../../features/characters/presentation/Character";
import CharacterDetail from "../../features/characters/presentation/CharacterDetail";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Character/>,
    },
    {
        path: "/:character_id",
        element: <CharacterDetail/>
    }
]);

export default routes;