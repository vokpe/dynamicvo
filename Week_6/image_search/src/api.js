import axios from 'axios'

const searchImages = async(term) => {
    const responses = await axios.get("https://api.unsplash.com/search/photos", {
        headers: {
            Authorization: "Client-ID ppDiTUE7kZSqyDPfRa3XRZjs1YWqa1hrzec4WBeAblM",
        }, 
        params: { query: term},
    })

    return response.data.results
}

export default searchImages