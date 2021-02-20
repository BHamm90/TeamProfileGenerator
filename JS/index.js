//Dependencies
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

// Array for All New Team Members
const TeamMembers = [];

// Inquirer Prompts and Answer Varibles
init();
// Begin of Prompt functions
function init() { 
    // Ask for User to select a job title
    // This selection will decide which set of questions the user will get
    inquirer.prompt([    
        {
            type: 'list',
            name: 'jobTitle',
            message: 'What is your position in the company?',
            choices: [
                'Manager',
                'Engineer',
                'Intern',
                'None of the Above',
            ],
        },
    ]).then(() => {
        // Provides prompt for manager info
        if (event.jobTitle === 'Manager') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeName',
                    message: 'What is your name?'
                },
                {
                    type: 'input',
                    name: 'employeeNumber',
                    message: 'What is your employee identification number?'
                },
                {
                    type: 'input',
                    name: 'emailAddress',
                    message: 'What is a good e-mail address to contact you?'
                },
                {
                    type: 'input',
                    name: 'roomNumber',
                    message: 'What is your room number?  (If you do not have one hit enter.)',
                },  
            ]).then((ManagerInfo) => {
                // Bundles all info gained into one Variable
                const Manager = new Manager(
                    ManagerInfo.employeeName,
                    ManagerInfo.EmployeeID,
                    ManagerInfo.EmailAddress,
                    ManagerInfo.RoomNumber,
                );
                // Pushes the Managers info to Array
                TeamMembers.push(Manager);
                // Ask the User to select a role again
                init();
            }); 
        }else if (event.jobTitle === 'Engineer')  {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeName',
                    message: 'What is your name?'
                },
                {
                    type: 'input',
                    name: 'employeeNumber',
                    message: 'What is your employee identification number?'
                },
                {
                    type: 'input',
                    name: 'emailAddress',
                    message: 'What is a good email address to contact you?'
                },
                {
                    type: 'input',
                    name: 'githubUser',
                    message: 'What is your Github username? (If you do not have one hit enter.)',
                },
            ]).then((EngineerInfo) => {
                const Engineer = new Engineer(
                    EngineerInfo.employeeName,
                    EngineerInfo.employeeNumber,
                    EngineerInfo.emailAddress,
                    EngineerInfo.githubUser,
                );
                TeamMembers.push(Engineer);
                init();
            });    
        } else if (event.jobTitle === 'Intern') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeName',
                    message: 'What is your name?'
                },
                {
                    type: 'input',
                    name: 'employeeNumber',
                    message: 'What is your employee identification number?'
                },
                {
                    type: 'input',
                    name: 'emailAddress',
                    message: 'What is a good email address to contact you?'
                },
                {
                    type: 'input',
                    name: 'schooling',
                    message: 'What extra schooling have you attended? (If you do not have one hit enter.)',
                },  
            ]).then((InternInfo) => {
                const Intern = new Intern(
                    InternInfo.employeeName,
                    InternInfo.employeeNumber,
                    InternInfo.emailAddress,
                    InternInfo.schooling,
                );
                TeamMembers.push(Intern);
                init(); 
            });

        }
        
    });
};

// Maps the bundled varibles above to the render
const render = TeamMembers => {
    const html = [];
  
    html.push(...TeamMembers
      .map(Manager, Engineer, Intern => render(Manager, Engineer, Intern))
    );
  
    return render(html.join(""));
  
  };
  
    // Set Path to render info to HTML
    const HTMLDir = path.resolve(__dirname, "../HTML");

    // This function is to navigate to the default HTML and to replace the values
    const render = TeamMembers => {
        let card = fs.readFileSync(path.resolve(HTMLDir, "index.html"));
        card = replace(card, "employeeName", TeamMembers.employeeName);
        card = replace(card, "jobTitle", TeamMembers.jobTitle);
        card = replace(card, "emailAddress", TeamMembers.emailAddress);
        card = replace(card, "employeeNumber", TeamMembers.employeeNumber);
        card = replace(card, "roomNumber", TeamMembers.roomNumber);
        card = replace(card, "githubUser", TeamMembers.githubUser);
        card = replace(card, "schooling", TeamMembers.schooling);
        return card;
    };
    
    // Read default HTML already created and Uses to build new HTML
    const render = html => {
        const card = fs.readFileSync(path.resolve(HTMLDir, "index.html"));
        return replace(card, "TeamProfileGenerator", html);
    };
    
    // Function to replace the placeholders with the teams info
    const replace = (card, placeholder, value) => {
        const UserInfo = new TeamInfo("{{ " + placeholder + " }}");
        return card.replace(UserInfo, value);
    };