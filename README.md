# node-study-2

Previous lesson
[Node Study 1](https://github.com/ChrisJokinen/node-study-1#readme)

This project will focus on a few things before we can really get into node.js; git branches and work flow and making configuration files in node.

First thing you will need to do is start a new project, which is covered in my first lesson. If you have already done the first lesson then you can skip the part on the ssh private key, once it is setup you will never need to repeat it...well at least for this series (see envatotuts+ below).

Once you have a your github master branch setup we can look at how to make a feature branch of our code but first what is a feature branch?

To understand what a feature branch is you will need to understand what and how git works, well from a high level at least. When you start a git repository git creates a default branch called master. With a branch, git keeps track of the changes that occurs in your project folder since your last commit. New files or even file changes are all noted in git and they are marked as having changed or in the case of a new file they are untracked.

Git Desktop seems to hide some of this as it just will show you a new file that you can commit. Behind the interface it is doing a couple of steps, or at least a combined step. An easy way to think about it is doing a commit is like making a save point of your file. Git tracks these commits and each one records the changes that occured in the file(s) since the last commit. You can roll back your files to an older commit and undo all the changes have occured between then and now. If you have an editor open with the files you are editing and roll back to an older commit you will see your files have changed (might require a reload of the file). Be warned though as rolling back can remove files. There is a way to avoid rolling back everything called cherry picking, but I will leave that to you to discover. See git-scm.com in Source for more and better details on git.



#Workflow

In my 1st tutorial I covered commiting and pushing your code to github using the git desktop. When I did this it was pushed to the git master branch. Outside of starting new code as a solo programmer this should never be done. There are a number of issues that can happen when team members on a project do not all follow the same workflow. I will not cover these and will leave you to google that. I will present the workflow I use and the team I work with follows. This may not be the best workflow or it may not work for all projects and I have much still to learn on git and github, but this works well, is easy to understand and once you do it. By the end of tutorial you should see the benifit of using it. So without further ado, here are the steps of the workflow.

1. perform a pull on the master branch - in the Git Desktop you can use the pull request or the sync button. Use caution with the sync as it will also push commits up.
2. make a new branch <br>
  ![Screenshot 1](https://github.com//ChrisJokinen/node-study-2/blob/master/imgs/ss1.png?raw=true) <br>
  by clicking on the icon at the top left next to the current branch name "master"
  1. For the name I entered "feature/exploring_config" and "From branch" was left to master. Why add "feature" to the branch name? Because I am adding a feature to my code and it is a naming convention I am using. It will help to separate code changes into a groups that reflect what the code change is, for example I could also have branches called hot_fix/"fix name or reference number". There are other things that can be done but lets get back to this code.
  2. click "Create new branch".<br>
  ![Screenshot 2](https://github.com//ChrisJokinen/node-study-2/blob/master/imgs/ss2.png?raw=true).<br>
  Now when you look at the top left creach branch button you will see the new branch name presented. It is very important you remain aware of what branch you are on before working on any code. You can avoid a lot of headaches if you do.
3. Make a new file in the root directory of your project called, "config.js". Then add the following code. The code below can be replaced with the actual connection values for your database. Exports and module.exports are something you will see a lot of in nodejs code. You can think of this as an include file that is common in many programming languages.
```javascript
exports.mysql = {
  host: "localhost",
  user: "mysql-user",
  password: "mysql-user-password",
  database: "database-name",
  port: 3306

}
```
4. Now lets add a little more code to our config file. This code will allow you to set a specific port port your http server will listen on for request of content on your server. The other point I want to make is that you can have more than one exports JSON object in the same file. Save your changes once done.
```javascript
exports.https = {
  port: 8888
}
```
5. now open the git shell
  1. navigate to the project folder. For my system I enter "cd C:\nodejs\node-study-2"
  2. download http from npm. My command is "npm install http --save". The "--save" part of the command will update your package.json with the http dependancy reference.
6. Next we add a new file; "index.js" and add the following code. A few things to note here, starting with the 2 require calls. require is used to pulling modules and also your own code. In the first we require the module http we installed with the npm install command. The second requires our config file. See the difference between the module and the custom file? npm modules are just called by name where our config file is called as a local reference and includes the file extension. After assigning the config file to the variable config we now have access to the 2 JSON objects defined in the config file. When we use the http port we use dot notation to access it in the server.listen(). Save index.js
```javascript
var http = require("http");
var config = require("./config.js");

var requestListener = function (req, res) {
  res.writeHead(200);
  res.end("Hello, World!\n");
}

var server = http.createServer(requestListener);
server.listen(config.http.port);
7. Start the http server. In git console and inside the project folder use this command to start the http server, "node index.js". when it runs you will not see anything other than the command prompt does not return...the http server will be running now.
8. Test the server by opening a web browser and entering either "localhost:8888" or "127.0.0.1:8888". you should see "Hello, World!" on the page. Note I had an issue with the Edge Browser, so try in Google Chrome or Firefox.
9. Shut the http server down. Back in the git console, press the keys "CTRL+c" to stop the http server and return the command prompt.
10. now we can commit and push our changes, but first the security minded of you may have an alarm going off. We have a config file with our database settings in this code. Meet your friend .gitignore. In Git Desktop right click on the config.js file and select the ignore file. Doing this removes the file from tracking by git. You can do this for files or entire directories. A new file will be added called ".gitignore". 
11. Lets say our code is done and we need to push these changes to github so others can pull our work down. Return to the Git Desktop and all you need to do is:
  1. make sure all your files are saved
  2. you are in the feature branch and not in master
  3. uncheck all the files list in the list of changes you have made.
  4. select the file marked "node_modules\http\..."
  5. in the summary field below enter "Added http module"
  6. Click the Commit button
  7. select the rest of the files, except for "config.js".
  8. below in the summary field enter "added code to project for http, with no config"
  9. click the commit button
  10. press the publish button, should be where the sync button usually is on the top right.
12. open your github account and go to the project you are working on.
![Screenshot 3](https://github.com//ChrisJokinen/node-study-2/blob/master/imgs/ss3.png?raw=true).<br>
  1. once you are on the project page you will see a new section displayed directly above the branch name and clone/download button. This section states there is a recent published branch and presents you witha "compare & pull request" button. Click it.
  2. On this page you will see and "Open Pull Request" and it is comparing the feature branh against the master branch. You should see a message stating if the feature branch can be merged into the master branch without any conflicts being created! Scroll down a little bit and just below the "create pull request" button you will see the 2 commits we did ("added http module", "added code to project for http, with no config") localy and pushed up together. Now just a little bit farther down you can review the actual code changes that have been made. This gives you a chance to review the changes without having to look at the entire code base. You can also spot things that should never be published like config files, debug code, etc...
  3. once you are done you can create a pull request.
  4. If you have permission to can then review any open merge request and approve the merge back into the master branch.
  5. After that you can delete the feature branch, back in your local you will need to switch back to the master branch and pull/sync your master with git hub. Since all of your changes where made in a feature branch your local master does not have them, so sync up.
  6. If all the members of your team preform the workflow you project should be able to handle multiple developers writing code and not deleting or overwrite someones work. Each member should be working on different feature branch and so some may want to add a name to the branch naming.




# Source

* [envatotuts+ - Quick Tip: How to work with Github and Multiple  Accounts](https://code.tutsplus.com/tutorials/quick-tip-how-to-work-with-github-and-multiple-accounts--net-22574)
* [git-scm.com - Getting Started](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
* [openmymind.net](http://openmymind.net/2012/2/3/Node-Require-and-Exports/)
* [Sitepoint - understanding module.exports and exports](https://www.sitepoint.com/understanding-module-exports-exports-node-js/)
* [docs.nodejitsu.com](https://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTP-server/)
