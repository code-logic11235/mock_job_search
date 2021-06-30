document.querySelector(".button-container").addEventListener('click', ()=>{
  let text = document.getElementById('filter-jobs').value;
  // console.log(text);
  getJob().then(jobs =>{
    // console.log(jobs, 'this my job haha')
    // console.log(text)
    let filteredJobs= filterJobs(jobs, text);
    // console.log('filterJobs;  ', filteredJobs )

    showJobs(filteredJobs)
  })

})

function getJob(){
 return fetch("data.json")
  .then((response)=>{return response.json()})
  .then(data => {
    return data;
  })
}

function filterJobs(jobs, searchText) {
  if (searchText) {
      let filteredJobs = jobs.filter(job => {
          if (job.roleName.toLowerCase().includes(searchText) 
          || job.type.toLowerCase().includes(searchText)
          || job.company.toLowerCase().includes(searchText)
          || job.requirements.content.toLowerCase().
          includes(searchText)) {
              return true;
          } else {
              return false;
          }
      })
      return filteredJobs;
  } else {
      return jobs;
  }
}


function jobTileTemplate ({logo, roleName, requirements}) { return `
<div class="job-tile">
<div class="top">
  <img src = '${logo}' />
  <span class="material-icons more_horiz">more_horiz</span>
</div>
<div class = 'rolename'>
  <span> ${roleName} </span>
</div>
<div class='description'>
  <span>${requirements.content}</span>
</div>
<div class='buttons'>
  <div class= 'button apply-now'>
    Apply Now
  </div>
  <div class='button'>
    Message
  </div>
</div>
</div>`
}
function showJobs(jobs) {
  let numberOfJobs = Object.keys(jobs).length;
  document.querySelector('.job-list h1').innerHTML = `Showing ${numberOfJobs} jobs availiable`
  let jobsContainer = document.querySelector('.jobs-container');
  jobsContainer.innerHTML ='';
  jobs.forEach(element => {
    jobsContainer.innerHTML += jobTileTemplate(element);
  });
}
//getjobs() request data from data.json returns a promise then with pasrse the body
// to get data and usse that inside of our showJobs function
getJob().then(data=>{
  showJobs(data);
})