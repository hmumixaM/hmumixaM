const directory = document.querySelector('.directory');
const projects = Array.from(directory.querySelectorAll('details'));
const command = document.querySelector('#command');
const result = document.querySelector('#result');

function openProject(project) {
  project.open = true;
  project.querySelector('summary').focus();
  project.scrollIntoView({ block: 'nearest' });
}

function followFragment() {
  const project = projects.find(item => item.id === location.hash.slice(1));
  if (project) openProject(project);
}

document.querySelector('#shell').addEventListener('submit', event => {
  event.preventDefault();
  const entry = command.value.trim().toLowerCase();
  if (!entry) return;
  command.value = '';

  if (entry === 'ls' || entry === 'open projects') {
    result.textContent = projects.map(project => project.id).join('  ·  ');
  } else if (entry === 'help') {
    result.textContent = 'ls lists projects. open <project> opens its details. clear clears this line.';
  } else if (entry === 'clear') {
    result.textContent = '';
  } else {
    const [, slug] = /^open\s+([\w-]+)$/.exec(entry) || [];
    const project = projects.find(item => item.id === slug);
    if (!project) {
      result.textContent = 'Unknown command or project. Type ls for project names or help for commands.';
      return;
    }
    result.textContent = 'Opened ' + project.querySelector('strong').textContent + '.';
    if (location.hash === '#' + slug) openProject(project);
    else location.hash = slug;
  }
});

window.addEventListener('hashchange', followFragment);
followFragment();
document.querySelector('#terminal').hidden = false;
