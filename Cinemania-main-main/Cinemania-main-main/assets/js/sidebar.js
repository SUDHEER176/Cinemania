'use strict';

import { api_key, fetchDataFromServer } from "./api.js";

export function sidebar() {

    // fetch all genres
    const genreList = {};

   fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({ genres }) {
    for( const{id,name} of genres) {
        genreList[id]= name;
    }
    genreLink();
   } );

    const sidebarInner = document.createElement("div");
    sidebarInner.classList.add("sidebar-inner");

    sidebarInner.innerHTML =  `
        <div class="sidebar-list">
            <p class="title">Genre</p>
        </div>

        <div class="sidebar-list">
            <p class="title">Language</p>
            <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=hi", "Hindi")'>Hindi</a>
            <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=en", "English")'>English</a>
            <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=bn", "Bengali")'>Bengali</a>
        </div>

// Replace the Account section with this:
<div class="sidebar-list">
        <p class="title">Account</p>
        ${localStorage.getItem('currentUser') 
            ? `
              <a href="./profile.html" menu-close class="sidebar-link">Profile</a>
              <a href="#" menu-close class="sidebar-link" id="logoutBtn">Logout</a>
              `
            : `
              <a href="./login.html" menu-close class="sidebar-link">Login</a>
              <a href="./signup.html" menu-close class="sidebar-link">Sign Up</a>
              `
        }
    </div>

        <div class="sidebar-footer">
            <p class="copyright">
                Copyright 2024 <a href="">Kineflix</a>
            </p>
        </div>  
    `;

    // Add logout event listener
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html'; // Redirect to homepage after logout
    });
}

    function genreLink() {
        for (const [genreId, genreName] of Object.entries(genreList)) {
            const link = document.createElement("a");
            link.classList.add("sidebar-link");
            link.setAttribute("href", "./movie-list.html");
            link.setAttribute("menu-close", "");
            link.setAttribute("onclick", `getMovieList("with_genres=${genreId}","${genreName}")`);
            link.textContent = genreName;
            sidebarInner.querySelector(".sidebar-list").appendChild(link);
        }

        const sidebar = document.querySelector(".sidebar"); 
        sidebar.appendChild(sidebarInner);
        toggleSidebar(sidebar);
       
    }   

    const  toggleSidebar= function(sidebar) {
        // Toggle sidebar in mobile screen

        const sidebarBtn = document.querySelector("[menu-btn]");
        const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
        const sidebarClose = document.querySelectorAll("[menu-close]");
        const overlay = document.querySelector("[overlay]");

        addEventOnElements(sidebarTogglers, "click", function () {
            sidebar.classList.toggle("active");
            sidebarBtn.classList.toggle("active");
            overlay.classList.toggle("active");
        });

        addEventOnElements(sidebarClose, "click", function () {
            sidebar.classList.remove("active");
            sidebarBtn.classList.remove("active");
            overlay.classList.remove("active");
        });
    }
}
