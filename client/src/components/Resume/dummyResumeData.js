import avatar from "../assets/avatar.jpg";
const resumeData = {
  name: "Your Name",
  year: "Third",
  degree: "B.Tech",
  phoneNumber: "95111xxxxx",
  email: "youremail123@gmail.com",
  college: "BIET",
  city: "Jhansi",
  academics: [
    {
      year: 2022,
      degree: "B.Tech",
      college: "Bundelkhand Institute of Engineering and Technology, Jhansi",
      result: {
        gpa: 8.7,
        percentage: 0,
      },
    },
    {
      year: 2017,
      degree: "XII",
      college: "Pioneer Montessory Inter College, Barabanki",
      result: {
        gpa: 0,
        percentage: 89,
      },
    },
    {
      year: 2015,
      degree: "X",
      college: "Pioneer Montessory High School, Barabanki",
      result: {
        gpa: 0,
        percentage: 88.5,
      },
    },
  ],
  objective:
    " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis delectus fugit ratione neque officia itaque laboriosam? Culpa sunt quidem incidunt, esse porro ullam perferendis mollitia cupiditate voluptates obcaecati maiores. Maxime!",
  projects: [
    {
      name: "Project-1",
      type: "Web Development",
      technologies: "html, css, javascript, node.js, mongodb",
      credentials: "",
      startDate: "March, 2021",
      endDate: "Present",
    },
    {
      name: "Project-2",
      type: "Android Development",
      technologies: "java, kotlin, machine-learning",
      credentials: "",
      startDate: "January, 2021",
      endDate: "February",
    },
    {
      name: "Project-3",
      type: "Machine learning Project",
      technologies: "python, tensorflow, torch, keras",
      credentials: "",
      startDate: "September, 2020",
      endDate: "December, 2020",
    },
  ],
  skills: {
    programmingLanguages: [
      { name: "c", level: "Intermediate" },
      { name: "c++", level: "Intermediate" },
      { name: "java", level: "Intermediate" },
      { name: "python", level: "Beginner" },
      { name: "javascript", level: "Expert" },
      { name: "c#", level: "Beginner" },
      { name: "ruby", level: "Beginner" },
    ],
    technologies: [
      { name: "html", level: "Expert" },
      { name: "css", level: "Expert" },
      { name: "scss", level: "Expert" },
      { name: "react", level: "Expert" },
      { name: "nodejs", level: "Expert" },
      { name: "react-native", level: "Beginner" },
      { name: "android", level: "Beginner" },
      { name: "tensorflow", level: "Beginner" },
      { name: "keras", level: "Beginner" },
      { name: "torch", level: "Beginner" },
    ],
    dbms: [
      { name: "mysql", level: "Beginner" },
      { name: "mongodb", level: "Expert" },
      { name: "sqlite", level: "Beginner" },
    ],
    platforms: [
      { name: "windows", level: "Beginner" },
      { name: "linux", level: "Intermediate" },
      { name: "android", level: "Intermediate" },
    ],
    other: ["git", "parcel"],
  },
  achievements: [
    "Achievement-1",
    "Achievement-2",
    "Achievement-3",
    "Achievement-4",
  ],
  profileImg:avatar
};

export default resumeData;