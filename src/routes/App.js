import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/Auth';
import { Dashboard } from './Dashboard/Dashboard';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
