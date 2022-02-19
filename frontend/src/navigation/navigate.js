import { Routes, Route } from "react-router-dom";
import NotFound from "page/notFound";
import constant from "navigation/CONSTANT";
import Home from "page/home";
import Form from "page/form";
//components
export const RouterConfig = () => {
    return (
        <div className="navigation">
            <Routes>
                <Route path="/" element={<Home />}/>/
                <Route path="home" element={<Home />}/>
                <Route path="home/:formId" element={<Form />} />
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </div>
    );
};
export default RouterConfig