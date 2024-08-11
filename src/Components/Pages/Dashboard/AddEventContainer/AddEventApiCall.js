const AddEventApiCall = async (categoriaId, userId, detalle, fecha, apiKey) => {

    try {
    
        const response = await fetch('https://babytracker.develotion.com/eventos.php',{

            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "apikey" : apiKey,
                "iduser" : userId,
            },
            body: JSON.stringify({
                idCategoria: categoriaId,
                idUsuario: userId,
                detalle: detalle,
                fecha: fecha,
            })

    });

    if(response.status === 200){
        const data = await response.json();
        return data;
    }
    else{

        return Promise.reject({
            message: "Ocurrió un error al agregar el evento, intente nuevamente",
            status: response.status,
        });
    }


    } catch (error) {
        return Promise.reject({
            message: error.message || "Ocurrió un error, por favor intente nuevamente",
        });

    }  
};

export default AddEventApiCall;