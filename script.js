$('.save-btn').on('click', createCard);
$('.new-idea-section').on('click', deleteIdea);
$('.new-idea-section').on('click', upvoteIdea);
$('.new-idea-section').on('click', downvoteIdea);



recallCards();

function upvoteIdea(event) {
  var id = $(event.target).parent().attr('id');
  var element = $(event.target).siblings('.quality');
  var parsedIdea = JSON.parse(localStorage.getItem(id));
  if (event.target.classList.contains('upvote-btn') && element.text() === 'Quality: swill') {
   element.text('Quality: plausible');
   parsedIdea.quality = 'plausible';
   setIdea(id, parsedIdea)
  } else if (event.target.classList.contains('upvote-btn') && element.text() === 'Quality: plausible') {
    element.text('Quality: genius');
   parsedIdea.quality = 'genius';
   setIdea(id, parsedIdea)
  }

}

function downvoteIdea() {
   var id = $(event.target).parent().attr('id');
   var element = $(event.target).siblings('.quality')
   var parsedIdea = JSON.parse(localStorage.getItem(id));
  if (event.target.classList.contains('downvote-btn') && element.text() === 'Quality: genius') {
   element.text('Quality: plausible');
   parsedIdea.quality = 'plausible';
   setIdea(id, parsedIdea);
  } else if (event.target.classList.contains('downvote-btn') && element.text() === 'Quality: plausible') {
   element.text('Quality: swill');
   parsedIdea.quality = 'swill';
   setIdea(id, parsedIdea);
  }

}

function setIdea(id, parsedIdea) {
  localStorage.setItem(id, JSON.stringify(parsedIdea))
}

function generateCard(id, title, body, quality) {
  return `<article class="new-idea" id="${id}">
            <article class="idea-header">
              <h2 class="idea">${title}</h2>
              <button class="delete-btn"></button>
            </article>
            <p>${body}</p>
            <button class="upvote-btn"></button>
            <button class="downvote-btn"></button>
            <p class="quality">Quality: ${quality}</p>
          </article>`;
}

function createCard(event) {
  event.preventDefault();
  var titleInput = $('.title-input').val();
  var ideaInput = $('.idea-input').val();
  var newIdea = createIdea(titleInput, ideaInput);
  $('.new-idea-card').prepend(
    generateCard(newIdea.id, titleInput, ideaInput, newIdea.quality)
  );
  clearInputs();
}

function clearInputs() {
  $('.title-input').val('');
  $('.idea-input').val('');
}

function deleteIdea(event) {
  if (event.target.classList.contains('delete-btn')) {
    var id = $(event.target).parent().parent().attr('id');
    localStorage.removeItem(id);  
    $(event.target).parent().parent().remove();
  }
}

function NewIdea(title, body) {
  this.id = $.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function createIdea(title, body) {
  var newIdea = new NewIdea(title, body);
  var stringifiedIdea = JSON.stringify(newIdea);
  localStorage.setItem(newIdea.id, stringifiedIdea); 
  return newIdea
  
};

function recallCards() {
  for (var i = 0; i < localStorage.length; i++) {
    var parsedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var html = generateCard(parsedIdea.id, parsedIdea.title, parsedIdea.body, parsedIdea.quality);
    $('.new-idea-card').prepend(html);
  }
}