// Cloudflare Worker - 投票 API 后端
// 部署到：https://workers.cloudflare.com

export default {
  async fetch(request, env, ctx) {
    // CORS 配置
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 处理 OPTIONS 请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // GET /votes - 获取所有投票数据
    if (path === '/votes' && request.method === 'GET') {
      try {
        const data = await env.VOTE_KV.get('votes', 'json');
        return Response.json({
          success: true,
          votes: data || [],
          timestamp: new Date().toISOString()
        }, { headers: corsHeaders });
      } catch (error) {
        return Response.json({
          success: false,
          error: error.message
        }, { status: 500, headers: corsHeaders });
      }
    }

    // POST /vote - 提交投票
    if (path === '/vote' && request.method === 'POST') {
      try {
        const body = await request.json();
        
        // 验证数据
        if (!body.voterId || !body.nickname || !body.choices) {
          return Response.json({
            success: false,
            error: '数据不完整'
          }, { status: 400, headers: corsHeaders });
        }

        // 获取现有数据
        const data = await env.VOTE_KV.get('votes', 'json') || [];
        
        // 检查是否已投票
        const alreadyVoted = data.some(v => v.voterId === body.voterId);
        if (alreadyVoted) {
          return Response.json({
            success: false,
            error: '您已经投过票了'
          }, { status: 400, headers: corsHeaders });
        }

        // 添加新投票
        data.push({
          voterId: body.voterId,
          nickname: body.nickname,
          choices: body.choices,
          timestamp: body.timestamp || new Date().toISOString()
        });

        // 保存回 KV
        await env.VOTE_KV.put('votes', JSON.stringify(data));

        return Response.json({
          success: true,
          message: '投票成功',
          total: data.length
        }, { headers: corsHeaders });
      } catch (error) {
        return Response.json({
          success: false,
          error: error.message
        }, { status: 500, headers: corsHeaders });
      }
    }

    // 404
    return Response.json({
      success: false,
      error: 'Not Found'
    }, { status: 404, headers: corsHeaders });
  }
};
