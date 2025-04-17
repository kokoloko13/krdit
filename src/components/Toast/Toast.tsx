import './Toast.less';

type ToastProps = {
    message: string
};

const Toast = ({message}: ToastProps) => {
    return(
        <div className="toast">
            <p className="toast__message">{message}</p>
        </div>
    );
};

export default Toast;