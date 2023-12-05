const Button = ({className = '', type = 'button', children , isDisabled = false, handleClick}) => {
    return <button type={type} className={`btn ${className}`} onClick={handleClick} disabled={isDisabled && 'disabled'}>{children}</button>
};
export default Button;