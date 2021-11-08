import React, { useEffect, useState } from 'react'

import { MDBRow, MDBCol } from 'mdb-react-ui-kit'
import { Field } from 'formik'

//remove this
// const yearOptions = [
//     { value: '1960', label: '1960' },
//     { value: '1961', label: '1961' },
//     { value: '1962', label: '1962' },
//     { value: '1963', label: '1963' },
//     { value: '1964', label: '1964' },
//     { value: '1965', label: '1965' },
// ]

const degrees = [
    { value: '1', label: 'B.E' },
    { value: '2', label: 'B.Com' },
    { value: '3', label: 'B.sc' },
]

export default function GeneralForm(props: any) {
    const {
        formField: { firstName, lastName, university, degree, year },
    } = props
    const [userDegree, setUserDegree] = useState('')
    const [userYOG, setUserYOG] = useState('')
    const [yearOptions, setYearOptions] = useState<
        {
            value: string
            label: string
        }[]
    >([])
    const handleDegreeChange = (deg: any) => {
        setUserDegree(deg)
    }
    const getYearData = () => {
        let yearData: {
            value: string
            label: string
        }[] = []

        let currentYear = new Date().getFullYear()
        let earliestYear = 1970

        while (currentYear >= earliestYear) {
            const currentYearStr = currentYear.toString()
            yearData.push({ value: currentYearStr, label: currentYearStr })
            currentYear -= 1
        }
        return yearData
    }
    const handleYOGChange = (yog: any) => {
        setUserYOG(yog)
    }
    useEffect(() => {
        setYearOptions(getYearData())
    }, [])
    return (
        <React.Fragment>
            <section className="user-details">
                <div className="user-details__text">
                    <h6 className="heading-secondary">
                        Let Us Know More About You
                    </h6>
                    <p className="paragraph-primary--red">*Mandatory fields</p>
                </div>
                <div className="user-details__form">
                    <MDBRow>
                        <MDBCol md="6">
                            <div>
                                <label htmlFor="university">
                                    First Name{' '}
                                    <span className="paragraph-primary--red">
                                        *
                                    </span>
                                </label>
                                <Field
                                    name="first-name"
                                    className="input-formComponent"
                                    type="text"
                                    placeholder="Enter Your FirstName"
                                    onChange={(event: any) =>
                                        props.handleChange(
                                            'first-name',
                                            event.target.value
                                        )
                                    }
                                />
                            </div>
                        </MDBCol>
                        <MDBCol md="6">
                            <div>
                                <label htmlFor="university">
                                    Last Name{' '}
                                    <span className="paragraph-primary--red">
                                        *
                                    </span>
                                </label>
                                <Field
                                    name="last-name"
                                    className="input-formComponent"
                                    type="text"
                                    placeholder="Enter Your LastName"
                                    onChange={(event: any) =>
                                        props.handleChange(
                                            'last-name',
                                            event.target.value
                                        )
                                    }
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="12">
                            <label htmlFor="university">
                                University/College{' '}
                                <span className="paragraph-primary--red">
                                    *
                                </span>
                            </label>
                            <Field
                                name="college"
                                className="input-formComponent"
                                type="text"
                                placeholder="Enter Your University or College"
                                onChange={(event: any) =>
                                    props.handleChange(
                                        'university',
                                        event.target.value
                                    )
                                }
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="12">
                            <div className="form-group">
                                <label htmlFor="degree">
                                    Degree{' '}
                                    <span className="paragraph-primary--red">
                                        *
                                    </span>
                                </label>
                                <br />
                                <Field
                                    className="input-formComponent"
                                    as="select"
                                    id="degree"
                                    value={userDegree}
                                    onChange={(event: any) => {
                                        handleDegreeChange(event.target.value)
                                        props.handleChange(
                                            'degree',
                                            event.target.value
                                        )
                                    }}
                                >
                                    <option
                                        value="Enter your degree"
                                        label="Enter your degree"
                                    >
                                        Enter your degreee{' '}
                                    </option>
                                    {degrees.map((item) => (
                                        <option
                                            value={item.label}
                                            label={item.label}
                                        >
                                            {item.label}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="12">
                            <label htmlFor="year">
                                Year Of Graduation
                                <span className="paragraph-primary--red">
                                    *
                                </span>
                            </label>
                            <br />

                            <Field
                                className="input-formComponent"
                                value={userYOG}
                                as="select"
                                name={year.name}
                                id="year"
                                onChange={(event: any) => {
                                    handleYOGChange(event.target.value)
                                    props.handleChange(
                                        'graduation-year',
                                        event.target.value
                                    )
                                }}
                            >
                                <option
                                    value=" Select the  Year Of Graduation"
                                    label=" Select the  Year Of Graduation"
                                >
                                    Select the Year Of Graduation{' '}
                                </option>
                                {yearOptions.map((item) => (
                                    <option
                                        value={item.label}
                                        label={item.label}
                                    >
                                        {item.value}
                                    </option>
                                ))}
                            </Field>
                        </MDBCol>
                    </MDBRow>
                </div>
                <div> {firstName.error && <div>hi</div>} </div>
            </section>
        </React.Fragment>
    )
}
