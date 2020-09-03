import React from "react";
import MaterialTable from "material-table";
import { withRouter } from "react-router-dom";
import axios from "axios";

const endpoint = "http://localhost:5000/api/v1/movie_lists";

class MaterialTableDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "title" },
        {
          title: "Number of Movies",
          field: "movieNum",
          type: "numeric",
        },
      ],
      data: [],
    };
  }

  componentDidMount() {
    console.log("this is comp did mount");
    axios
      .get(endpoint)
      .then((resp) => {
        console.log(resp);
        const { data } = resp.data;
        this.setState((prevState) => {
          return { ...prevState, data };
        });
      })
      .catch((err) => console.log(err));
  }

  delete = (oldData) => {
    axios
      .delete(endpoint + "/" + oldData.id, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then(() => {
        this.setState((prevState) => {
          const data = [...prevState.data];
          data.splice(data.indexOf(oldData), 1);
          return { ...prevState, data };
        });
      })
      .catch((err) => console.log(err));
  };

  update = (oldData, newData) => {
    fetch(endpoint + "/" + newData.id, {
      method: "put",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newData.title }),
    })
      .then(() => {
        this.setState((prevState) => {
          const data = [...prevState.data];
          data[data.indexOf(oldData)] = newData;
          return { ...prevState, data };
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  add = (newData) => {
    fetch(endpoint + "/", {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newData.title }),
    })
      .then(() => {
        this.setState((prevState) => {
          const data = [...prevState.data];
          data.push(newData);
          return { ...prevState, data };
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  render() {
    const state = this.state;
    console.log(state);
    return (
      <MaterialTable
        title="Movie List"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.add(newData);
                console.log(newData);
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  this.update(oldData, newData);
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                console.log(oldData);
                this.delete(oldData);
              }, 600);
            }),
        }}
        onRowClick={(event, rowData) => {
          console.log("this is rowdata", rowData);
          this.props.history.push({
            pathname: "/list",
            search: "",
            state: { detail: rowData },
          });
        }}
        options={{ actionsColumnIndex: -1, pageSize: 10 }}
        style={{ width: "100%", marginTop: "70px" }}
      />
    );
  }
}
export default withRouter(MaterialTableDemo);
