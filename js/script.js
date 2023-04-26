'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    function deleteAds () {
        let adsContainer = document.querySelector(".promo__adv");
        let ads = adsContainer.querySelectorAll("img");
        ads.forEach(item => {
            item.remove();
        });
    }

    function changeGenre () {
        let genre = document.querySelector(".promo__genre");
        genre.textContent = "Драма";
    }

    function changeBackground () {
        let back = document.querySelector(".promo__bg");
        back.style = "background: url(./img/bg.jpg) center center/cover no-repeat";
    }

    let movieList = document.querySelector(".promo__interactive-list");

    function createMovieList (films, parent) {
        parent.innerHTML = "";
        films.sort();
        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">
                ${i + 1} ${film}
                <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(movieDB.movies, movieList);
            })
        });
    }

    const addForm = document.querySelector("form.add"),
          addInput = addForm.querySelector("input"),
          checkBox = addForm.querySelector("[type='checkbox']");

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newFilm = addInput.value;
        const favorite = checkBox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добовляем любимый фильм");
            }

            movieDB.movies.push(newFilm);
            createMovieList(movieDB.movies, movieList);
        }

        addForm.reset();
    });

    deleteAds();
    changeGenre();
    changeBackground();
    createMovieList(movieDB.movies, movieList);


});