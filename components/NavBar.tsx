import React from 'react'
import Link from 'next/link'


function NavBar() {
    return (
        <>
            <div className="navbar bg-base-100 self-start">
                <div className="navbar-start">
                    <Link href={"/"} className="btn btn-ghost normal-case text-2xl">VNote Pro</Link>
                </div>
            </div>
        </>
    )
}

export default NavBar