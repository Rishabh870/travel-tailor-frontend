import { MetadataRoute } from 'next';

const baseUrl = process.env.DOMAIN; 

async function fetchSlugs(endpoint) {
  try {
    const response = await fetch(`${process.env.API_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      },

      next: {
        revalidate: 86400 // Revalidate daily (in seconds: 60*60*24)
      }
    });

    if (!response.ok) {
      console.error(`Failed to fetch slugs from ${endpoint}`, response.status, response.statusText);
      return []; // Return empty array on error
    }

    const data = await response.json();
    // Ensure the API returns an array of objects with a 'slug' property
    if (!Array.isArray(data)) {
        console.error(`API endpoint ${endpoint} did not return an array`);
        return [];
    }

    // Assuming each item in the array has a 'slug' property
    return data.map(item => ({
      slug: item.slug,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(), // Use updatedAt if available, otherwise current date
      // changeFrequency: 'weekly', // Optional hint
      // priority: 0.8, // Optional hint for dynamic content
    }));

  } catch (error) {
    console.error(`Error fetching slugs from ${endpoint}:`, error);
    return []; // Return empty array on error
  }
}

export default async function sitemap() {
  // Fetch slugs for each dynamic content type
  const blogSlugs = await fetchSlugs('/apihome/slugs/blog');
  const tourSlugs = await fetchSlugs('/apihome/slugs/tour'); 
  const destinationSlugs = await fetchSlugs('/apihome/slugs/destination'); 
  // Add other dynamic types as needed

  // Map slugs to sitemap entries
  const blogEntries = blogSlugs.map(item => ({
    url: `${baseUrl}/blogs/${item.slug}`,
    lastModified: item.updatedAt,
    // changeFrequency: item.changeFrequency,
    // priority: item.priority,
  }));

  const tourEntries = tourSlugs.map(item => ({
    url: `${baseUrl}/tours/${item.slug}`,
    lastModified: item.updatedAt,
    // changeFrequency: item.changeFrequency,
    // priority: item.priority,
  }));

  const destinationEntries = destinationSlugs.map(item => ({
    url: `${baseUrl}/destinations/${item.slug}`,
    lastModified: item.updatedAt,
    // changeFrequency: item.changeFrequency,
    // priority: item.priority,
  }));


  // Define static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
  ];

  // Combine all entries
  return [
    ...staticPages,
    ...blogEntries,
    ...tourEntries,
    ...destinationEntries,
  ];
}