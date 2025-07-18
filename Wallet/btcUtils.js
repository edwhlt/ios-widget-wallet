export const getBTCBalance = async (addr) => {
  let url = `https://blockstream.info/api/address/${addr}`;
  let req = new Request(url);
  let res = await req.loadJSON();
  let funded = res.chain_stats.funded_txo_sum;
  let spent = res.chain_stats.spent_txo_sum;
  return (funded - spent) / 1e8
}