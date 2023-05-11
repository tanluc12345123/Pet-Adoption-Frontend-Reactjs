import './index.css'
import { Paper, Typography, Avatar } from "@mui/material";
import InputComponent from '../../components/InputComponent/InputComponent';
import '../Login/index.css'
import Button from '../../components/Button/Button';
import { useState } from 'react';
import BaseScreen from '../../components/BaseScreen/BaseScreen';
import Api from '../../api/Api';

const Home = () => {
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('id')
    const [error, setError] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value)
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleClose = () => {
        setOpen(false)
        setError('')
        setOldPassword('')
        setConfirmPassword('')
        setNewPassword('')
    }

    const onChangePasswordClick = async () => {
        if (newPassword != confirmPassword) {
            setError("Confirm password don't match")
        } else {
            try {
                setLoading(true)
                const response = await Api.changePassword(userId, oldPassword, newPassword, confirmPassword)
                console.log(response.data.data)
                if (response.data.status === "Success") {
                    setTitle('Change Password')
                    setContent('Change Password Successful!')
                    setOpen(true)
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error.response.data)
                setError(error.response.data.message)
            }
        }
    }

    return (
        <BaseScreen isLoading={isLoading} open={open} handleClose={handleClose} title={title} content={content}>
            <Typography variant="h4">
                Account
            </Typography>

            <Paper elevation={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: 5, marginTop: 2 }}>
                <Avatar src='/src/assets/ic_avatar.svg' sx={{ height: 300, width: 300 }} />
                <Typography variant='h5' sx={{ fontWeight: 'bold' }} mt={2}>
                    Username: {username}
                </Typography>

                <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'blue', marginBottom: 2 }} mt={2}>
                    Change Password
                </Typography>
                <InputComponent aria-label="Old Password" placeholder="Old Password…" type="password" className="input" onChange={handleOldPasswordChange} value={oldPassword}/>
                <InputComponent aria-label="New Password" placeholder="New Password…" type="password" className="input" onChange={handleNewPasswordChange} value={newPassword}/>
                <InputComponent aria-label="Confirm New Password" placeholder="Confirm New Password…" type="password" className="input" onChange={handleConfirmPasswordChange} value={confirmPassword}/>
                {error && <span className='error'>{error}</span>}
                <Button style={{ padding: 14 }} onClick={onChangePasswordClick}>Change Password</Button>
            </Paper>
        </BaseScreen>
    )
}

export default Home