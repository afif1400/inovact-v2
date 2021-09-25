import React, { useState, useEffect } from 'react'
import SettingsLeft from './components/SettingsLeft.tsx/SettingsLeft'
import MenuIcon from '@material-ui/icons/Menu'
import back from 'images/teams/back.svg'

const options: { name: string; main: string; sub: string }[] = [
    {
        name: 'profile',
        main: 'Your Profile',
        sub: 'Details about your account',
    },
    {
        name: 'privacysettings',
        main: 'Privacy Settings',
        sub: 'Control who views your account',
    },
    { name: 'team', main: 'Team Settings', sub: '' },
    { name: 'permissions', main: 'Permissions', sub: '' },
    { name: 'privacypolicy', main: 'Privacy Policy', sub: '' },
    { name: 'faq', main: 'FAQ and Support ', sub: '' },
]

const Settings: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState('profile')

    const SIZE_LIMIT: number = 768

    const [showLeft, setShowLeft] = useState(true)
    const [showRight, setShowRight] = useState(true)

    const [width, setWidth] = useState(window.innerWidth)

    const handleWindowResize = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    useEffect(() => {
        if (width > SIZE_LIMIT) {
            setShowLeft(true)
            setShowRight(true)
        } else {
            setShowLeft(false)
            setShowRight(true)
        }
    }, [width])

    return (
        <div className={'settings'}>
            <div
                className={`settings-breadcrumb ${
                    width < SIZE_LIMIT
                        ? 'settings-breadcrumb-mobile'
                        : 'settings-breadcrumb-pc'
                }`}
            >
                {width > SIZE_LIMIT && <div>&lt;&lt;Back to Profile</div>}
                {width < SIZE_LIMIT && <img src={back} alt="" />}
                {width < SIZE_LIMIT && (
                    <div className={' heading-secondary'}>Account Settings</div>
                )}
                {width < SIZE_LIMIT && (
                    <MenuIcon
                        onClick={() => {
                            setShowLeft(!showLeft)
                            setShowRight(!showRight)
                        }}
                    />
                )}
            </div>
            <div className="settings-main">
                {showLeft && (
                    <div className={'settings-main-left'}>
                        <SettingsLeft
                            selected={'profile'}
                            onSelection={setSelectedOption}
                            options={options}
                            onclick={() => {
                                if (width < SIZE_LIMIT) {
                                    setShowLeft(!showLeft)
                                    setShowRight(!showRight)
                                }
                            }}
                        />
                    </div>
                )}

                {showRight && (
                    <div className={'settings-main-right'}>right</div>
                )}
            </div>
        </div>
    )
}

export default Settings
