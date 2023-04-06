let popupOpen = false;

const togglePopup = () => {
  const popupSection = document.querySelector(".popUpSection");

  if (popupOpen) {
    popupSection.style.display = "none";
  } else {
    popupSection.innerHTML = `<div class="popUp"><div class="popUpAround"><input class="tituloInput" type="text" placeholder="Titulo..."><input class="conteudoInput" type="text" placeholder="Conteúdo..."><button class="btn-popUp" onclick="createPost(); togglePopup()"><i class="fa-solid fa-check"></i></button><button class="btn-popUp" onclick="togglePopup()"><i class="fa-solid fa-x"></i></button>/div></div>`;
    popupSection.style.display = "block";
  }

  popupOpen = !popupOpen;
  document.querySelector(".tituloInput").value = "";
  document.querySelector(".conteudoInput").value = "";
};

const createPost = () => {
    const title = document.querySelector(".tituloInput").value;
    const body = document.querySelector(".conteudoInput").value;
  
    fetch("http://localhost:4000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    })
    document.querySelector(".timeLine").innerHTML = '';
    updatePosts();
  };

  const updatePosts = () => {
    document.querySelector(".timeLine").innerHTML = '';
    fetch("http://localhost:4000/api/posts/to-do", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((res) => res.json())
        .then((data) => {
            for(let i = 0; i < data.length; i++) {
                document.querySelector(".timeLine").innerHTML += data[i].showPost;
                document.querySelector(`.complete`).addEventListener('click', () => {completeTask(data[i].id)})
            }
        });
  };

  const completeTask = (id) => {
    fetch(`http://localhost:4000/api/posts/${id}/complete`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    });
    updatePosts();
  };


  
  const updatePostsCompleted = () => {
    document.querySelector(".timeLine").innerHTML = '';
    fetch("http://localhost:4000/api/posts/completed", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((res) => res.json())
        .then((data) => {
            for(let i = 0; i < data.length; i++) {
                document.querySelector(".timeLine").innerHTML += data[i].showPost;
                document.getElementById(`${data[i].id}`).classList.add("completed");
            }
        });
  };

updatePosts();