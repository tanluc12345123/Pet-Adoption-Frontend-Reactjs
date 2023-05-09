import './BaseScreen.css'
import CircularProgress from '@mui/material/CircularProgress';

const BaseScreen = (props) => {
    return (
        <div className="container">
            {props.children}
            {props.isLoading && <div className='progress-div' >
                <CircularProgress className='progress' />
            </div>}
        </div>
    )
}

export default BaseScreen
