import React from "react";

import './styles.css';

interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    pageUrl: any;
  }

export  const NewsView = ({ closeModal, pageUrl }: IModalProps) => {
  // console.log("Url: ", pageUrl)
  return (
    <div className="modal">
    <div className="modal-header">
      <h2
        onClick={() => {
          closeModal(false);
        }}
      >
        X
      </h2>
    </div>
    <div className="modal-body">
    <iframe src={ pageUrl }  ></iframe>
    </div>
  </div>
  )
}

// export default NewsView
