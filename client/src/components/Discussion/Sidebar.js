import React from "react";
// import './sidebar.css';

const Sidebar = ({
  category = [],
  setCategory = () => "",
  setTags,
  tags = [],
  searchInputValue,
  changeSearchInputValue,
  handleSearch,
}) => {
  const handleTagFilterChange = (newFilter) => {
    setTags((prev) => {
      const index = prev.indexOf(newFilter);
      if (index >= 0) prev.splice(index, 1);
      else prev.push(newFilter);
      return [...prev];
    });
  };
  return (
    <div id="qnasidebar" className="col-xs-12 col-lg-3 mt-20 ">
      <div className="search">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for categories and more.."
            value={searchInputValue}
            onChange={changeSearchInputValue}
          />
          <input type="submit" value="submit" />
        </form>
      </div>

      <div className="card mt-20 categories">
        <article className="card-group-item">
          <header className="card-header">
            <h6 className="title">Similar Categories </h6>
          </header>
          <div className="filter-content">
            <div className="list-group list-group-flush">
              <a
                href="javascript:void(0)"
                className={
                  category == "Java"
                    ? "list-group-item selected"
                    : "list-group-item"
                }
                onClick={() => setCategory("Java")}
              >
                Java
                {/* <span className="float-right badge badge-warning badge-pill">
                  142
                </span> */}
              </a>
              <a
                href="javascript:void(0)"
                className={
                  category == "Python"
                    ? "list-group-item selected"
                    : "list-group-item"
                }
                onClick={() => setCategory("Python")}
              >
                Python
              </a>
              <a
                href="javascript:void(0)"
                className="list-group-item"
                className={
                  category == "Programming Languages"
                    ? "list-group-item selected"
                    : "list-group-item"
                }
                onClick={() => setCategory("Programming Languages")}
              >
                Programming Languages
              </a>
              <a
                href="javascript:void(0)"
                className={
                  category == "DS and Algo"
                    ? "list-group-item selected"
                    : "list-group-item"
                }
                onClick={() => setCategory("DS and Algo")}
              >
                DS & Algo
                {/* <span className="float-right badge badge-warning badge-pill">
                  3
                </span> */}
              </a>
              <a
                href="javascript:void(0)"
                className={
                  category == "Competitive Programming"
                    ? "list-group-item selected"
                    : "list-group-item"
                }
                onClick={() => setCategory("Competitive Programming")}
              >
                Competitive Programming
              </a>
              <a
                href="javascript:void(0)"
                className={
                  category == "Operating Systems"
                    ? "list-group-item selected"
                    : "list-group-item"
                }
                onClick={() => setCategory("Operating Systems")}
              >
                Operating Systems
              </a>
              <a
                href="javascript:void(0)"
                className={
                  category == "DBMS"
                    ? "list-group-item selected"
                    : "list-group-item"
                }
                onClick={() => setCategory("DBMS")}
              >
                DBMS
              </a>
              <a
                href="javascript:void(0)"
                className={
                  category == "Web Development"
                    ? "list-group-item selected"
                    : "list-group-item"
                }
                onClick={() => setCategory("Web Development")}
              >
                Web Development
              </a>
              <a
                href="javascript:void(0)"
                className={
                  category == "Android Development"
                    ? "list-group-item selected"
                    : "list-group-item"
                }
                onClick={() => setCategory("Android Development")}
              >
                Android Development
              </a>
              <a
                href="javascript:void(0)"
                className={
                  category == "ML and AI"
                    ? "list-group-item selected"
                    : "list-group-item"
                }
                onClick={() => setCategory("ML and AI")}
              >
                ML & AI
              </a>
              <a
                href="javascript:void(0)"
                className={
                  category == "Interview Preparation"
                    ? "list-group-item selected"
                    : "list-group-item"
                }
                onClick={() => setCategory("Interview Preparation")}
              >
                Interview Preparation
                {/* <span className="float-right badge badge-warning badge-pill">
                  12
                </span> */}
              </a>
            </div>
          </div>
        </article>
      </div>

      <div className="card mt-20 categories">
        <article className="card-group-item">
          <header className="card-header">
            <h6 className="title">Filter by Tags</h6>
          </header>
          <div className="filter-content">
            <div className="card-body">
              <div className="tagContainer">
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("OOPs") ? "tag color1 selected" : "tag color1"
                  }
                  onClick={() => handleTagFilterChange("OOPs")}
                >
                  OOPs Concept&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Polymorphism")
                      ? "tag color2 selected"
                      : "tag color2"
                  }
                  onClick={() => handleTagFilterChange("Polymorphism")}
                >
                  Polymorphism&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Programming Languages")
                      ? "tag color4 selected"
                      : "tag color4"
                  }
                  onClick={() => handleTagFilterChange("Programming Languages")}
                >
                  Programming Languages&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Interview Preparation")
                      ? "tag color5 selected"
                      : "tag color5"
                  }
                  onClick={() => handleTagFilterChange("Interview Preparation")}
                >
                  Interview Preparation&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Gate Preparation")
                      ? "tag color6 selected"
                      : "tag color6"
                  }
                  onClick={() => handleTagFilterChange("Gate Preparation")}
                >
                  GATE Preparation&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Dynamic Programming")
                      ? "tag color1 selected"
                      : "tag color1"
                  }
                  onClick={() => handleTagFilterChange("Dynamic Programming")}
                >
                  Dynamic Programming&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Greedy Algorithms")
                      ? "tag color4 selected"
                      : "tag color4"
                  }
                  onClick={() => handleTagFilterChange("Greedy Algorithms")}
                >
                  Greedy Algorithms&nbsp;
                </a>

                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Stack")
                      ? "tag color3 selected"
                      : "tag color3"
                  }
                  onClick={() => handleTagFilterChange("Stack")}
                >
                  Stack&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Queues")
                      ? "tag color5 selected"
                      : "tag color5"
                  }
                  onClick={() => handleTagFilterChange("Queues")}
                >
                  Queues&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Trees")
                      ? "tag color1 selected"
                      : "tag color1"
                  }
                  onClick={() => handleTagFilterChange("Trees")}
                >
                  Trees&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Graph Theory")
                      ? "tag color6 selected"
                      : "tag color6"
                  }
                  onClick={() => handleTagFilterChange("Graph Theory")}
                >
                  Graph Therory&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("DFS") ? "tag color6 selected" : "tag color6"
                  }
                  onClick={() => handleTagFilterChange("DFS")}
                >
                  DFS&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("BFS") ? "tag color4 selected" : "tag color4"
                  }
                  onClick={() => handleTagFilterChange("BFS")}
                >
                  BFS&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Deadlock")
                      ? "tag color5 selected"
                      : "tag color5"
                  }
                  onClick={() => handleTagFilterChange("Deadlock")}
                >
                  Deadlock&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Javascript")
                      ? "tag color2 selected"
                      : "tag color2"
                  }
                  onClick={() => handleTagFilterChange("Javascript")}
                >
                  Javascript&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("HTML") ? "tag color3 selected" : "tag color3"
                  }
                  onClick={() => handleTagFilterChange("HTML")}
                >
                  HTML&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("CSS") ? "tag color1 selected" : "tag color1"
                  }
                  onClick={() => handleTagFilterChange("CSS")}
                >
                  CSS&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("React")
                      ? "tag color5 selected"
                      : "tag color5"
                  }
                  onClick={() => handleTagFilterChange("React")}
                >
                  React&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Node.js")
                      ? "tag color6 selected"
                      : "tag color6"
                  }
                  onClick={() => handleTagFilterChange("Node.js")}
                >
                  Node.js&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Express.js")
                      ? "tag color4 selected"
                      : "tag color4"
                  }
                  onClick={() => handleTagFilterChange("Express.js")}
                >
                  Express.js&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Webpack")
                      ? "tag color1 selected"
                      : "tag color1"
                  }
                  onClick={() => handleTagFilterChange("Webpack")}
                >
                  Webpack&nbsp;
                </a>
                <a
                  href="javascript:void(0)"
                  className={
                    tags.includes("Mongodb")
                      ? "tag color3 selected"
                      : "tag color3"
                  }
                  onClick={() => handleTagFilterChange("Mongodb")}
                >
                  Mongodb&nbsp;
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Sidebar;
