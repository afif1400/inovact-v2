import React from 'react';
import { MDBRow, MDBCol,MDBBtn ,MDBInput} from 'mdb-react-ui-kit'
type AppProps = {
    nextStep: any,
    handleChange: any,
    values:any,
    prevStep:any
};
const Enterprenuer = ({ prevStep,nextStep, handleChange, values }:AppProps) => {

  const Continue = (e: any) => {
    e.preventDefault();
    nextStep(4);
  }
  const Previous = (e:any) => {
    e.preventDefault();
    prevStep(2);
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
              <form>
              <MDBRow>
                <MDBCol md='12'>
                      <div className="form-group">
                      <label htmlFor="university">Current Organization <span className="paragraph-primary--red">*</span></label>
                    <MDBInput className="input" label="Enter you Current Organization" outline onChange={handleChange('EcurrOrganization')} defaultValue={values.EcurrOrganization} />
                      </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md='12'>
                  <div className="form-group">
                        <label htmlFor="degree">Current  Role <span className="paragraph-primary--red">*</span></label>
                        <MDBInput className="input" label="Enter your Current Role" outline onChange={handleChange('EcurrRole')} defaultValue={values.EcurrRole} />
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md='12'>
                  <div className="form-group">
                        <label htmlFor="year">When did you start your Enterprenuer Journey? <span className="paragraph-primary--red">*</span></label>
                        <MDBInput className="input" label="Enter your year you started your journey as an enterprenuer" outline  onChange={handleChange('EstartOfJourney')} defaultValue={values.EstartOfJourney}/>
                  </div>
                </MDBCol>
              </MDBRow>
              </form>
           
              <div className="buttons">
              <MDBBtn color='default' 
                                onClick={ Previous } className="button button__white">Back</MDBBtn>
                <MDBBtn color='success' 
                                onClick={ Continue }  className="button button__green">Next</MDBBtn>
              </div>
            </div>
          </section>
    </div>
</div>

  )
}

export default Enterprenuer;
export {};