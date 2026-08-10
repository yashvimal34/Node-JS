export async function parseJSONbody(req) {
    let body = ''
    for await (const chunk of req) {
        body += chunk
    }

    try{
        return JSON.parse(body)
    }catch(err) {
        throw new Error('error' + err)
        console.log(err)
    }
}