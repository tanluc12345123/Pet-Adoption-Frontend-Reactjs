import './Button.css'

const Button = ({ children, full, onClick, style }) => {
    return (
        <div className="button-container">
            <button className={`custom-button blue ${full ? 'width-button-fit' : null}`} onClick={onClick} style={style}>{children}</button>
        </div>
    )
}

export default Button
