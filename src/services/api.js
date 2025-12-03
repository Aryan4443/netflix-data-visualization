// TMDB API service for fetching Netflix content
// Get your free API key from: https://www.themoviedb.org/settings/api

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Fetch Netflix content from TMDB
export const fetchNetflixContent = async () => {
  // If no API key, return null to use sample data
  if (!TMDB_API_KEY) {
    console.warn('TMDB API key not found. Using sample data. Get a free key at: https://www.themoviedb.org/settings/api');
    return null;
  }

  try {
    console.log('📡 Fetching comprehensive Netflix catalog... This may take a moment.');
    
    // Helper function to fetch all pages for a given endpoint
    const fetchAllPages = async (baseUrl, transformFn, maxPages = 100) => {
      let allResults = [];
      let currentPage = 1;
      let hasMorePages = true;
      
      // First, get the first page to know total pages
      const firstResponse = await fetch(`${baseUrl}&page=1`);
      if (!firstResponse.ok) {
        console.warn(`Failed to fetch first page from ${baseUrl}`);
        return [];
      }
      
      const firstData = await firstResponse.json();
      const totalPages = Math.min(firstData.total_pages || 1, maxPages);
      
      // Add first page results
      allResults.push(...firstData.results.map(transformFn));
      
      // Fetch remaining pages in batches to avoid overwhelming the API
      const batchSize = 5; // Fetch 5 pages at a time
      
      for (let startPage = 2; startPage <= totalPages; startPage += batchSize) {
        const endPage = Math.min(startPage + batchSize - 1, totalPages);
        const pagePromises = [];
        
        for (let page = startPage; page <= endPage; page++) {
          pagePromises.push(
            fetch(`${baseUrl}&page=${page}`).then(res => res.json())
          );
        }
        
        const batchResults = await Promise.all(pagePromises);
        batchResults.forEach(data => {
          if (data.results && data.results.length > 0) {
            allResults.push(...data.results.map(transformFn));
          }
        });
        
        console.log(`📊 Fetched pages ${startPage}-${endPage} of ${totalPages}...`);
      }
      
      return allResults;
    };
    
    // Fetch all Netflix TV shows (originals and popular)
    console.log('📺 Fetching Netflix TV shows...');
    const tvShows = await fetchAllPages(
      `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_networks=213&sort_by=popularity.desc`,
      transformTVShow,
      50 // Fetch up to 50 pages (~1000 TV shows)
    );
    
    // Fetch all Netflix movies
    console.log('🎬 Fetching Netflix movies...');
    const movies = await fetchAllPages(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_watch_providers=8&watch_region=US&sort_by=popularity.desc`,
      transformMovie,
      50 // Fetch up to 50 pages (~1000 movies)
    );
    
    // Also fetch by release date to get more comprehensive coverage
    console.log('📅 Fetching recent releases...');
    const recentTVShows = await fetchAllPages(
      `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_networks=213&sort_by=release_date.desc&page=1`,
      transformTVShow,
      20
    );
    
    const recentMovies = await fetchAllPages(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_watch_providers=8&watch_region=US&sort_by=release_date.desc`,
      transformMovie,
      20
    );

    // Combine all results
    const allContent = [
      ...tvShows,
      ...movies,
      ...recentTVShows,
      ...recentMovies
    ];

    // Remove duplicates based on ID
    const uniqueContent = Array.from(
      new Map(allContent.map(item => [item.id, item])).values()
    );

    console.log(`✅ Fetched ${uniqueContent.length} unique Netflix titles from API`);
    console.log(`📊 Breakdown: ${uniqueContent.filter(c => c.type === 'TV Show').length} TV Shows, ${uniqueContent.filter(c => c.type === 'Movie').length} Movies`);
    
    return uniqueContent;
  } catch (error) {
    console.error('Error fetching from TMDB API:', error);
    return null; // Fallback to sample data
  }
};

// Transform TV show data
const transformTVShow = (item) => {
  return {
    id: item.id,
    title: item.name,
    type: 'TV Show',
    genre: item.genre_ids && item.genre_ids.length > 0 ? getGenreName(item.genre_ids[0]) : 'Unknown',
    year: item.first_air_date ? new Date(item.first_air_date).getFullYear() : null,
    rating: parseFloat((item.vote_average || 0).toFixed(1)),
    duration: item.number_of_seasons ? `${item.number_of_seasons} Season${item.number_of_seasons > 1 ? 's' : ''}` : 'N/A',
    country: getCountryFromOrigin(item.origin_country?.[0] || 'US'),
    poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
    overview: item.overview || ''
  };
};

