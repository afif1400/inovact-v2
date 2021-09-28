import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardHeader,
    MDBListGroup,
    MDBListGroupItem,
    MDBCardFooter
  } from "mdb-react-ui-kit";
  
import create from "images/feed/create.svg";
  
interface MyTeams {
    name: string;
    image: string;
    members: number;
  }

const myteams: MyTeams[] = [
    {
      name: "Team Name",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?    ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      members: 122
    },
    {
      name: "Team Name",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?    ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      members: 122
    },
    {
      name: "Team Name",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?    ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      members: 122
    }
  ];
  
  const LeftBottom = (props: any) => {
  
    return (
      <div className="left-right-nav">
        <MDBCard className="left-right-nav__card">
          <MDBCardHeader>
            <MDBCardTitle className="text-style--bold text-align--center">My Teams</MDBCardTitle>
          </MDBCardHeader>
          <MDBCardBody className="left-right-nav__card__body">
            <MDBListGroup flush className="left-right-nav__card__list">
              <MDBListGroupItem className="left-right-nav__card__list__item--create">
                <img src={create} alt="create" onClick={props.openCreateTeam}/>
                <div className="left-right-nav__card__list__item__info">
                  <h6>
                    <a href="/createteam" className="title">
                      Create New Team{" "}
                    </a>
                  </h6>
                </div>
              </MDBListGroupItem>
              {myteams.map(({ name, image, members }, index) => {
                return (
                  <MDBListGroupItem className="left-right-nav__card__list__item">
                    <img src={image} alt={name} />
                    <div className="left-right-nav__card__list__item__info">
                      <h2 className="text-style--bold text-align--left text-size--big">{name}</h2>
                      <p className="text-style--bold text-align--left text-color--gray text-size--small">{members} members</p>
                    </div>
                  </MDBListGroupItem>
                );
              })}
            </MDBListGroup>
          </MDBCardBody>
          <MDBCardFooter className="left-right-nav__card__footer ">
            <a href="/" className="text-style--bold text-align--center text-color--white">
              View All
            </a>
          </MDBCardFooter>
        </MDBCard>
      </div>
    );
  };
  export default LeftBottom;
  