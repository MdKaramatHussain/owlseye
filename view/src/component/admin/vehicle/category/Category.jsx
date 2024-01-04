// Import modules
import AddVehicle from "./AddVehicle";
import ViewVehicle from "./ViewVehicle";

export default function Category() {
    return (
        <>
            <div className="mt-3">
                <div  style={{ textAlign: 'center', paddingTop:'1.5vh', marginBottom:'3.05vh' }}>
                    <h4>Welcome to Vehicle's Category</h4>
                </div>
                <hr />
                <div className="d-flex" style={{ marginLeft: '10%', gap: '10%', marginTop:'5%'}}>
                    <div>
                        <AddVehicle />
                    </div>
                    <div>
                        <ViewVehicle />
                    </div>
                </div>
            </div>
        </>
    )
}