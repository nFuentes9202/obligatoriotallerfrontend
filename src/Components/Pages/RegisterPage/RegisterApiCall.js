const registerUserApiCall = async (inputUsername, inputPassword, selectDepartamento, selectCiudad) => {

    try {
    
        const response = await fetch('https://babytracker.develotion.com/usuarios.php',{

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuario: inputUsername,
                password: inputPassword,
                idDepartamento: selectDepartamento,
                idCiudad: selectCiudad,
            })

    });

    if(response.status === 200){
        const data = await response.json();
        return data;
    }
    else{

        return Promise.reject({
            message: response.status === 401 ? "Las credenciales son invalidas, reintente nuevamente" : "Ha ocurrido un error",
            status: response.status,
        });
    }


    } catch (error) {
        return Promise.reject({
            message: error.message || "Ocurrió un error, por favor intente nuevamente",
        });

    }  
};

const getDepartamentos = async () => {

    try {
      
        const response = await fetch('https://babytracker.develotion.com/departamentos.php',{

            headers: {
                "Content-Type": "application/json",
            },
        });
    
        if(response.status === 200){
    
            const data = await response.json();
            return data;

        } else{

            return Promise.reject({

                message: 'Ha ocurrido un error',
                status: response.status

            })

        }

    } catch (error) {
       
        return Promise.reject({

            message: error.message || "Ocurrió un error, por favor intente nuevamente",

        })
    }
    


}

const getCiudades = async (idDepartamento) => {

    try {
      
        const response = await fetch(`https://babytracker.develotion.com/ciudades.php?idDepartamento=${idDepartamento}` ,{

            headers: {
                "Content-Type": "application/json",
            },
        });
    
        if(response.status === 200){
    
            const data = await response.json();
            return data;

        } else{

            return Promise.reject({

                message: 'Ha ocurrido un error',
                status: response.status

            })

        }

    } catch (error) {
       
        return Promise.reject({

            message: error.message || "Ocurrió un error, por favor intente nuevamente",

        })
    }
    


}

export {registerUserApiCall, getDepartamentos, getCiudades};