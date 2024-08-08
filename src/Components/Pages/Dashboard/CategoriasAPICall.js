const CategoriasAPICall = async (apiKey, idUsuario) => {

    try {

        const response = await fetch(
            "https://babytracker.develotion.com//categorias.php",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : apiKey,
                    "iduser" : idUsuario
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

export {CategoriasAPICall};