// Transform movie data
const transformMovie = (item) => {
  return {
    id: item.id,
    title: item.title,
    type: 'Movie',
    genre: item.genre_ids && item.genre_ids.length > 0 ? getGenreName(item.genre_ids[0]) : 'Unknown',
    year: item.release_date ? new Date(item.release_date).getFullYear() : null,
    rating: parseFloat((item.vote_average || 0).toFixed(1)),
    duration: item.runtime ? `${item.runtime} min` : 'N/A',
    country: getCountryFromOrigin(item.origin_country?.[0] || item.original_language || 'US'),
    poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
    overview: item.overview || ''
  };
};

// Get genre name from ID (simplified - TMDB has more genres)
const getGenreName = (genreId) => {
  const genres = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
    80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
    9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
    53: 'Thriller', 10752: 'War', 37: 'Western'
  };
  return genres[genreId] || 'Drama';
};

// Convert country code to full country name
const getCountryFromOrigin = (code) => {
  const countries = {
    'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada', 'AU': 'Australia',
    'DE': 'Germany', 'FR': 'France', 'ES': 'Spain', 'IT': 'Italy',
    'JP': 'Japan', 'KR': 'South Korea', 'IN': 'India', 'BR': 'Brazil',
    'MX': 'Mexico', 'CO': 'Colombia', 'PL': 'Poland', 'NL': 'Netherlands',
    'SE': 'Sweden', 'NO': 'Norway', 'DK': 'Denmark', 'FI': 'Finland',
    'BE': 'Belgium', 'CH': 'Switzerland', 'AT': 'Austria', 'IE': 'Ireland',
    'PT': 'Portugal', 'GR': 'Greece', 'CZ': 'Czech Republic', 'HU': 'Hungary',
    'RO': 'Romania', 'BG': 'Bulgaria', 'HR': 'Croatia', 'SK': 'Slovakia',
    'SI': 'Slovenia', 'EE': 'Estonia', 'LV': 'Latvia', 'LT': 'Lithuania',
    'RU': 'Russia', 'UA': 'Ukraine', 'TR': 'Turkey', 'IL': 'Israel',
    'AE': 'United Arab Emirates', 'SA': 'Saudi Arabia', 'EG': 'Egypt',
    'ZA': 'South Africa', 'NG': 'Nigeria', 'KE': 'Kenya', 'GH': 'Ghana',
    'CN': 'China', 'TW': 'Taiwan', 'HK': 'Hong Kong', 'SG': 'Singapore',
    'MY': 'Malaysia', 'TH': 'Thailand', 'VN': 'Vietnam', 'PH': 'Philippines',
    'ID': 'Indonesia', 'PK': 'Pakistan', 'BD': 'Bangladesh', 'LK': 'Sri Lanka',
    'NZ': 'New Zealand', 'AR': 'Argentina', 'CL': 'Chile', 'PE': 'Peru',
    'VE': 'Venezuela', 'EC': 'Ecuador', 'UY': 'Uruguay', 'PY': 'Paraguay',
    'BO': 'Bolivia', 'CR': 'Costa Rica', 'PA': 'Panama', 'GT': 'Guatemala',
    'CU': 'Cuba', 'DO': 'Dominican Republic', 'JM': 'Jamaica', 'PR': 'Puerto Rico'
  };
  
  // If code is already a full name (more than 2 characters), return as is
  if (code && code.length > 2) {
    return code;
  }
  
  // Convert code to full name, or return a formatted version if not found
  return countries[code] || (code ? code.toUpperCase() : 'United States');
};

// Fetch detailed information for a specific title
export const fetchTitleDetails = async (id, type) => {
  if (!TMDB_API_KEY) return null;

  try {
    const endpoint = type === 'TV Show' ? 'tv' : 'movie';
    const response = await fetch(`${TMDB_BASE_URL}/${endpoint}/${id}?api_key=${TMDB_API_KEY}`);
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return type === 'TV Show' ? transformTVShow(data) : transformMovie(data);
  } catch (error) {
    console.error('Error fetching title details:', error);
    return null;
  }
};

