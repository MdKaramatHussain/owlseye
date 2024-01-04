
import AddCompany from "./AddCompany";
import ViewCompany from "./ViewCompany";


export default function Company() {
    return (
        <>
            <div className="mt-3">
                <div style={{ textAlign: 'center', paddingTop:'1.5vh', marginBottom:'3.05vh' }}>
                    <h4>We Are In Vehicle's Company</h4>
                </div>
                <hr />
                <div className="d-flex" style={{ marginLeft: '10%', gap: '10%', marginTop:'5%'}}>
                    <div>
                        <AddCompany />
                    </div>
                    <div>
                        <ViewCompany />
                    </div>
                </div>
            </div>
        </>
    )
}