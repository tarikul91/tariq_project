import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
//navigation
import { Link } from "react-router-dom";
import { fetchForm } from "feature/allForm"
const Home = () => {
    const forms = useSelector(data => data.forms)
    const Dispatch = useDispatch()
    useEffect(() => {
        Dispatch(fetchForm())
    }, [Dispatch])
    console.log(forms.form[0])
    if (forms.status == "loading") {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            {
                forms.form.map((f, index) => {
                    return (
                        <button className="btn btn-success btn-lg m-3" key={index}>
                            <Link to={`/home/${f._id}`} className="clear-link bright-link">
                                {f.formDetail.formName}
                            </Link>
                        </button>

                    )
                })
            }
        </div>
    )

}
export default Home;
