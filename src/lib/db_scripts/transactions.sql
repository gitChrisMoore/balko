
-- account_products.sql

create table dev_transactions (
  id bigint generated by default as identity primary key,
  token uuid default uuid_generate_v4(),
  
  user_id uuid references auth.users not null,
  individuals_id bigint references public.individuals not null,
  accounts_id bigint references public.accounts not null,
  account_products_id bigint references public.account_products not null,
  created_by uuid references auth.users not null,
  
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  effective_date timestamp with time zone default timezone('utc'::text, now()) not null,
  
  amount float not null,
  balance_delta float not null,
  
  

  state_id int not null,
  state_description varchar not null,
  
  processed boolean not null,
  status varchar not null,
  
  source varchar,
  type varchar,
  config varchar

);

