import axios from "axios";
const noImageUrl =
  "https://res.cloudinary.com/dxioxeyua/image/upload/v1623558704/project_ss/Transposagen-Biopharmaceuticals-SIC-Pharma-20142_news_large_zyqkzb.jpg";
export function GetProjects() {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/projects")
      .then((response) => {
        let projects = response.data.map((proj, id) => {
          let p = {
            demo: proj.demoUrl,
            description: proj.description
              ? proj.description
              : "some description",
            documentation: proj.documentationUrl,
            github: proj.repoUrl,
            tags: proj.tags,
            key: proj._id,
            id: id,
            leader: proj.developerName,
            project_name: proj.projectName,
            tech_stack: proj.mainStack,
            pic1: proj.imgUrls[0] ? proj.imgUrls[0] : noImageUrl,
            pic2: proj.imgUrls[1] ? proj.imgUrls[1] : noImageUrl,
            pic3: proj.imgUrls[2] ? proj.imgUrls[2] : noImageUrl,
            pic4: proj.imgUrls[3] ? proj.imgUrls[3] : noImageUrl,
          };
          return p;
        });
        resolve(projects);
        //resolve(response)
      })
      .catch((err) => {
        reject(err);
      });
  });
}
