import React from 'react'


function MakeAdmin(props: any) {
    return (
        <div className="modal_main">
        <div className="modal_cover">
              <button className="close-modal" >&times;</button>
        <div className="modal_part_one">
            <p className="yes-no--paragraph">
            Are you sure you want to make Matt Lee Admin ?
            </p>
        </div>
        <div className="yes-no-buttons">
            <button className="modal_cover-post-btn--green">Yes</button>
            <button className="modal_cover-post-btn">No</button>
        </div>
      </div>
     </div>
    );
  }
  export default MakeAdmin;
  