import { Navigate } from "react-router-dom"

const PrivateRoute = ({userLogged, children}) => {

    if(!userLogged){
        return <Navigate to={"/login"} replace={true}/>
    }
    return children;

}

export default PrivateRoute;