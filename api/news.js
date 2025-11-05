// Vercel Serverless Function - Fetch Carbon Market News
// Fetches latest news from Carbon Herald RSS feed via rss2json.com

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const RSS_FEED_URL = 'https://carbonherald.com/feed/';
    const RSS2JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED_URL)}&count=6`;

    // Fetch news from RSS feed via rss2json
    const response = await fetch(RSS2JSON_API);

    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error('RSS feed parsing failed');
    }

    // Process and format news items
    const newsItems = data.items.slice(0, 3).map(item => {
      // Extract image from content if available
      let imageUrl = 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80'; // default
      const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) {
        imageUrl = imgMatch[1];
      } else if (item.thumbnail) {
        imageUrl = item.thumbnail;
      } else if (item.enclosure?.link) {
        imageUrl = item.enclosure.link;
      }

      // Clean description - remove HTML tags
      let description = item.description || item.content || '';
      description = description.replace(/<[^>]*>/g, '').trim();
      description = description.substring(0, 200) + '...';

      // Format date
      const date = new Date(item.pubDate);
      const formattedDate = date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      return {
        title: item.title,
        description: description,
        link: item.link,
        date: formattedDate,
        image: imageUrl,
        pubDate: item.pubDate
      };
    });

    return res.status(200).json({
      success: true,
      news: newsItems,
      source: 'Carbon Herald',
      fetchedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('News fetch error:', error);

    // Return fallback news on error
    return res.status(200).json({
      success: false,
      error: error.message,
      news: [
        {
          title: 'Türkiye İklim Yasası Kabul Edildi',
          description: 'Meclis tarafından kabul edilen İklim Yasası, 2053 net sıfır emisyon hedefine yasal zemin oluşturuyor.',
          link: 'https://carbonherald.com/',
          date: '9 Temmuz 2025',
          image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80'
        },
        {
          title: 'Türkiye Emisyon Ticaret Sistemi 2026\'da Başlıyor',
          description: 'Karbon Piyasası Kurulu, pilot ETS sistemini 2026-2027 döneminde başlatmayı planlıyor.',
          link: 'https://carbonherald.com/',
          date: '15 Haziran 2025',
          image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80'
        },
        {
          title: 'AB Karbon Sınır Düzenlemesi 2026\'da Yürürlüğe Giriyor',
          description: 'EU CBAM mekanizması, yüksek karbon ayak izli ithalatlara vergi getirecek.',
          link: 'https://carbonherald.com/',
          date: '1 Mayıs 2025',
          image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80'
        }
      ]
    });
  }
}
