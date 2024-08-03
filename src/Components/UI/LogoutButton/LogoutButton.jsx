const LogoutButton = ({ isDisabled, onHandleClick, message, classColor }) => {
    return (
      <button 
      disabled={isDisabled}
      type="submit" 
      className={`btn ${classColor} btn-block`}
      onClick={onHandleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unindent" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M13 8a.5.5 0 0 0-.5-.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H12.5A.5.5 0 0 0 13 8"/>
          <path fill-rule="evenodd" d="M3.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-.5-.5"/>
        </svg>
        {" " + message + " "}
    </button>
    );
  };
  
  LogoutButton.defaultProps = {
    isDisabled: false,
    classColor: "btn-dark",
    message: "Default message",
  };
  
  export default LogoutButton;
  