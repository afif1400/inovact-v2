import React from 'react';
import Form from './Form';

type AppProps = {
    nextStep: any,
    handleChange: any,
    values:any,
    prevStep:any
};

const UserDetails = ({ prevStep,nextStep, handleChange, values }:AppProps) => {

  const Continue = (e: any) => {
    e.preventDefault();
    nextStep(3);
  }
  const Previous = (e:any) => {
    e.preventDefault();
    prevStep(1);
  }

  return (

    <div className="user-info">
      <div className="user-info__card">
         <section className="student-info">
            <div className="student-info__text">
                <h6 className="heading-secondary">Let Us Know More About You</h6>
                <p className="paragraph-primary--red">*Mandatory fields</p>
            </div>
            <div className="student-info__form">
              <Form prevStep={1} nextStep={3} handleChange={handleChange} values={values} />
            </div>
            <div className="buttons">
                  <button
                    onClick={ Previous } 
                    className="button button--white">Back</button>
                    <button 
                        onClick={ Continue } 
                        className="button button--green">Next</button>
                </div>
        </section>
    </div>
</div>)}

export default UserDetails;
