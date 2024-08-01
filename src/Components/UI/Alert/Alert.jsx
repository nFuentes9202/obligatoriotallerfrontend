const Alert = ({message, classColor}) => {

return (

    <div className={`alert ${classColor}`} role="alert">
        {message}
    </div>

    );
};

Alert.defaultProps = {

    message: "Default Message",
    classColor: "alert-success",
}

export default Alert;