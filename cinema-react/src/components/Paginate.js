import React from "react";
import { Pagination } from "react-bootstrap";

const Paginate = props => {
  const last_page = props.meta ? props.meta.last_page : 1;

  const paginations = [];
  for (let index = 1; index <= last_page; index++) {
    const active = index === props.meta.current_page;
    paginations.push(
      <Pagination.Item
        key={index}
        active={active}
        onClick={() => props.onPageChange(index)}
      >
        {index}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => props.onPageChange(1)} />
      <Pagination.Prev
        disabled={props.meta.current_page === 1}
        onClick={() => props.onPageChange(props.meta.current_page - 1)}
      />
      {paginations}
      <Pagination.Next
        disabled={props.meta.current_page === props.meta.last_page}
        onClick={() => props.onPageChange(props.meta.current_page + 1)}
      />
      <Pagination.Last
        onClick={() => props.onPageChange(props.meta.last_page)}
      />
    </Pagination>
  );
};

export default Paginate;
