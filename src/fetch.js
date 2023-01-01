export default function postFetch(path, req, func) {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }

    fetch('http://localhost:5000' + path, data)
        .then(res => res.json())
        .then(data => { func(data) })
        .catch(err => {
            console.log(err)
            func("An Error Occured")
        }) 
}