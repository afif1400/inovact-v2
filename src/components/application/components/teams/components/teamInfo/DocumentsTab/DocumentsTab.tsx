import { documentUploader } from 'imageUpload/docsUploader'
import React from 'react'
import pdf from 'images/teams/pdf.svg'

const DocumentsTab = (props: any) => {
    return (
        <>
            <div className="documents-info">
                {props.team.team_documents.length == 0 ? (
                    <div className="text-align--center">No Documents yet </div>
                ) : null}
                {props.team.team_documents.map((item: any, index: number) => {
                    return (
                        <a
                            href={item.url}
                            className="documents-info__document"
                            key={index}
                        >
                            <img src={pdf} alt="name" />
                            <h5 className="text-size--small">{item.name}</h5>
                        </a>
                    )
                })}
                <button
                    className="text-style--bold text-color--green documents-info__addFile"
                    onClick={props.viewUploadDocument}
                >
                    Add File
                    <span className="text-style--bold text-color--green member-info-tab__addFile__icon">
                        +{' '}
                    </span>
                </button>
            </div>
        </>
    )
}
export default DocumentsTab
