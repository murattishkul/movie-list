import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MaterialTable from "material-table";
import axios from "axios";

const endpoint = "http://localhost:5000/api/v1/movie_lists";

const MovieList = (props) => {
  const location = useLocation();
  const [tableData, setTableData] = useState({
    columns: [{ title: "Name", field: "title" }],
    data: [],
  });

  useEffect(() => {
    axios
      .get(endpoint + "/" + location.state.detail.id + "/movies")
      .then((resp) => {
        console.log(resp.data.data);
        setTableData({ columns: tableData.columns, data: resp.data.data });
      })
      .catch((err) => console.log(err));
  }, [location.state.detail.id]);

  const destroy = (oldData) => {
    axios
      .delete(
        endpoint + "/" + location.state.detail.id + "/movies/" + oldData.id,
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      )
      .then(() => {
        const data = [...tableData.data];
        data.splice(data.indexOf(oldData), 1);
        setTableData({ ...tableData, data });
      })
      .catch((err) => console.log(err));
  };

  const update = (oldData, newData) => {
    fetch(endpoint + "/" + location.state.detail.id + "/movies/" + newData.id, {
      method: "put",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newData.title }),
    })
      .then(() => {
        const data = [...tableData.data];
        data[data.indexOf(oldData)] = newData;
        setTableData({ columns: tableData.columns, data });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const add = (newData) => {
    fetch(endpoint + "/" + location.state.detail.id + "/movies", {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newData.title }),
    })
      .then(() => {
        const data = [...tableData.data];
        data.push(newData);
        console.log(data);
        const newTableData = { columns: tableData.columns, data: data };
        setTableData(newTableData);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  console.log(tableData);
  return (
    <MaterialTable
      title={location.state.detail.title}
      columns={tableData.columns}
      data={tableData.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              add(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                console.log(oldData);
                update(oldData, newData);
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              console.log(oldData);
              destroy(oldData);
            }, 600);
          }),
      }}
      options={{ actionsColumnIndex: -1 }}
      style={{ width: "100%", marginTop: "70px" }}
    />
  );
};

export default MovieList;
