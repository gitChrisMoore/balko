import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/Auth';
import { RemoteEventProvider } from '../contexts/RemoteEventProvider';
import { Dashboard } from './Dashboard/Dashboard';

function App() {
    return (
        <Router>
            <AuthProvider>
                <RemoteEventProvider>
                    <Routes>
                        <Route path="*" element={<Dashboard />} />
                    </Routes>
                </RemoteEventProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
