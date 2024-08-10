import './Header.css'
import LogoutButton from "../../../UI/LogoutButton/LogoutButton";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../app/slices/userSlice';

const Header = () => {

const dispatcher = useDispatch();

const _onLogout = () => {

  dispatcher(logoutUser());

}

return(
<header className="row">
      <div className="col-12 d-flex justify-content-between align-items-center my-3">
        <div className="d-flex align-items-center">

          <h1>Control de infantes</h1>
        </div>
        <div>
        <LogoutButton
            message={"Logout"}
            classColor={"btn-light"}
            onHandleClick={_onLogout}
          />
        </div>
      </div>
    </header>
)
}

export default Header;