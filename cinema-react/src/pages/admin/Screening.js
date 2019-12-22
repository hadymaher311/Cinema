import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import Axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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
    name: "From",
    selector: "from",
    sortable: true
  },
  {
    name: "To",
    selector: "to",
    sortable: true
  },
  {
    name: "Screen",
    selector: "screen_id",
    sortable: true
  },
  {
    name: "Created at",
    selector: "created_at",
    cell: row => {
      return moment(row.created_at).fromNow();
    }
  }
];

const actions = (
  <Link to="/admin/movies/create" className="btn btn-success">
    + Add new Screening
  </Link>
);

const Screening = props => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [movieId, setMovieId] = useState(props.match.params.id);
  const [movie, setMovie] = useState(null);

  const filteredItems = data.filter(
    item =>
      (item.from && item.from.includes(filterText)) ||
      (item.to && item.to.includes(filterText))
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
    fetchMovie();
  }, [perPage]);

  const fetchMovie = () => {
    setLoading(true);

    Axios.get(`http://localhost:8000/api/admin/movies/${movieId}/show`)
      .then(response => {
        setMovie(response.data.data);
      })
      .catch(error => {
        Swal.fire("Oops...", "Something went wrong!", "error");
      });

    setLoading(false);
  };

  const fetchData = async (page, perPage) => {
    setLoading(true);

    Axios.get(
      `http://localhost:8000/api/admin/movies/${movieId}/screening?page=${page}&per_page=${perPage}`
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

  if (movie) {
    return (
      <div>
        <div className="container mt-5 mb-5">
          <DataTable
            title={`Screening Table for ${movie.name}`}
            columns={columns}
            data={filteredItems}
            actions={actions}
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
  }
  return <div className="container mt-5 text-center">Loading...</div>;
};

export default Screening;
