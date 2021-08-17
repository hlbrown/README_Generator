//Function to generate markdown for README
function generateMarkdown(userResponses, userInfo) {
   



    let TOC = `## Table of Contents`;//creating the table of contents

    //Entering the responses into the table of contents if the response is not empty
  
    if(userResponses.installation !== ''){
      TOC += ` * [Installation](#installation)`
    };
  
    if(userResponses.usage !== ''){
      TOC += ` * [Usage](#usage)`
    };
    if(userResponses.contributing !== ''){
      TOC += ` * [Contributing](#contributing)`
    };
    if(userResponses.tests !== ''){
      TOC += ` * [Tests](#tests)`
    };
  
    let draftMarkdown = `# ${userResponses.title}
    ![Badge for GitHub](https://img.shields.io/github/languages/top/${userResponses.username}/${userResponses.repo}?style=flat&logo=appveyor) 
    [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)




    
    Check out the badges hosted by [shields.io](https://shields.io/).
    
    ## Description
    
    *Projection Description Unloaded*
    ${userResponses.description}
  
    `
    draftMarkdown += TOC;
  
    draftMarkdown += `* [License](#license)`;
  
    if(userResponses.installation !== ''){
      draftMarkdown +=
      `
      ##Installation
  
      *Steps required to install project and how to get the development environment running:*

      ${userResponses.installation}`
    };
  
    //Optional Usage section
    if(userResponses.usage !== ''){
      draftMarkdown +=

      `
      ##Usage

      *Instructions and examples for use:*
      
      ${userResponses.usage}`
    };
    
    if (userResponses.contributing !== ''){
      `
      ## Contributing

      *If you would like to contribute to it, you can follow these guidelines*
      
      ${userResponses.contributing}`
    };
  
    //optional testing
    if(userResponses.tests !== ''){
      
        draftMarkdown +=
      `
      ## Tests
      
      *Tests for application and how to run them:*
      
      ${userResponses.tests}`
    };
  
    //license section
    draftMarkdown += 
    `
    ## License

    ${userResponses.license}
    `;


  
    let draftDev = 
    ` 
    ---
    ## Questions?

    ![Developer Profile Pic](${userInfo.avatar_url})
    For any questions, please contact me with the information below:

    GitHub: [@${userInfo.login}](${userInfo.html_url})
    `;

    if (userInfo.email !== null){
      draftDev +=
      `
      Email: ${userInfo.email}
      
      `};

    //add developer section to markdown
    draftMarkdown += draftDev;
  
    return draftMarkdown;
  
  
    //return `# ${data.title}
  
  //`;
  }
  
  module.exports = generateMarkdown;
  