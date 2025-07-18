export const getETHBalance = async (rpcUrl, addr) => {
  let payload = {
    jsonrpc: "2.0",
    method: "eth_getBalance",
    params: [addr, "latest"],
    id: 1
  };
  let req = new Request(rpcUrl);
  req.method = "POST";
  req.headers = { "Content-Type": "application/json" };
  req.body = JSON.stringify(payload);
  let res = await req.loadJSON();
  let wei = res.result;
  return parseInt(wei, 16) / 1e18;
}