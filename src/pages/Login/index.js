import './index.css'
import Button from "../../components/Button/Button"
import { useState } from 'react'
import BaseScreen from '../../components/BaseScreen/BaseScreen'
import InputComponent from '../../components/InputComponent/InputComponent'

const Login = () => {
    const [isLoading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onClickLogin = () => {
        console.log(username)
        console.log(password)
    }

    return (
        <BaseScreen isLoading={isLoading}>
            <div className='card'>
                <p className='title'>Welcome back!</p>
                <InputComponent aria-label="Username" placeholder="Username…" className="input" onChange={handleUsernameChange} />
                <InputComponent aria-label="Password" placeholder="Password…" type="password" className="input" onChange={handlePasswordChange} />
                {error && <span className='error'>{error}</span>}
                <Button full onClick={onClickLogin}>Login</Button>
            </div>
        </BaseScreen>
    )
}

export default Login
