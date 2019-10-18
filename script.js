$('.save-btn').on('click', createCard);
$('.new-idea-section').on('click', handleEditIdea);
$('.title-input').on('keyup', enableSave);
$('.idea-input').on('keyup', enableSave);
$(".search-bar").on("keyup", search);
$('.new-idea-section').on('keydown', function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    editIdea(e, 'body');
    $('.body').trigger('blur');
  }
});
$('.new-idea-section').on('focusout', function(e) {
  editIdea(e, 'title');
});

recallCards();

function NewIdea(title, body) {
  this.id = $.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function createIdea(title, body) {
  var newIdea = new NewIdea(title, body);
  setIdea(newIdea.id, newIdea); 
  return newIdea;
}
  
function setIdea(id, parsedIdea) {
  var parsedIdeas = JSON.parse(localStorage.getItem('idea-box-ideas'));
  if (parsedIdeas && parsedIdeas.length) {
    localStorage.setItem('idea-box-ideas', JSON.stringify([...parsedIdeas, parsedIdea]))
  } else {
    localStorage.setItem('idea-box-ideas', JSON.stringify([parsedIdea]))
  }
};

function enableSave() {
  if ($('.title-input').val() === '' || $('.idea-input').val() === '') {
    $('.save-btn').prop('disabled', true);
  } else {
    $('.save-btn').prop('disabled', false);
  }
}

function createCard(e) {
  e.preventDefault();
  var titleInput = $('.title-input').val();
  var ideaInput = $('.idea-input').val();
  var newIdea = createIdea(titleInput, ideaInput);
  $('.new-idea-card').prepend(
    generateCard(newIdea.id, titleInput, ideaInput, newIdea.quality)
  );
  clearInputs();
}

function generateCard(id, title, body, quality) {
  return `<article class="new-idea" id="${id}">
            <article class="idea-header">
              <h2 class="title" contenteditable="true">${title}</h2>
              <button class="delete-btn"></button>
            </article>
            <p class="body" contenteditable="true">${body}</p>
            <div class="quality-btn">
              <button class="upvote-btn"></button>
              <button class="downvote-btn"></button>
              <p class="quality">quality: ${quality}</p>
            </div>
          </article>`;
}

function clearInputs() {
  $('.title-input').val('');
  $('.idea-input').val('');
  $('.save-btn').prop('disabled', true);
}

function handleEditIdea(e) {
  if (e.target.classList.contains('upvote-btn')) {
    upvoteIdea(e);
  } else if (e.target.classList.contains('downvote-btn')) {
    downvoteIdea(e);
  } else if (e.target.classList.contains('delete-btn')) {
    deleteIdea(e);
  };
};

function upvoteIdea(e) {
  var id = $(e.target).parent().parent().attr('id');
  var element = $(e.target).siblings('.quality');
  var parsedIdea = JSON.parse(localStorage.getItem(id));
  if (element.text() === 'quality: swill') {
   element.text('quality: plausible');
   parsedIdea.quality = 'plausible';
   setIdea(id, parsedIdea)
  } else if (element.text() === 'quality: plausible') {
    element.text('quality: genius');
    parsedIdea.quality = 'genius';
    setIdea(id, parsedIdea)
  }
}

function downvoteIdea() {
   var id = $(event.target).parent().parent().attr('id');
   var element = $(event.target).siblings('.quality')
   var parsedIdea = JSON.parse(localStorage.getItem(id));
  if (element.text() === 'quality: genius') {
   element.text('quality: plausible');
   parsedIdea.quality = 'plausible';
   setIdea(id, parsedIdea);
  } else if (element.text() === 'quality: plausible') {
   element.text('quality: swill');
   parsedIdea.quality = 'swill';
   setIdea(id, parsedIdea);
  }
}

function editIdea(e, ideaProperty) {
  e.preventDefault();
  if ($(e.target).hasClass(ideaProperty)) {
    var id = $(e.target).parent().parent().attr('id');
    var parsedIdea = JSON.parse(localStorage.getItem(id));
    var changedProperty = e.target.innerText;
    parsedIdea[ideaProperty] = changedProperty;
    setIdea(id, parsedIdea);
  }
}

function editBody(e) {
  e.preventDefault();
  if ($(e.target).hasClass('body')) {
    var id = $(e.target).parent().attr('id');
    var parsedIdea = JSON.parse(localStorage.getItem(id));
    var changeBody = e.target.innerText;
    parsedIdea.body = changeBody;
    setIdea(id, parsedIdea);
  } 
}

function deleteIdea(e) {
  var id = $(e.target).parent().parent().attr('id');
  localStorage.removeItem(id);  
  $(e.target).parent().parent().remove();
}

function recallCards() {
  var parsedIdeas = JSON.parse(localStorage.getItem('idea-box-ideas'));
  if(parsedIdeas && parsedIdeas.length) {
    for (var i = 0; i < parsedIdeas.length; i++) {
      var html = generateCard(parsedIdeas[i].id, parsedIdeas[i].title, parsedIdeas[i].body, parsedIdeas[i].quality);
      $('.new-idea-card').prepend(html);
    }
  }
}


function search() {
 var searchValue = $(this).val().toLowerCase();
 $(".new-idea").filter(function() {
   $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
 });
}