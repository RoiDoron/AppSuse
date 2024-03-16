const {useParams, Link, useSearchParams, Outlet } = ReactRouterDOM

export function Home() {
    return <section className="home">
        <h1>AppSuse one app to rule theme all!</h1>
        <Link to="/started" ><button className="start-btn">Get stated</button></Link>
        <Link to="/about" ><button className="start-btn">About</button></Link>

        <Outlet/>
    </section>
}