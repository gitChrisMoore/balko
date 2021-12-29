-- RPC: returns all txs, takes gte_date & lt_date,

-- SELECT * FROM get_asof_balance ('2021-08-01', '2021-11-01');
-- SELECT * FROM get_asof_balance ('2021-12-15T02:18:07.741Z');


drop function get_asof_balance


create or replace function get_asof_balance (
  gte_date varchar,
  lt_date varchar
) 
	returns table (
        user_id uuid,
        current_balance float,
        asOf timestamp
	)
  language plpgsql
as 
$func$
begin
	return query
    select
        tx.user_id,
        SUM(tx.amount::float) as current_balance,
        lt_date::timestamp as asOf
    from
        transactions tx
    WHERE
        tx.user_transaction_time >= gte_date::timestamp
    AND tx.user_transaction_time <  lt_date::timestamp
    AND tx.status = 'FINAL'
    GROUP BY
      tx.user_id;
end;
$func$