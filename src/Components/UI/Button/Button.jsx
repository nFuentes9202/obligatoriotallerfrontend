const Button = ({ isDisabled, onHandleClick, message, classColor }) => {
    return (
      <button
        disabled={isDisabled}
        type="submit"
        className={`btn ${classColor} btn-block`}
        onClick={onHandleClick}
      >
        {message}
      </button>
    );
  };
  
  Button.defaultProps = {
    isDisabled: false,
    classColor: "btn-dark",
    message: "Default message",
  };
  
  export default Button;
  