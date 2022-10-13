
interface ErrorMessageProps {
    message: string
}

const Error = ({message}: ErrorMessageProps) => {
    
    return(
        <p className="text-center py-6">{message}</p>
    )
}

export default Error