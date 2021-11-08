import React, { useState, useEffect } from 'react'
import datascience from 'images/user-info/aoi/datascience.svg'
import project from 'images/user-info/aoi/projectmanagement.svg'
import webdev from 'images/user-info/aoi/webdev.svg'
import cloud from 'images/user-info/aoi/cloud.svg'
import ml from 'images/user-info/aoi/ml.svg'
import robotics from 'images/user-info/aoi/robotics.svg'
import coding from 'images/user-info/aoi/coding.svg'
import business from 'images/user-info/aoi/businessanalysis.svg'
import gaming from 'images/user-info/aoi/gaming.svg'
import electrical from 'images/user-info/aoi/electrical.svg'
import uiux from 'images/user-info/aoi/uiux.svg'
import fintech from 'images/user-info/aoi/fintech.svg'
import economics from 'images/user-info/aoi/economics.svg'
import mechanical from 'images/user-info/aoi/mechanical.svg'
import hr from 'images/user-info/aoi/HR.svg'
import marketing from 'images/user-info/aoi/marketing.svg'
import stock from 'images/user-info/aoi/stock.svg'
import { useSelector } from 'react-redux'
import { handleUserInfoChange } from 'StateUpdateHelper'

function AreaOfInterest(props: any) {
    const allInterests = useSelector((state: any) => state.allInterests)
    const userInterests = useSelector(
        (state: any) => state.userInfo.user_interests
    )
    const {
        formField: { aoi },
    } = props

    const addAOI = (interest: any) => {
        const isPresent = userInterests.some(
            (int: any) => int.id === interest.id
        )
        const updatedInterests = isPresent
            ? userInterests
            : [...userInterests, interest]
        handleUserInfoChange('user_interests', updatedInterests)
    }

    console.log('allInterests', allInterests)
    return (
        <section className="area-of-interest">
            <div className="area-of-interest__text">
                <h6 className="heading-secondary size-small">
                    Tell Us What You Are Interested In
                </h6>
                <p className="paragraph-primary--green">
                    Make sure you select atleast three topics
                </p>
            </div>
            <div className="area-of-interest__form">
                <form>
                    <ul className="area-of-interest__form__list">
                        {allInterests.map((item: any, index: number) => {
                            return (
                                <li key={index}>
                                    <div className="area-of-interest__form__list__item">
                                        <input
                                            type="checkbox"
                                            id={`aoi-${index}`}
                                            name={aoi.name}
                                            value={item.name}
                                            onClick={() => addAOI(item)}
                                            hidden
                                        />
                                        <label
                                            className="checkbox-label"
                                            htmlFor={`aoi-${index}`}
                                        >
                                            {/* <img src={item.image} alt="" /> */}
                                            {item.interest}
                                        </label>
                                    </div>
                                </li>
                            )
                        })}
                        <li></li>
                    </ul>
                </form>
            </div>
        </section>
    )
}

export default AreaOfInterest
