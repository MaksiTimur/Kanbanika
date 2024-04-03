import './Header.css';
import { NavLink } from 'react-router-dom';
import { FaGithub } from "react-icons/fa6";

const Header = () => {
    return (
        <header>
            <NavLink className="logo" to={'/boards'}>Kanbanika</NavLink>
            <a className='icon-link' aria-label='Open GitHub repository' href='https://github.com/MaksiTimur/Kanbanika' target='_blank'>
                <FaGithub className='icon' />
            </a>
        </header>
    )
}

export default Header;
