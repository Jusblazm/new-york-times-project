// nyt.js
// rslarkin

const articlePage = document.querySelector('#articles')
defaultDateFormat = { month: "long", day: "2-digit", weekday: "long", year: "numeric" }
defaultTimeFormat = { hour: "numeric", minute: "numeric" }
const API_KEY = ''


window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('articleSections').value = 'default'
    fetchData('default')
})

document.querySelector('#refreshArticles').addEventListener('click', () => {
    articlePage.innerText = ''
    document.getElementById('articleSections').value = 'default'
    fetchData('default')
})

document.querySelector('#articleSections').addEventListener('change', () => {
    articlePage.innerText = ''
    e = document.querySelector('#articleSections')
    fetchData(articleSwitch(e.value))
})

const fetchData = (opt) => {
    let url = `http://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            handleData(data, opt)
        })
}

const handleData = (data, opt) => {
    data.results.forEach((e, i) => {

        if (opt === e.section || opt === 'default') {

            // create blank article card
            const articleCard = document.createElement('div')
            articleCard.classList.add('mx-2', 'bg-slate-300', 'my-3', 'sm:w-1/2', 'md:w-1/3', 'lg:w-1/5', 'shadow-md', 'transition', 'ease-in-out', 'delay-150', 'duration-300', 'hover:shadow-lg', 'rounded-lg', 'flex', 'flex-col', 'justify-between')
            articleCard.setAttribute('id', `article${i}`)
            // display card
            articlePage.append(articleCard)

            // I had a temporary error in the API that provided no multimedia 
            // for a single article, so I created an if statement
            if (e.multimedia != null) {
                // create article image
                const articleImg = document.createElement('img')
                articleImg.setAttribute('src', `${e.multimedia[1].url}`)
                articleImg.setAttribute('alt', `${e.title}`)
                articleImg.setAttribute('draggable', 'false')
                articleImg.classList.add('rounded-t-lg')
                // display image
                articleCard.append(articleImg)
            } else {
                // this 'fake image' does cause display issues with responsiveness
                // the 'fake image' doesn't resize nicely due to not being an image
                const articleImg = document.createElement('div')
                articleImg.innerText = 'No Image Provided'
                articleImg.classList.add('rounded-t-lg', 'h-[256px]', 'border-2', 'select-none', 'place-items-center', 'grid')
                articleCard.append(articleImg)
            }

            // create article title
            const articleTitleDiv = document.createElement('div')
            const articleTitle = document.createElement('a')
            articleTitle.innerText = `${e.title}`
            articleTitle.setAttribute('href', `${e.url}`)
            articleTitle.setAttribute('target', '_blank')
            articleTitle.classList.add('text-xl', 'font-semibold', 'hover:text-black/75')
            articleTitleDiv.classList.add('mx-2', 'mb-1')
            // display title
            articleTitleDiv.append(articleTitle)
            articleCard.append(articleTitleDiv)

            // create article abstract
            const articleAbstract = document.createElement('div')
            articleAbstract.innerText = `${e.abstract}`
            articleAbstract.classList.add('mx-2', 'mb-4', 'text-pretty')
            // display abstract
            articleCard.append(articleAbstract)

            // create container for posted details
            const articlePostedDetails = document.createElement('div')
            articlePostedDetails.classList.add('border-t', 'border-black/40', 'mt-auto')

            // create article byline
            const articleByline = document.createElement('div')
            articleByline.innerText = `${e.byline}`
            articleByline.classList.add('ml-1')
            // display byline
            articlePostedDetails.append(articleByline)

            // create article posted time
            const articleCreated = document.createElement('div')
            articleCreated.innerText = `Posted: ${new Date(e.created_date).toLocaleDateString('en-US', defaultDateFormat)} at ${new Date(e.created_date).toLocaleTimeString('en-US', defaultTimeFormat)}`
            articleCreated.classList.add('ml-1')
            // display posted time
            articlePostedDetails.append(articleCreated)

            // check if article has been updated since initial post
            if (e.updated_date != e.created_date) {
                // create article updated time
                const articleUpdated = document.createElement('div')
                articleUpdated.innerText = `Updated: ${new Date(e.updated_date).toLocaleDateString('en-US', defaultDateFormat)} at ${new Date(e.updated_date).toLocaleTimeString('en-US', defaultTimeFormat)}`
                articleUpdated.classList.add('ml-1', 'mb-1')
                // display updated time
                articlePostedDetails.append(articleUpdated)
            } else {
                // if not updated, apply margin to created div instead of updated div
                articleCreated.classList.add('mb-1')
            }
            articleCard.append(articlePostedDetails)
        }
    })
}

const articleSwitch = (opt) => {
    switch (opt) {
        case 'arts':
            section = 'arts'
            break
        case 'business':
            section = 'business'
            break
        case 'dining':
            section = 'dining'
            break
        case 'fashion':
            section = 'fashion'
            break
        case 'healthmagazine':
            section = 'health'
            break
        case 'nationalopinion':
            section = 'opinion'
            break
        case 'politics':
            section = 'politics'
            break
        case 'realestate':
            section = 'real estate'
            break
        case 'science':
            section = 'science'
            break
        case 'sports':
            section = 'sports'
            break
        case 'technology':
            section = 'technology'
            break
        case 'world':
            section = 'world'
            break
        default:
            section = 'default'
    }
    return section
}