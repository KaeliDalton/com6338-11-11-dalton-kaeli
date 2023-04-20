const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`
/*Need:
One makeTag
One Pipe
Single string of:
H2 title
H3 em "by " + name
p for each stanza
lb for every line but the last
*/
// complete this function

const makePoemHTML = (data) => {
var output = ''
const[{author, lines, title}] = data

output +=
//make h2 title
  makeTag('h2')(title) + 

// make h3 and emphasized "by name"
  pipe(makeTag(`em`), makeTag(`h3`))(`by ` + author)

//create line breaks for each line
const joinLines = arr => arr.join(`<br/>`)
const splitLines = str => str.split(`<br/><br/>`)

//split stanzas into paragraphs
const makeParagraphText = pipe(joinLines, splitLines)
const makeParagraph = makeTag(`p`)
console.log(makeParagraphText(lines))

//turn poem into a string of HTML
const paraArray = makeParagraphText(lines).map(str => makeParagraph(str))
const poemString = paraArray.join(``)

output +=
  poemString

console.log(data)

return output

}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
