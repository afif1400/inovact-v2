import React from 'react'
import search from 'images/feed/search.svg'
import notifications from 'images/feed/notifications.svg'
import user from 'images/feed/user.png'
import messages from 'images/feed/messages.svg'
import settings from 'images/feed/settings.svg'
import home from 'images/feed/home.svg'
import connection from 'images/feed/connections.svg'
import teams from 'images/feed/teams.svg'
import logo from 'images/logo/inovact-logo.png'
import { of, fromEvent, animationFrameScheduler } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { Link } from 'react-router-dom'
import {
    distinctUntilChanged,
    filter,
    map,
    pairwise,
    switchMap,
    throttleTime,
} from 'rxjs/operators'

const watchScroll = () =>
    of(typeof window === 'undefined').pipe(
        filter((bool) => !bool),
        switchMap(() => fromEvent(window, 'scroll', { passive: true })),
        throttleTime(0, animationFrameScheduler),
        map(() => window.pageYOffset),
        pairwise(),
        map(([previous, current]) => (current < previous ? 'Up' : 'Down')),
        distinctUntilChanged()
    )

const NavBar = () => {
    const scrollDirection = useObservable(watchScroll, 'Up')
    // const removeTheBorder = (target: any)=>{
    //     console.log(target);
    //     const childrenHidden = target.closest(".nav-component__items").querySelectorAll(".nav-component__icons--hidden");
    //     const childrenNotHidden = target.closest(".nav-component__items").querySelectorAll(".nav-component__icons");
    //     const children = [...childrenHidden, ...childrenNotHidden];
    //     children.forEach((node:any)=>{
    //         node.style.borderBottom = "none";
    //     });
    // }
    // const addBorder = (e: any)=>{
    //     removeTheBorder(e.target);
    //     // e.target.style.padding= "10px";
    //     e.target.style.borderBottom = "3px solid #02bd63";
    // }
    return (
        <>
            {/* Top Bar*/}
            <div className="nav-wrapper">
                <div
                    className={`nav-component ${
                        scrollDirection === 'Down' && 'nav-component--scrolled'
                    }`}
                >
                    <div className="nav-component__brand">
                        <img src={logo} alt="logo" />
                        <h2 className="nav-component__brand__brandname">
                            Inovact
                        </h2>
                    </div>
                    <div className="nav-component__items">
                        <div className="nav-component__search">
                            <img src={search} alt="search" />
                            <input
                                type="search"
                                className="input-component--search"
                            />
                        </div>
                        <div className="nav-component__items__item">
                        <Link to="/feed">
                            <img
                                className="nav-component__items__item__icons--hidden"
                                src={home}
                                alt="Home"
                            />
                        </Link>

                        <Link to="/connections">
                            <img
                                className="nav-component__items__item__icons--hidden"
                                src={connection}
                                alt="Connection"
                            />
                        </Link>
                        <Link to="/teams">
                            <img
                                className="nav-component__items__item__icons--hidden"
                                src={teams}
                                alt="Teams"
                            />
                        </Link>
                        <Link to="/notifications">
                            <img
                                className="nav-component__items__item__icons"
                                src={notifications}
                                alt="Notifications"
                            />
                        </Link>
                        <Link to="/messages">
                            <img
                                className="nav-component__items__item__icons"
                                src={messages}
                                alt="messages"
                            />
                        </Link>
                        <Link to="/settings">
                            <img
                                className="nav-component__items__item__icons--hidden"
                                src={settings}
                                alt="settings"
                            />
                        </Link>
                        <Link to="/profile">
                            <img
                                className="nav-component__items__item__icons--user"
                                src={user}
                                alt="User"
                            />
                        </Link>
                        </div>
                        
                    </div>
                </div>

                {/* Bottom NavBar*/}

                <div
                    className={`bottom-nav-component ${
                        scrollDirection === 'Down' &&
                        'bottom-nav-component--scrolled'
                    }`}
                >
                    <div className="bottom-nav-component__items">
                        <Link to="/feed">    
                            <img
                                className="bottom-nav-component__items--active"
                                src={home}
                                alt="home"
                            />
                        </Link>

                        <Link to="/connections">    
                            <img
                                className="bottom-nav-component__items__icons"
                                src={connection}
                                alt="connection"
                            />
                        </Link>
                        <Link to="/teams">
                            <img
                                className="bottom-nav-component__items__icons"
                                src={teams}
                                alt="Team"
                            />
                        </Link>
                        <Link to="/profile">
                            <img
                                className="bottom-nav-component__items__icons--user"
                                src={user}
                                alt="user"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar
