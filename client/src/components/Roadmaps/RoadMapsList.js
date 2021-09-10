import HTML from '../../../public/icons/HTML.svg'
import CSS from '../../../public/icons/CSS.svg'
import JS from '../../../public/icons/JAVASCRIPT.svg'
import REACT from '../../../public/icons/Reactjs.svg'
import ANGULAR from '../../../public/icons/Angular.svg'
import VUEJS from '../../../public/icons/Vuejs.svg'
import NODEJS from '../../../public/icons/Nodejs.svg'
import DJANGO from '../../../public/icons/Django.svg'
import PHP from '../../../public/icons/php.svg'
import JAVABACK from '../../../public/icons/JavaBackend.svg'
import MONGODB from '../../../public/icons/MongoDB.svg'
import SQL from '../../../public/icons/sql.svg'
import DS from '../../../public/icons/stack.svg'
import ALGO from '../../../public/icons/algo.svg'
import CP from '../../../public/icons/cp.svg'
import ANDROID from '../../../public/icons/Android.svg'
import FLUTTER from '../../../public/icons/Flutter.svg'
import SWIFT from '../../../public/icons/Swift.svg'
import DATASCIENCE from '../../../public/icons/DataScience.svg'
import ML from '../../../public/icons/ml.svg'
import DL from '../../../public/icons/dl.svg'
import GIT from '../../../public/icons/Git.svg'
import DOCKER from '../../../public/icons/Docker.svg'
import SELENIUM from '../../../public/icons/Selenium.svg'
import AWS from '../../../public/icons/aws.svg'
import GCP from '../../../public/icons/gcp.svg'
import AZURE from '../../../public/icons/Azure.svg'
import C from '../../../public/icons/c.svg'
import CPP from '../../../public/icons/cpp.svg'
import JAVA from '../../../public/icons/Java.svg'
import PYTHON from '../../../public/icons/Python.svg'

let roadmaps = [
  {
    type: "Front End Development",
    description:
      "Step by step guide to becoming a modern frontend developer in 2021.",
    topics: [
      { title: "HTML",icon:HTML},
      { title: "CSS",icon:CSS},
      { title: "JAVASCRIPT",icon:JS},
      { title: "REACTJS + REDUX",icon:REACT},
      { title: "ANGULAR + REDUX",icon:ANGULAR },
      { title: "VUEJS + REDUX",icon:VUEJS },
    ],
  },
  {
    type: "Backend Development",
    description:
      "Step by step guide to becoming a modern backend developer in 2021.",
    topics: [
      { title: "NODE JS",icon:NODEJS },
      { title: "DJANGO",icon:DJANGO },
      { title: "PHP" ,icon:PHP},
      { title: "JAVA BACKEND",icon:JAVABACK },
    ],
  },
  {
    type: "Database Development",
    description:
      "Step by step guide to becoming a modern database developer in 2021.",
    topics: [
    { title: "MONGODB",icon:MONGODB }, 
    { title: "SQL" ,icon:SQL}],
  },
  {
    type: "Data Structures and Algorithm",
    description: "Step by step guide to becoming a coding expert in 2021.",
    topics: [
      { title: "DATA STRUCTURE",icon:DS },
      { title: "ALGORITHMS",icon:ALGO },
      { title: "COMPETITIVE PROGRAMMING" ,icon:CP},
    ],
  },
  {
    type: "Programming Language",
    description: "Step by step guide to becoming a programming expert in 2021.",
    topics: [
      { title: "C",icon:C },
      { title: "C++",icon:CPP},
      { title: "JAVA" ,icon:JAVA},
      { title: "PYTHON",icon:PYTHON },
      { title: "JAVASCRIPT",icon:JS },
    ],
  },
  {
    type: "Android Development",
    description: "Step by step guide to becoming a Android developer in 2021.",
    topics: [
      { title: "JAVA + ANDROID" ,icon:ANDROID},
      { title: "FLUTTER" ,icon:FLUTTER},
      { title: "REACT NATIVE" ,icon:REACT},
      { title: "SWIFT" ,icon:SWIFT},
    ],
  },
  {
    type: "Machine Learning",
    description:
      "Step by step guide to becoming a Machine Learning Engineer in 2021.",
    topics: [
      { title: "DATA SCIENCE" ,icon:DATASCIENCE},
      { title: "MACHINE LEARNING",icon:ML },
      { title: "DEEP LEARNING ML+DL",icon:DL },
    ],
  },
  {
    type: "Dev - Ops",
    description:
      "Step by step guide to becoming a modern DevOps Engineer in 2021.",
    topics: [
      { title: "GIT + GITHUB" ,icon:GIT},
      { title: "DOCKER + KUBERNETES",icon:DOCKER },
      { title: "SELENIUM",icon:SELENIUM},
    ],
  },
  {
    type: "Cloud Technologies",
    description:
      "Step by step guide to becoming a modern Cloud Developer in 2021.",
    topics: [
      { title: "AWS",icon:AWS},
      { title: "GOOGLE GCP",icon:GCP },
      { title: "MICROSOFT AZURE",icon:AZURE },
    ],
  },
];

export default roadmaps