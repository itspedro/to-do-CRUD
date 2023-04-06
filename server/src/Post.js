class Post {

    static counter = 0;

    constructor (titulo, corpo, completed = false,) {
        this.titulo = titulo;
        this.corpo= corpo;
        this.id = this.holdId();
        this.completed = completed;
        this.showPost = this.showPost();
    }

    holdId() {
        return ++Post.counter;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    showPost() {
        return `<div id="${this.id}"class="post"><div class="post-content"><h2>${this.titulo}<h2><p>${this.corpo}<p></div><div class="post-buttons"><button class="complete"><i class="fa fa-check"></i></button><button class="delete"><i class="fa fa-trash"></i></button></div></div>`;
    }

}

module.exports = Post;
