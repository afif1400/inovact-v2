import Spinner from 'components/application/Spinner'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import makeApiCall from '../settings/makeApiCall'
import NotificationTag from './NotificationTag'
import { mapApiNotisficationDataToUiData } from './NotisficationUtils'
import { Link, useHistory } from 'react-router-dom'

function Notifications() {
    const [allNotisfication, setAllNotisfication] = useState<any>({})
    const [isLoad, setIsLoad] = useState<boolean>(true)
    const [allnotification, setallnotification] = useState<any>({})
    const history = useHistory()
    const ownId = useSelector((state: any) => state.userInfo.id)

    const getRemovedCurrentUserFromLikeProperty = (
        notif: any,
        like_type: string,
        ownId: number
    ) => {
        let likes = notif[like_type]
        let likesWithoutCurrUser = likes.filter(
            (like: any) => like.user.id !== ownId
        )
        return likesWithoutCurrUser
    }

    const getNotificationTypePropertyAdded = (allnotifications: any) => {
        let newNotisfications: any = []
        ;[
            'connectionsByUser2',
            'ideas',
            'projects',
            'team_invitations',
            'thoughts',
        ].forEach((notif_type: string) => {
            newNotisfications[notif_type] = allnotifications[notif_type].map(
                (notif: any) => ({ type: notif_type, ...notif })
            )
        })
        return newNotisfications
    }
    const deleteNotisfication = (id: number, type: string) => {
        setallnotification(
            allnotification.filter(
                (notif: any) => notif.id !== id || notif.type !== type
            )
        )
    }
    const getRemovedCurrentUserNotifications = (
        post_notifs: any,
        post_type: string
    ) => {
        let like_type: any = { projects: 'project_likes', ideas: 'idea_likes' }
        let newPostNotifs: any = []
        post_notifs.forEach((notif: any) => {
            let post_notifs_without_curruser =
                getRemovedCurrentUserFromLikeProperty(
                    notif,
                    like_type[post_type],
                    ownId
                )
            if (post_notifs_without_curruser.length !== 0) {
                newPostNotifs.push({
                    ...notif,
                    project_likes: post_notifs_without_curruser,
                })
            }
        })
        return newPostNotifs
    }

    useEffect(() => {
        ;(async () => {
            try {
                const res = await makeApiCall('get', 'notifications')

                var responseWihtoutRemovingCurrentUser = res.data.data.user[0]
                responseWihtoutRemovingCurrentUser['projects'] =
                    getRemovedCurrentUserNotifications(
                        responseWihtoutRemovingCurrentUser['projects'],
                        'projects'
                    )
                responseWihtoutRemovingCurrentUser['ideas'] =
                    getRemovedCurrentUserNotifications(
                        responseWihtoutRemovingCurrentUser['ideas'],
                        'ideas'
                    )
                console.log(
                    'responseWihtoutRemovingCurrentUser',
                    responseWihtoutRemovingCurrentUser
                )
                setAllNotisfication(responseWihtoutRemovingCurrentUser)
                let filteredAllNotisfications =
                    getNotificationTypePropertyAdded(
                        responseWihtoutRemovingCurrentUser
                    )
                console.log(
                    'responseWihtoutRemovingCurrentUser',
                    responseWihtoutRemovingCurrentUser
                )
                console.log(
                    'filteredAllNotisfications',
                    filteredAllNotisfications
                )
                const notificationsWithoutUiMappedData = [
                    ...filteredAllNotisfications['connectionsByUser2'],
                    ...filteredAllNotisfications['ideas'],
                    ...filteredAllNotisfications['projects'],
                    ...filteredAllNotisfications['team_invitations'],
                    ...filteredAllNotisfications['thoughts'],
                ]
                const uiMappedNotification =
                    notificationsWithoutUiMappedData.map((notif: any) =>
                        mapApiNotisficationDataToUiData(
                            notif,
                            notif.type,
                            Link,
                            goToProfile,
                            goToTeam
                        )
                    )
                const sortedNotification = uiMappedNotification.sort(
                    (notif1: any, notif2: any) => {
                        const post1Date: any = new Date(notif1.time_string)
                        const post2Date: any = new Date(notif2.time_string)
                        return post2Date.getTime() - post1Date.getTime()
                    }
                )
                setallnotification(sortedNotification)
                setIsLoad(false)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    const goToProfile = (id: string) => {
        localStorage.setItem('other-user', id)
        console.log('other-user', id)

        history.push('/app/otherprofile')
    }
    const goToTeam = (teamid: string, userId: string) => {
        console.log('teamid:', teamid, 'userId:', userId)
        localStorage.setItem('other-user-selected-team-id', teamid)
        localStorage.setItem('other-user', userId)

        history.push('/app/otherteams')
    }
    return (
        <div className="notifications-main">
            {isLoad && <Spinner />}

            {!isLoad &&
                allnotification.length &&
                allnotification.map((notification: any) => {
                    return (
                        <NotificationTag
                            key={Math.round(Math.random() * 10000)}
                            notification={notification}
                            deleteNotisfication={deleteNotisfication}
                        />
                    )
                })}
            {!isLoad && allnotification.length === 0 && 'No Notifications'}
        </div>
    )
}

export default Notifications
