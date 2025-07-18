// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;
const getBTCBalance = async (addr) => {
  let url = `https://blockstream.info/api/address/${addr}`;
  let req = new Request(url);
  let res = await req.loadJSON();
  let funded = res.chain_stats.funded_txo_sum;
  let spent = res.chain_stats.spent_txo_sum;
  return (funded - spent) / 1e8
}

module.exports = {
  getBTCBalance
}