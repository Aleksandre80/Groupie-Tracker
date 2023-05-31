document.addEventListener('DOMContentLoaded', function() {
    var slides = document.getElementsByClassName('swiper-slide');
  
    for (var i = 0; i < slides.length; i++) {
      slides[i].addEventListener('mouseover', showGroupInfo);
      slides[i].addEventListener('mouseout', hideGroupInfo);
    }
  
    function showGroupInfo() {
      var artistName = this.getAttribute('data-artist-name');
      var artistMembers = this.getAttribute('data-artist-members');
      var creationDate = this.getAttribute('data-artist-creation-date');
      var firstAlbum = this.getAttribute('data-artist-first-album');
  
      var groupInfoContainer = document.createElement('div');
      groupInfoContainer.classList.add('group-info-container');
  
      var groupNameElement = document.createElement('h2');
      groupNameElement.classList.add('group-name');
      groupNameElement.textContent = artistName;
  
      var groupMembersElement = document.createElement('p');
      groupMembersElement.classList.add('group-members');
      groupMembersElement.textContent = 'Members: ' + artistMembers;
  
      var groupCreationDateElement = document.createElement('p');
      groupCreationDateElement.classList.add('group-creation-date');
      groupCreationDateElement.textContent = 'Creation Date: ' + creationDate;
  
      var groupFirstAlbumElement = document.createElement('p');
      groupFirstAlbumElement.classList.add('group-first-album');
      groupFirstAlbumElement.textContent = 'First Album: ' + firstAlbum;
  
      groupInfoContainer.appendChild(groupNameElement);
      groupInfoContainer.appendChild(groupMembersElement);
      groupInfoContainer.appendChild(groupCreationDateElement);
      groupInfoContainer.appendChild(groupFirstAlbumElement);
  
      this.appendChild(groupInfoContainer);
    }
  
    function hideGroupInfo() {
      var groupInfoContainer = this.querySelector('.group-info-container');
      if (groupInfoContainer) {
        this.removeChild(groupInfoContainer);
      }
    }
  });
  