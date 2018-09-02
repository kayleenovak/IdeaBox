$('.save-btn').on('click', createCard);
$('.new-idea-section').on('click', deleteIdea);

function generateCard(id, title, body) {
  return `<article class="new-idea">
      <article class="idea-header">
        <h2 class="idea">${title}</h2>
        <button id="${id}" class="delete-btn"></button>
      </article>
      <p>${body}</p>
      <button class="upvote-btn"></button>
      <button class="downvote-btn"></button>
    </article>`
}

function createCard(event) {
  event.preventDefault();
  var titleInput = $('.title-input').val();
  var ideaInput = $('.idea-input').val();
  var newIdea = createIdea(titleInput, ideaInput);
  $('.new-idea-card').prepend(
    generateCard(newIdea.id, titleInput, ideaInput)
  );
  clearInputs();
}

function clearInputs() {
  $('.title-input').val('');
  $('.idea-input').val('');
}

function deleteIdea(event) {
  if (event.target.classList.contains('delete-btn')) {
    var id = event.target.id
    var ideas = JSON.parse(localStorage.getItem('ideas'))
    delete ideas[id]
    localStorage.setItem('ideas', JSON.stringify(ideas))
    $(event.target).parent().parent().remove();
  }
}

function NewIdea(title, body) {
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function createIdea(title, idea) {
  var createIdea = new NewIdea(title, idea);
  var ideas = {};  // Empty object is default value
  var storageItem = localStorage.getItem('ideas');
  var parsedJson = JSON.parse(storageItem);
  if (parsedJson) {
    ideas = parsedJson;
  }
  ideas[createIdea.id] = createIdea;
  var stringJson = JSON.stringify(ideas);
  localStorage.setItem('ideas', stringJson);
  return createIdea;
}

var ideas = JSON.parse(localStorage.getItem('ideas'))

var keys = Object.keys(ideas)
for(i = 0; i < keys.length; i++) {
  var key = keys[i]
  var idea = ideas[key]
  var html = generateCard(idea.id, idea.title, idea.body)
  $('.new-idea-card').prepend(html)
}





