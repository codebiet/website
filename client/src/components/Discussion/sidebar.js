import React from 'react';
// import './sidebar.css';

export const Sidebar = () => {
    return (
        <div id="qnasidebar" class="col-xs-12 col-lg-3 mt-20 ">

            <div class="search">
                <form class="search-form">
                    <input type="text" placeholder="Search for categories and more.."  />
                    <input type="submit" value="submit" />
                </form>
            </div>

            
            <div class="card mt-20 categories">
                <article class="card-group-item">
                    <header class="card-header"><h6 class="title">Similar Categories </h6></header>
                    <div class="filter-content">
                        <div class="list-group list-group-flush">
                          <a href="#" class="list-group-item">Problem Solving<span class="float-right badge badge-warning badge-pill">142</span> </a>
                          <a href="#" class="list-group-item">Data Structures<span class="float-right badge badge-warning badge-pill">3</span>  </a>
                          <a href="#" class="list-group-item">Web Development<span class="float-right badge badge-warning badge-pill">32</span>  </a>
                          <a href="#" class="list-group-item">Interview Preparation<span class="float-right badge badge-warning badge-pill">12</span>  </a>
                          <a href="#" class="list-group-item">Android Development<span class="float-right badge badge-warning badge-pill">12</span>  </a>
                          <a href="#" class="list-group-item">Competitive Coding<span class="float-right badge badge-warning badge-pill">12</span>  </a>
                        </div> 
                    </div>
                </article>
            </div>
           
            <div class="card mt-20 categories">
                <article class="card-group-item">
                    <header class="card-header"><h6 class="title">Filter by Tags</h6></header>
                    <div class="filter-content">
                        <div class="card-body">
                            <div class="tagContainer">
                                <a href="#" class="tag color1">OOPs Concept&nbsp;</a>
                                <a href="#" class="tag color2">Polymorphism&nbsp;</a>
                                <a href="#" class="tag color3">Java&nbsp;</a>
                                <a href="#" class="tag color4">Programming Languages&nbsp;</a>
                                <a href="#" class="tag color5">Infosys Interview&nbsp;</a>
                                <a href="#" class="tag color6">GATE Preparation&nbsp;</a>
                                <a href="#" class="tag color2">OOPs Concept&nbsp;</a>
                                <a href="#" class="tag color1">Polymorphism&nbsp;</a>
                                <a href="#" class="tag color4">Java&nbsp;</a>
                                <a href="#" class="tag color6">Programming Languages&nbsp;</a>
                                <a href="#" class="tag color3">Infosys Interview&nbsp;</a>
                                <a href="#" class="tag color5">GATE Preparation&nbsp;</a>
                                <a href="#" class="tag color1">OOPs Concept&nbsp;</a>
                                <a href="#" class="tag color6">Polymorphism&nbsp;</a>
                                <a href="#" class="tag color4">Java&nbsp;</a>
                                <a href="#" class="tag color5">Programming Languages&nbsp;</a>
                                <a href="#" class="tag color2">Infosys Interview&nbsp;</a>
                                <a href="#" class="tag color3">GATE Preparation&nbsp;</a>
                            </div>
                        </div> 
                    </div>
                </article>
            </div>
            

        </div>
    )
}
