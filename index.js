// index.js
const express = require('express');
const axios = require('axios');

const app = express();

app.get('/phones', async (req, res) => {
  try {
    const url = 'https://api.torob.com/v4/base-product/search/?page=1&sort=popularity&size=24&category=94&category_name=%DA%AF%D9%88%D8%B4%DB%8C-%D9%85%D9%88%D8%A8%D8%A7%DB%8C%D9%84-mobile&_landing_page=browse_94&source=next_desktop';

    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json',
        'origin': 'https://torob.com',
        'referer': 'https://torob.com/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    // فقط فیلدهای مهم را نگه داریم
    const cleanResults = response.data.results.map(item => ({
      name_fa: item.name1,
      name_en: item.name2,
      price: item.price_text,
      shops: item.shop_text,
      image: item.image_url,
      link: `https://torob.com${item.web_client_absolute_url}`
    }));

    // خروجی تمیز با امضا
    res.json({
      developer: "Alirezajamilzaeh",
      category: "گوشی موبایل",
      count: cleanResults.length,
      results: cleanResults
    });

  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
      details: err.response?.data ?? null,
      status: err.response?.status ?? null,
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/phones`);
});
