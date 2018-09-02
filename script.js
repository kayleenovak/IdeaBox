$('.save-btn').on('click', createIdea);
$('.new-idea-section').on('click', deleteIdea);

function createIdea(event) {
  event.preventDefault();
  $('.new-idea-card').prepend(`<article class="new-idea">
      <article class="idea-header">
        <h2 class="idea">${$('.title-input').val()}</h2>
        <button class="delete-btn"></button>
      </article>
      <p>${$('.idea-input').val()}</p>
      <button class="upvote-btn"></button>
      <button class="downvote-btn"></button>
    </article>`);
  clearInputs();
}

function clearInputs() {
  $('.title-input').val('');
  $('.idea-input').val('');
}

function deleteIdea(event) {
  if (event.target.classList.contains('delete-btn')) {
    $(event.target).parent().parent().remove();
  }
}