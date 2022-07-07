import { Component } from "react";
import './RecordsTable.css';

class RecordsTable extends Component {
    getRecords;
    constructor(props) {
        super(props);

        this.getRecords = props.getRecords;
    }

    getRecordsInTegTr = () => {
        let records = this.getRecords();
        let recordsInTegTr = [];
        for (let i = 0; i < records.length; i++) {
            const element = records[i];
            recordsInTegTr.push(
                <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.score}</td>
                </tr>
            );
        }
        return recordsInTegTr;
    }
    render() {
        return (
            <div className='RecordsTable'>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Имя</th>
                            <th scope="col">Счет</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getRecordsInTegTr()}
                    </tbody>


                </table>
            </div>
        );
    }

}

export default RecordsTable;