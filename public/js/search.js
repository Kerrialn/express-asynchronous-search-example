const $keyword = document.querySelector("#keyword");
const $jobs = document.querySelector("#jobs");

// Template
const jobsTemplate = document.querySelector("#jobsTemplate").innerHTML;

$keyword.addEventListener('keydown', (event)=>{
  search('/search', { keyword: $keyword.value }).then(data => {
    
    const jobs = data.jobs;
    const html = Mustache.render(jobsTemplate, {jobs});
    $jobs.innerHTML = html;

  }).catch((error)=>{
    console.log(error);
  });
});

async function search(url = '', data = {}) {
  // Default options are marked with *

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}