/*
const EventListingAPI = async () => {
    try {
        const response = await fetch(
            "https://babytracker.develotion.com/eventos.php?idUsuario=3859",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : "7d314199e4d7ab751d8d6f55680106f5",
                    "iduser" : "3859"
                },
            }
        );
        if (response.status === 200){
            const data = await response.json();
            return data;
        } else{
            return Promise.reject({
                message: "Ha ocurrido un error",
                status: response.status,
            });
        }
    } catch (error) {
        return Promise.reject({
            message: "Ha ocurrido un error",
        });
    }
};
*/ 
const DeleteEventAPI = async (id, idUsuario, apiKey) => {
    try {
        const response = await fetch(
            "https://babytracker.develotion.com/eventos.php?idEvento=" + id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : apiKey,
                    "iduser" : idUsuario
                },
            
            }
        );
        if (response.status === 200){
            const data = await response.json();
            //return data.mensaje;
        } else{
            return Promise.reject({
                message: "Ha ocurrido un error",
                status: response.status,
            });
        }
    } catch (error) {
        return Promise.reject({
            message: "Ha ocurrido un error",
        });
    }
};

///////
/*
const GetCategoriasAPI = async (userLogged ) => {
    try {
        const response = await fetch(
            "https://babytracker.develotion.com//categorias.php",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : userLogged.apiKey,
                    "iduser" : userLogged.idUsuario
                },
            }
        );
        if (response.status === 200){
            const data = await response.json();
            return data;
        } else{
            return Promise.reject({
                message: "Ha ocurrido un error",
                status: response.status,
            });
        }
    } catch (error) {
        return Promise.reject({
            message: "Ha ocurrido un error",
        });
    }
};
*/
export { DeleteEventAPI };