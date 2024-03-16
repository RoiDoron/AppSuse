const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3><img src="./assets/favicon_package_v0.16/apple-touch-icon.png" alt="" /> Apsus</h3>
        </Link>
        <nav>
            <NavLink to="/"><img src="./assets/img/home.webp" alt="" /></NavLink>
            {/* <NavLink to="/about">About</NavLink> */}
            <NavLink to="/mail"><img className="mail-header" src="./assets/img/gmail.png" alt="" /></NavLink>
            <NavLink to="/note"><img src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png" alt="" /></NavLink>
            <a href="https://yahavganon.github.io/Miss-Book/"><img src="./assets/img/books.png" alt="" /></a>
        </nav>
    </header>
}
