import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyAKqIgtmbkopCIEfv4l6DZ77ip8ijZZick';

export const searchPlaces = async (query:string) => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;

    try {
        const response = await axios.get(url);
        return response.data.results; // Array of matching places
    } catch (error) {
        console.error('Error fetching places:', error);
        return [];
    }
};