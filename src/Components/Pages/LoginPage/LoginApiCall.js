const loginApiCall = async (inputUsername, inputPassword) => {

    try {
    
        const response = await fetch('https://babytracker.develotion.com/login.php',{

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuario: inputUsername,
                password: inputPassword,
            })

        
    });

    if(response.status === 200){
        const data = await response.json();
        return data;
    }
    else{

        return Promise.reject({
            message: "Ha ocurrido un error",
            status: response.status,
        });
    }


    } catch (error) {
        return Promise.reject({
            message: error.message || "Ocurrió un error, por favor intente nuevamente",
        });

    }  
};

export {loginApiCall};