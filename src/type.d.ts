interface IUser {
    first_name?: string
    last_name?: string
    user_name?: string
    bio?: string
    avatar?: string
    phone_number?: string
    email_id?: string
    status?: string
    designation?: string
    organization?: string
    organization_role?: string
    summary?: string
    university?: string
    graduation_year?: string
    journey_start_date?: string
    years_of_personal_experience?: number
    userId?: string
}

type UserState = {
    user: IUser
}

type UserAction = {
    type: string
    payload: IUser
}

type DispatchType = (args: UserAction) => UserAction
