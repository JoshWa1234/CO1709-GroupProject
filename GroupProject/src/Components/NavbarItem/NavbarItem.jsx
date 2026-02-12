
function NavbarItem(navBarItemProps) {
    return (
        <>
            <div>
                <a href={navBarItemProps.href}
                   onClick={navBarItemProps.onClick}
                >
                    {navBarItemProps.message}
                </a>
            </div>
        </>
    )
}

export default NavbarItem
