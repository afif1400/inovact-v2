import React, { useState, useEffect } from 'react'
import SettingsLeft from './components/SettingsLeft.tsx/SettingsLeft'
import MenuIcon from '@material-ui/icons/Menu'
import back from 'images/teams/back.svg'
import PrivacySettings from './components/PrivacySettings/PrivacySettings'
import Notifications from './components/Notifications/Notifications'
import Faq from './components/Faq/Faq'
import TeamSettings from './components/TeamSettings/TeamSettings'

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
    { name: 'team', main: 'Team Settings', sub: 'Manage team acess' },
    {
        name: 'notifications',
        main: 'Notifications',
        sub: 'Change notification settings',
    },
    { name: 'privacypolicy', main: 'Privacy Policy', sub: '' },
    { name: 'faq', main: 'FAQ and Support ', sub: '' },
]

const Settings: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState(0)

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

    const toggleShowOptions = () => {
        if (window.innerWidth < SIZE_LIMIT) {
            setShowLeft(!showLeft)
            setShowRight(!showRight)
        }
    }
    const onSelection = (selection: number) => {
        setSelectedOption(selection)
        console.log(selection)
        console.log(showLeft, showRight)
        if (width < SIZE_LIMIT) {
            setShowLeft(!showLeft)
            setShowRight(!showRight)
        }
    }
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
                            selected={selectedOption}
                            onSelection={onSelection}
                            options={options}
                        />
                    </div>
                )}

                {showRight && (
                    <div className={'settings-main-right'}>
                        {selectedOption == 1 && <PrivacySettings />}
                        {selectedOption == 2 && <TeamSettings />}
                        {selectedOption == 3 && <Notifications />}
                        {selectedOption == 5 && <Faq />}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Settings
