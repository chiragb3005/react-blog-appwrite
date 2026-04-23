import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import Container from '../container/Container'

function Footer() {
    return (
        <footer className="px-4 pb-6 pt-2 sm:px-6 lg:px-8">
            <Container>
                <section className="section-card overflow-hidden px-6 py-10 sm:px-8">
                    <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr,1fr,1fr]">
                        <div className="space-y-5">
                            <Logo width="190px" />
                            <p className="max-w-md text-sm leading-7 text-slate-600">
                                A quieter blog workspace built around long-form writing, Appwrite-powered publishing, and a warmer editorial feel.
                            </p>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Crafted for drafts, edits, and clean reading.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Explore
                            </h3>
                            <ul className="space-y-3 text-sm text-slate-700">
                                <li><Link className="transition hover:text-[var(--accent-strong)]" to="/">Home</Link></li>
                                <li><Link className="transition hover:text-[var(--accent-strong)]" to="/all-posts">All Posts</Link></li>
                                <li><Link className="transition hover:text-[var(--accent-strong)]" to="/add-post">Write</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Account
                            </h3>
                            <ul className="space-y-3 text-sm text-slate-700">
                                <li><Link className="transition hover:text-[var(--accent-strong)]" to="/login">Login</Link></li>
                                <li><Link className="transition hover:text-[var(--accent-strong)]" to="/signup">Signup</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Note
                            </h3>
                            <p className="text-sm leading-7 text-slate-600">
                                Designed with layered paper tones, rounded glass panels, and a stronger editorial hierarchy across the app.
                            </p>
                        </div>
                    </div>
                </section>
            </Container>
        </footer>
    )
}

export default Footer
