const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { MailDetails } from "./apps/mail/views/MailDetails.jsx"
import { MailList } from "./apps/mail/cmps/MailList.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { EmailCompose } from "./apps/mail/cmps/EmailCompose.jsx"
import { Started } from "./cmps/Started.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} >
                    <Route path="/started" element={<Started/>}/>
                    <Route path="/about" element={<About/>}/>
                </Route>

                <Route path="/mail" element={<MailIndex />} />

                <Route path="/mail/:title/:text/:src/:url" element={<MailIndex />} />

                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/:title/:txt" element={<NoteIndex />} />
            </Routes>
        </section>
        <UserMsg />
    </Router>
}

