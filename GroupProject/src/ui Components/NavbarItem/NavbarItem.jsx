import { Link } from 'react-router-dom';
function NavbarItem(navBarItemProps) {
    return (
        <>
            <div>
                <Link to={navBarItemProps.path} href={navBarItemProps.href}
                   onClick={navBarItemProps.onClick}
                >
                    {navBarItemProps.message}
                </Link>
            </div>
        </>
    )
}

export default NavbarItem