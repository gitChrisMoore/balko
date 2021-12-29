import { createClient } from '@supabase/supabase-js';

const server_supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_SERVICE_KEY
);

export { server_supabase };
