import { findTimeDiffString } from '../connections/components/connectionsUtils'

const mapApiNotisficationDataToUiData = (
    notisficationFromApi: any,
    notisfiation_type: string,
    Link: any,
    goToProfile: any,
    goToTeam: any
) => {
    switch (notisfiation_type) {
        case 'connectionsByUser2': {
            return {
                id: notisficationFromApi.user1,
                img: notisficationFromApi.user.avatar,
                type: 'connectionsByUser2',
                time_string: notisficationFromApi.created_at,
                comment: (
                    <p className="notifications-tag-comment">
                        <b
                            onClick={() =>
                                goToProfile(notisficationFromApi.user1)
                            }
                        >
                            {notisficationFromApi.user.first_name +
                                ' ' +
                                notisficationFromApi.user.last_name}
                        </b>{' '}
                        want to connect with you
                    </p>
                ),
                time: findTimeDiffString(notisficationFromApi.created_at),
            }
        }
        case 'ideas':
            return {
                id: notisficationFromApi.id,
                img: notisficationFromApi.idea_likes[0].user.avatar,
                type: 'ideas',
                isCurrUserNotisfication: false,
                time_string: notisficationFromApi.idea_likes[0].liked_at,
                comment: (
                    <p className="notifications-tag-comment">
                        <b>
                            {notisficationFromApi.idea_likes[0].user
                                .first_name +
                                ' ' +
                                notisficationFromApi.idea_likes[0].user
                                    .last_name}
                        </b>{' '}
                        {notisficationFromApi.idea_likes.length > 1 &&
                            `other ${notisficationFromApi.idea_likes.length}`}
                        liked the idea{' '}
                        <Link
                            to={`/ideas/${notisficationFromApi.id}`}
                            style={{ color: '#4F4F4F' }}
                        >
                            <b>{notisficationFromApi.title}</b>
                        </Link>
                    </p>
                ),
                time: findTimeDiffString(
                    notisficationFromApi.idea_likes[0].liked_at
                ),
            }
        case 'thoughts':
            return {
                id: notisficationFromApi.id,
                img: notisficationFromApi.thought_likes[0].user.avatar,
                type: 'thoughts',
                time_string: notisficationFromApi.thought_likes[0].liked_at,
                comment: (
                    <p className="notifications-tag-comment">
                        <b>
                            {notisficationFromApi.thought_likes[0].user
                                .first_name +
                                ' ' +
                                notisficationFromApi.thought_likes[0].user
                                    .last_name}
                        </b>{' '}
                        {notisficationFromApi.thought_likes.length > 1 &&
                            `other ${notisficationFromApi.thought_likes.length}`}
                        liked the thought{' '}
                        <Link
                            to={`/ideas/${notisficationFromApi.id}`}
                            style={{ color: '#4F4F4F' }}
                        >
                            <b>{notisficationFromApi.title}</b>
                        </Link>
                    </p>
                ),
                time: findTimeDiffString(
                    notisficationFromApi.thought_likes[0].liked_at
                ),
            }
        case 'projects': {
            return {
                id: notisficationFromApi.id,
                img: notisficationFromApi.project_likes[0].user.avatar,
                type: 'projects',
                time_string: notisficationFromApi.project_likes[0].liked_at,
                comment: (
                    <p className="notifications-tag-comment">
                        <b>
                            {notisficationFromApi.project_likes[0].user
                                .first_name +
                                ' ' +
                                notisficationFromApi.project_likes[0].user
                                    .last_name}
                        </b>{' '}
                        {notisficationFromApi.project_likes.length > 1 &&
                            `other ${notisficationFromApi.project_likes.length}`}
                        liked the project{' '}
                        <Link
                            to={`/posts/${notisficationFromApi.id}`}
                            style={{ color: '#4F4F4F' }}
                        >
                            <b>{notisficationFromApi.title}</b>
                        </Link>
                    </p>
                ),
                time: findTimeDiffString(
                    notisficationFromApi.project_likes[0].liked_at
                ),
            }
        }
        case 'team_invitations': {
            return {
                id: notisficationFromApi.team.id,
                img: notisficationFromApi.team.team_members[0].user.avatar,
                type: 'team_invitations',
                invitation_id: notisficationFromApi.id,
                time_string: notisficationFromApi.invited_at,
                comment: (
                    <p className="notifications-tag-comment">
                        <b>
                            {notisficationFromApi.team.team_members[0].user
                                .first_name +
                                ' ' +
                                notisficationFromApi.team.team_members[0].user
                                    .last_name}
                        </b>{' '}
                        invited you to team{' '}
                        <b
                            onClick={() =>
                                goToTeam(
                                    notisficationFromApi.team.id,
                                    notisficationFromApi.team.team_members[0]
                                        .user.id
                                )
                            }
                        >
                            {notisficationFromApi.team.name}
                        </b>
                    </p>
                ),
                time: findTimeDiffString(notisficationFromApi.invited_at),
            }
        }
    }
}

export { mapApiNotisficationDataToUiData }
