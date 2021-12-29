import LoginForm from '../Login/LoginForm';
import TransactionHandler from '../../engine/TransactionHandler';

export function Dashboard() {
    return (
        <div className="max-w-md">
            {''}
            <LoginForm />
            <>
                <TransactionHandler />
            </>
        </div>
    );
}
