module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST' || req.method === 'PATCH') {
    try {
      const payload = req.body || {};
      const authHeader = req.headers['authorization'] || 'Bearer sb_publishable_vHK1gIdoebQ-4WwaIjeEmg_elX97-SK';
      
      let url = 'https://ukwuzbacxinidphzhftr.supabase.co/rest/v1/orders';
      if (req.method === 'PATCH' && payload.orderId) {
        url += `?id=eq.${encodeURIComponent(payload.orderId)}`;
        delete payload.orderId;
      }

      const supabaseRes = await fetch(url, {
        method: req.method,
        headers: {
          'apikey': 'sb_publishable_vHK1gIdoebQ-4WwaIjeEmg_elX97-SK',
          'Authorization': authHeader,
          'Content-Type': 'application/json',
          'Prefer': req.method === 'POST' ? 'resolution=merge-duplicates,return=representation' : 'return=representation'
        },
        body: JSON.stringify(payload)
      });
      const data = await supabaseRes.text();
      return res.status(supabaseRes.status).send(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
