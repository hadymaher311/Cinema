import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Switch from "react-switch";

const Activate = props => {
  const [checked, setChecked] = useState(props.checked);

  const handleChange = () => {
    if (window.confirm("Are you sure?")) {
      Axios.post(props.url)
        .then(response => {
          setChecked(!checked);
        })
        .catch(error => {
          Swal.fire("Oops...", "Something went wrong!", "error");
        });
    }
  };

  return (
    <div>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id={`tooltip-top`}>{checked ? "Admin" : "User"}</Tooltip>
        }
      >
        <Switch onChange={handleChange} checked={checked} />
      </OverlayTrigger>
    </div>
  );
};

export default Activate;
