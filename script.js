const form = document.getElementById("filterForm");

form.addEventListener("submit", async (event) => {

event.preventDefault();

const response = await fetch("resources.json");
const data = await response.json();

const keyword =
document.getElementById("searchInput").value.toLowerCase();

const subject =
document.getElementById("subject").value;

const grade =
document.getElementById("grade").value;

const filtered = data.filter(resource => {

const matchesKeyword =
resource.title.toLowerCase().includes(keyword) ||
resource.subject.toLowerCase().includes(keyword) ||
resource.type.toLowerCase().includes(keyword);

const matchesSubject =
subject === "all" ||
resource.subject.toLowerCase() === subject;

const matchesGrade =
grade === "all" ||
resource.grade === grade;

return matchesKeyword &&
matchesSubject &&
matchesGrade;

});

displayResults(filtered);

});

function displayResults(resources){

const container =
document.getElementById("results");

const resultCount =
document.getElementById("resultCount");

container.innerHTML = "";

resultCount.textContent =
`${resources.length} resource(s) found`;

if(resources.length === 0){

container.innerHTML = `
<p>No resources matched your search.</p>
`;

return;
}

resources.forEach(resource => {

const card =
document.createElement("article");

card.classList.add("resource-card");

card.innerHTML = `
<h3>${resource.title}</h3>

<p>${resource.description}</p>

<div class="resource-meta">
<span>${resource.subject}</span>
<span>Grade ${resource.grade}</span>
<span>${resource.type}</span>
<span>${resource.duration}</span>
</div>

<p><strong>Downloads:</strong> ${resource.downloads}</p>

<div class="card-actions">
<button>Preview</button>
<button class="secondary-btn">Bookmark</button>
</div>
`;

container.appendChild(card);

});
}

window.addEventListener("DOMContentLoaded", async () => {

const response = await fetch("resources.json");
const data = await response.json();

displayResults(data);

});