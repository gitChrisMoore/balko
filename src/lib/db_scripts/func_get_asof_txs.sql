-- RPC: returns all txs, takes gte_date & lt_date,

-- SELECT * FROM get_asof_txs ('2021-08-01', '2021-11-01');
-- SELECT * FROM get_asof_txs ('2021-12-15T02:18:07.741Z');


drop function get_asof_txs


create or replace function get_asof_txs (
  gte_date varchar,
  lt_date varchar
) 
	returns table (
        id int,
        user_id uuid,
        account_number uuid,
        transaction_id uuid,
        amount float,
        status text,
        type text,
        asOf timestamp
	)
  language plpgsql
as 
$func$
begin
	return query
    select
        tx.id::int,
        tx.user_id,
        tx.account_number,
        tx.transaction_id,
        tx.amount::float,
        tx.status,
        tx.type,
        lt_date::timestamp as asOf
    from
        transactions tx
    WHERE
        user_transaction_time >= gte_date::timestamp
    AND user_transaction_time <  lt_date::timestamp;
end;
$func$