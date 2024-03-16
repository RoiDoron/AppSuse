
const{Link} =ReactRouterDOM
export function Started(){
    return <section className="started-container">
        <div className="card">
            <img src="./assets/img/gmail.png" alt="" />
            <h3>Apsuse Email</h3>
            <p>Appsuse mail an intuitive and functional.</p>
            <Link to="/mail"><button className="card-btn">try me</button></Link>
        </div>
        <div className="card">
        <img src="./assets/img/keep.png" alt="" />
            <h3>Apsuse Keep</h3>
            <p>Appsuse Keep the best way to "Keep" your notes.</p>
        <Link to="/note"><button className="card-btn">try me</button></Link>
        </div>
    </section>
}