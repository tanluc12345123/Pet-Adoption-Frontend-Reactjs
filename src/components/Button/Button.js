import './Button.css'

const Button = ({ children, full, onClick, style, disabled }) => {
    return (
        <div className="button-container">
            <button className={`custom-button blue ${full ? 'width-button-fit' : null}`} onClick={onClick} style={style} disabled={disabled}>{children}</button>
        </div>
    )
}

export default Button
