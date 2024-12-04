import exec from "child_process";

//importing arguments from the command line
const args = process.argv.slice(2);

if (args.length >= 1) {
  //checking if the argument is a number
  if (args[0] in ["dev", "stage", "prod"]) {
    // Run an npm command
    exec("cd frontend && npm run dev && cd../", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      exec("cd backend && nodemon index.ts && cd ../", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }

      console.log(`Output: ${stdout}`);
    });
  } else {
    console.error(
      "Error: Invalid environment specified.('dev','stage','prod')"
    );
  }
}
