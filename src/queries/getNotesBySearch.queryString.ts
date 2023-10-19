const searchQueryString = `
select id, note."userId", text, text_json, text_tsvector, ts_rank(text_tsvector, query) as rank
from note, to_tsquery('english',$1) query
where note."userId" = $3 and query @@ text_tsvector 
order by rank desc
limit $2`;

export default searchQueryString;
