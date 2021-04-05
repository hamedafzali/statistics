import React from "react";

const Commit = (props) => {
  let classes = "fa fa-heart";
  if (!props.commited) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default LCommitike;
