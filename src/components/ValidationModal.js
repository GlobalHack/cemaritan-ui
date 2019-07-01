import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link} from 'react-router-dom';

const ValidationModal = (props) => (
  <Modal show={props.show} onHide={props.onHide}>
    <Modal.Header>
      <Modal.Title>
        {props.success ? (
          <div className="text-success">
            <span className="oi oi-circle-check" title="success checkmark icon" aria-hidden="true"></span>
            &nbsp;&nbsp;{props.title}
          </div>
        ) : (
          <div className="text-danger">
            <span className="oi oi-circle-x" title="error x icon" aria-hidden="true"></span>
            &nbsp; &nbsp;{props.title}
          </div>
        )}
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>{props.text}</p>
    </Modal.Body>

    <Modal.Footer>
      {!props.success ? (
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      ) : (
        props.successActions && props.successActions.map(na => {
          const key = `dialog-action-${na.label.toLowerCase().split(' ').join('-')}`;
          if (na.link) {
            return (
              <Link
                key={key}
                to={na.link}
              >
                <Button variant="primary">{na.label}</Button>
              </Link>
            );
          }
          return (
            <Button key={key} variant="primary" onClick={na.onClick}>{na.label}</Button>
          );
        })
      )}
    </Modal.Footer>
  </Modal>
);

export default ValidationModal;
