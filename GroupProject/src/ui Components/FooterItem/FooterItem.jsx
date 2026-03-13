import { Link } from 'react-router-dom';

function FooterItem(footerItemProps) {
    return (
        <>
            <div>
                <Link to={footerItemProps.path}>  {footerItemProps.message}</Link>
            </div>
        </>
    )
}

export default FooterItem
