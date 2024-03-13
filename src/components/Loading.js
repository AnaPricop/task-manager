import ReactLoading from 'react-loading';
import styles from "../css/boards.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
function Loading() {
    return (
        <div className="loading justify-content-center">
            <ReactLoading type="spinningBubbles"  color="#007bff" height={100} width={100}/>
        </div>
    );
}
export default Loading;