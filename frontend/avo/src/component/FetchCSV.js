import React  from 'react';
import {CSVLink} from "react-csv";

export default class  FetchCSV extends React.Component {
    csvLink = React.createRef()
    state = { data: [] }

    fetchData = () => {
        fetch('../../../symptom_disease .csv').then(data => {
            this.setState({ data }, () => {
                // click the CSVLink component to trigger the CSV download
                this.csvLink.current.link.click()
            })
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.fetchData}>Download CSV</button>
                <CSVLink
                    data={this.state.data}
                    filename="data.csv"
                    className="hidden"
                    ref={this.csvLink}
                    target="_self"
                />
            </div>
        )
    }
}