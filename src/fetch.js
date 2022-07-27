export default async function postFetch(path, req) {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }

    try {
        const fetched = await fetch('http://localhost:5000' + path, data)
        const res = await fetched.json()
        return res
    } catch (err) {
        console.log(err)
        return "An Error Occured"
    }
}