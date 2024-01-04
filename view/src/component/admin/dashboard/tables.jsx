import Table from 'react-bootstrap/Table';

function ProTable() {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Year</th>
          <th>Sales</th>
          <th>Expenses</th>
          <th>Profit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2014</td>
          <td>1000</td>
          <td>400</td>
          <td>200</td>
        </tr>
        <tr>
          <td>2015</td>
          <td>1170</td>
          <td>460</td>
          <td>250</td>
        </tr>
        <tr>
          <td>2016</td>
          <td>660</td>
          <td>1120</td>
          <td>300</td>
        </tr>
        <tr>
          <td>2017</td>
          <td>1030</td>
          <td>540</td>
          <td>350</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ProTable ;