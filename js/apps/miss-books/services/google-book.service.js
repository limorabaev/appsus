export const googleBookService = {
    getBookSearchResults
}

function getBookSearchResults(string){  
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${string}`)
        .then(res => {
            return res.data.items;
        })
}