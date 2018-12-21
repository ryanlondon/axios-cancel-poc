document.addEventListener('DOMContentLoaded', () => {
	const host = 'http://localhost:4000'
	let cancelIsActive = false

	document.getElementById('fetch-slow').addEventListener('click', makeSlowRequest)
	document.getElementById('fetch-fast').addEventListener('click', makeFastRequest)
	document.getElementById('toggle-cancel').addEventListener('click', toggleCancel)
	const p = document.getElementById('data')

	const CancelToken = axios.CancelToken
	let cancelSlowRequest

	async function makeSlowRequest() {
		const request = {
			method: 'GET',
			url: `${host}/slow`,
			cancelToken: new CancelToken((c) => (cancelSlowRequest = c)),
		}

		try {
			const response = await axios(request)
			p.textContent = response.data
			p.style.color = 'red'
		} catch (err) {
			console.log('Slow request was cancelled')
		}
	}

	async function makeFastRequest() {
		const request = {
			method: 'GET',
			url: `${host}/fast`,
		}

		if (cancelSlowRequest && cancelIsActive) cancelSlowRequest()

		const response = await axios(request)
		p.textContent = response.data
		p.style.color = 'green'
	}

	function toggleCancel(e) {
		cancelIsActive = e.target.checked
	}
})
