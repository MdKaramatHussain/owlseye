import BarChart from './Chart'
import ProTable from './tables'
import Card from 'react-bootstrap/Card'
function Home() {

  return (

    <div style={{ padding: "2%" }}>
      <div style={{display:"flex", flexDirection:"row", gap:"1.5%"}}>
        <div>
          <Card style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>Total: 288
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>Employee</Card.Title>
              <Card.Text>Total: 59
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>Vehicles</Card.Title>
              <Card.Text>Total: 1059
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>Garage</Card.Title>
              <Card.Text>Total: 59
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <hr></hr>
      <div style={{ display: "flex", flexDirection: "row" , gap:"5%"}}>

        <div >
          <BarChart />
        </div>
        <div >
          <ProTable />
        </div>
      </div>
    </div>
  )
}

export default Home