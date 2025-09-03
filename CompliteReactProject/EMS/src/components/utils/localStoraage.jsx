
const employees = [
  {
    "id": 1,
    "firstName": "Aarav",
    "email": "employee1@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Design Homepage",
        "description": "Create a modern UI design for the homepage.",
        "date": "2025-09-05",
        "category": "design",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Fix Navbar Bug",
        "description": "Resolve dropdown issue in navbar.",
        "date": "2025-09-06",
        "category": "dev",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      },
      {
        "title": "Testing API",
        "description": "Write unit tests for user authentication API.",
        "date": "2025-09-07",
        "category": "testing",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      }
    ],
    "taskNumbers": {
      "active": 2,
      "newTask": 1,
      "completed": 1,
      "failed": 0
    }
  },
  {
    "id": 2,
    "firstName": "Ishita",
    "email": "employee2@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Build Login Page",
        "description": "Develop frontend login form using React.",
        "date": "2025-09-05",
        "category": "dev",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Database Schema",
        "description": "Design schema for user and tasks in MongoDB.",
        "date": "2025-09-06",
        "category": "dev",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Fix Footer",
        "description": "Update footer links and responsive layout.",
        "date": "2025-09-07",
        "category": "design",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      }
    ],
    "taskNumbers": {
      "active": 2,
      "newTask": 1,
      "completed": 1,
      "failed": 0
    }
  },
  {
    "id": 3,
    "firstName": "Vihaan",
    "email": "employee3@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Deploy App",
        "description": "Set up CI/CD pipeline for staging environment.",
        "date": "2025-09-08",
        "category": "devops",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Logo Design",
        "description": "Create a new logo for branding.",
        "date": "2025-09-09",
        "category": "design",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ],
    "taskNumbers": {
      "active": 1,
      "newTask": 1,
      "completed": 0,
      "failed": 1
    }
  },
  {
    "id": 4,
    "firstName": "Ananya",
    "email": "employee4@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Write Docs",
        "description": "Document API endpoints for developers.",
        "date": "2025-09-10",
        "category": "documentation",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Unit Testing",
        "description": "Add unit tests for product module.",
        "date": "2025-09-11",
        "category": "testing",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Error Fix",
        "description": "Debug API timeout issue.",
        "date": "2025-09-12",
        "category": "dev",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      }
    ],
    "taskNumbers": {
      "active": 2,
      "newTask": 1,
      "completed": 1,
      "failed": 0
    }
  },
  {
    "id": 5,
    "firstName": "Kabir",
    "email": "employee5@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Update Readme",
        "description": "Add setup instructions in README.md.",
        "date": "2025-09-13",
        "category": "documentation",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "UI Review",
        "description": "Check and review UI for dashboard.",
        "date": "2025-09-14",
        "category": "design",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Backend Refactor",
        "description": "Refactor routes and controllers.",
        "date": "2025-09-15",
        "category": "dev",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      }
    ],
    "taskNumbers": {
      "active": 2,
      "newTask": 1,
      "completed": 1,
      "failed": 0
    }
  }
];

const admin = [
  {
    "id": 1,
    "firstName": "Rajesh Admin",
    "email": "admin@example.com",
    "password": "123"
  }
];


export const setLocalStorage= ()=>{
    localStorage.setItem('employees',JSON.stringify(employees)),
    localStorage.setItem('admin',JSON.stringify(admin))
}
export const getLocalStorage= ()=>{
    const employees = JSON.parse(localStorage.getItem('employees'))
    const admin = JSON.parse(localStorage.getItem('admin'))

    return {employees,admin}
}