document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    var suggestionList = document.getElementById('suggestionList');
    var slides = document.getElementsByClassName('swiper-slide');
  
    var MIN_SEARCH_LENGTH = 2;
  
    if (searchInput && suggestionList) {
      searchInput.addEventListener('input', function() {
        var searchTerm = searchInput.value.trim().toLowerCase();
  
        if (searchTerm.length >= MIN_SEARCH_LENGTH) {
          filterSlides(searchTerm);
          showSuggestions(searchTerm);
        } else {
          filterSlides('');
          suggestionList.innerHTML = '';
        }
      });
  
      function showSuggestions(searchTerm) {
        suggestionList.innerHTML = '';
  
        var suggestions = Array.from(slides).map(function(slide) {
          return slide.getAttribute('data-artist-name').toLowerCase();
        }).filter(function(artistName) {
          return artistName.includes(searchTerm);
        });
  
        suggestions.forEach(function(artistName) {
          var suggestionItem = document.createElement('li');
          suggestionItem.textContent = artistName;
          suggestionItem.addEventListener('click', function() {
            searchInput.value = artistName;
            filterSlides(artistName.toLowerCase());
          });
          suggestionList.appendChild(suggestionItem);
        });
      }
    }
  
    function filterSlides(searchTerm) {
      for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        var artistName = slide.getAttribute('data-artist-name').toLowerCase();
        if (artistName.includes(searchTerm)) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      }
    }
  });
  