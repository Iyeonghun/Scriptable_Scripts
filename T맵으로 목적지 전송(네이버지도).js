// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: map-marked-alt;
// share-sheet-inputs: plain-text;

const message = args.plainTexts[0]
const split_message= message.split(/\r?\n/)
const address = split_message[split_message.length - 1]

const req = new Request(address);
req.onRedirect = ((request) => {})

await req.load()

const locationURL = req.response.headers.Location
const regex = /([^?=&]+)(=([^&]*))?/g

const params = {}
locationURL.match(regex).filter(o => o.includes("=")).forEach(o => {
  const p = o.split("=")
  params[p[0]] = p[1]
})

const url = `tmap://?rGoName=${params["title"]}&rGoX=${params["lng"]}&rGoY=${params["lat"]}`

Safari.open(url)