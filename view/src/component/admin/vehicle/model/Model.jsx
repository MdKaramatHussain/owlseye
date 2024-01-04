
import AddModel from "./AddModel";
import ViewModel from "./ViewModel";

export default function Model() {
    return (
        <>
            <div className="mt-3">
                <div style={{ textAlign: 'center', paddingTop:'1.5vh', marginBottom:'3.05vh' }}>
                    <h4>We Are In Vehicle's Model Menu</h4>
                </div>
                <hr />
                <br />
                <div className="d-flex" style={{ marginLeft: '4%', gap: '6.5%',}}>
                    <div>
                        <AddModel />
                    </div>
                    <div>
                        <ViewModel />
                    </div>
                </div>
            </div>
        </>
    )
}