import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import Axios from "axios";
import Activate from "../../components/Activate";
import Swal from "sweetalert2";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      type="text"
      className="form-control"
      placeholder="Search ..."
      style={{ width: "auto" }}
      value={filterText}
      onChange={onFilter}
    />
    <button className="btn btn-danger" onClick={onClear}>
      X
    </button>
  </>
);

const columns = [
  {
    name: "#",
    selector: "id",
    sortable: true,
    maxWidth: "60px"
  },
  {
    name: "Name",
    selector: "name",
    sortable: true
  },
  {
    name: "Username",
    selector: "username",
    sortable: true
  },
  {
    name: "Email",
    selector: "email",
    sortable: true
  },
  {
    name: "Birth date",
    selector: "birth_date"
  },
  {
    name: "Created at",
    selector: "created_at",
    cell: row => {
      moment.locale("ar");
      return moment(row.created_at).fromNow();
    }
  },
  {
    name: "Is Admin",
    selector: "is_admin",
    cell: row => (
      <Activate
        url={`http://localhost:8000/api/admin/users/toggle_admin/${row.id}`}
        checked={row.is_admin}
      />
    )
  }
];

const Users = props => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const filteredItems = data.filter(
    item =>
      (item.name && item.name.includes(filterText)) ||
      (item.email && item.email.includes(filterText)) ||
      (item.added_by && item.added_by.includes(filterText))
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  useEffect(() => {
    fetchData(1, perPage);
  }, []);

  const fetchData = async (page, perPage) => {
    setLoading(true);

    Axios.get(
      `http://localhost:8000/api/admin/users?page=${page}&per_page=${perPage}`
    )
      .then(response => {
        setData(response.data.data);
        setTotalRows(response.data.meta.total);
        setPerPage(perPage);
      })
      .catch(error => {
        Swal.fire("Oops...", "Something went wrong!", "error");
      });

    setLoading(false);
  };

  const handlePageChange = page => {
    fetchData(page, perPage);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchData(page, newPerPage);
  };

  return (
    <div>
      <div className="container">
        <DataTable
          title="Users Table"
          columns={columns}
          data={filteredItems}
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          progressPending={loading}
          pagination
          paginationServer
          highlightOnHover
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          progressComponent={"Loading..."}
          persistTableHead
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Users;
