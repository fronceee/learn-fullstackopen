const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
}

const Notification = ({ message, variant }) => {
    if (message === null) {
        return null
    }

    let color;

    switch (variant) {
        case 'error':
            color = 'red'
            break
        case 'success':
            color = 'green'
            break
        default:
            color = 'black'
    }

    return (
        <div style={{...notificationStyle, color, borderColor: color}}>
            {message}
        </div>
    )
}

export default Notification