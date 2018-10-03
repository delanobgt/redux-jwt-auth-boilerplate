import React, { Fragment } from 'react'

// Import React Table
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

class EmployeesIndex extends React.Component {
  state = {
    data: [],
    loading: true,
  }

  async componentDidMount() {
    try {
      let response = await axios.get('http://psi-uph-api.herokuapp.com/students/api')
      this.setState({
        loading: false,
        data: response.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  includedFilter = (filter, row) => {
    return row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
  }

  render() {
    const { data } = this.state

    const loadingSpinnner = this.state.loading ? (
      <CircularProgress size={50} style={{marginLeft: '50%'}} />
    ) : (<div></div>)

    const table = this.state.data.length ?  (
      <div>
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          defaultPageSize={10}
          className="-striped -highlight"
          columns={[
            {
              Header: 'Name',
              accessor: 'name',
              filterMethod: this.includedFilter
            },
            {
              Header: 'Student ID',
              accessor: 'studentID',
              filterMethod: this.includedFilter
            },
            {
              Header: 'Study Program',
              accessor: 'studyProgram',
              filterMethod: this.includedFilter
            },
          ]}
        />
      </div>
    ) : (<div></div>)

    return (
      <Fragment>
        <Grid container justify='center'>
          <Grid item xs={10}>
            { loadingSpinnner }
            { table }
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default EmployeesIndex
