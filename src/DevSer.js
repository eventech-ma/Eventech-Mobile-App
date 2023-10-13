// checking server Worker
export default function swDev() {
    let swUrl = `${process.env.PUBLIC_URL}/serviceworker.js`
    navigator.serviceWorker.register(swUrl)
}
